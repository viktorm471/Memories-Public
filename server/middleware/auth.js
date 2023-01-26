import jwt  from "jsonwebtoken";

export const auth = async (req,res,next)=>{
   
    try {
        const token =  req.headers.authorization.split(" ")[1];
        const  decodedData= jwt.verify(token, process.env.JWT_SECRET);
        
        if(decodedData){
            
            req.userId= decodedData._id;
            req.name= decodedData.name;
            next();
        }else {
            console.log("invalid")
            res.json({message:"Invalid credentials"});
        }

       
    } catch (error) {
        res.json({message:"Invalid credentials"});
    }
}
export default auth;