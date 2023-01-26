import mongoose from "mongoose";

import PostMessage from "../models/PostMessage.js";

export const getPost = async (req,res)=>{
   const { page } = req.query;
    try {
        const LIMIT = 9;
        const startIndex= (Number(page) -1 )* LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts =  await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({data:posts, currentPage:Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({"message" : error.message});
    }
}
export const getOnePost = async (req,res)=>{
    const { id } = req.params;
    
     try {
         
         const post =  await PostMessage.findById(id)
         
         res.status(200).json(post);
     } catch (error) {
         res.status(404).json({"message" : error.message});
     }
 }

export const createPost = async (req,res)=>{
   try {
    const post= req.body;
    
    const newPost = new PostMessage(
       {...post, name:req.name, creator: req.userId}
    );

     await newPost.save().catch(err=>
        console.log(err.message)
     );
     
     res.status(201).json(newPost);

   } catch (error) {
    res.status(409).json({"message" : error.message});
   }
   
   
    
}

export const updatePost = async (req,res) =>{
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(" No Post with that id")

   const newPost = await  PostMessage.findByIdAndUpdate(_id, post ,{new:"true"});

   res.json(newPost);
}
export const deletePost = async (req,res) =>{
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(" No Post with that id")

   const newPost = await  PostMessage.findByIdAndDelete(_id,{new:"true"});
    
   res.json(newPost);
}
export const updateLike = async (req,res) =>{
    const {id: _id} = req.params;

    if(!req.userId) return res.status(400).send(" unauthenticated");

    const post = await PostMessage.findById(_id);
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(" No Post with that id");

    const index = post.likes.findIndex((_id)=> _id === String(req.userId));

    if(index== -1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((_id)=> _id !== String(req.userId));
    }

   const newPost = await  PostMessage.findByIdAndUpdate(_id,{$set: {likes: post.likes} } ,{new:"true"});

   
    
   res.json(newPost);
}

export const getPostsBySearch = async (req, res) =>{
    const {searchQuery, tags}=  req.query;
    try {
       
       const title = new RegExp(searchQuery, 'i');
       
       const posts = await PostMessage.find({$or:[{title},{tags: {$in: tags.split(',') }}]}  );
        
       res.json(posts)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
} 