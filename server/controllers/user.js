import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signin = async (req,res)=>{
     const {email, password} = req.body;

    try {
        const existingUser =  await User.findOne({email});
        
        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!passwordCorrect) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign({name: existingUser.name, email: existingUser.email, _id: existingUser._id}, process.env.JWT_SECRET, {expiresIn:'1h'}  )
        

        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json({"message" : error});
    }
}

export const signup= async (req,res)=>{
        const {firstName, lastName, password, confirmPassword, email}=req.body;
    try {
        
        const existingUser =  await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exist."});
        
        if(password !== confirmPassword) return res.status(400).json({message: "The password don't match"});

        const hashPassword = await bcrypt.hash(password, 12);

       const newUser= await User.create({name:`${firstName} ${lastName}`, email, password: hashPassword});
      
        const token = jwt.sign({name: newUser.name, email: newUser.email, _id: newUser._id}, process.env.JWT_SECRET, {expiresIn:'1h'}  )
       

        res.status(200).json({result:newUser, token});
    
        

        
    } catch (error) {
        res.status(500).json({"message" : error});
    }
}