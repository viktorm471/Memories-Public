import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import Parse from "parse/node.js";
dotenv.config();

const app = express();



app.use(express.json({limit: '5mb'}));

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);
app.use("/user", userRoutes);


const mongoUrl=process.env.MONGO_URL ;

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true})
.then(app.listen(PORT,()=> console.log(`running at port ${PORT} and conected with DB`)))
.catch((error)=>console.log(error.message))




