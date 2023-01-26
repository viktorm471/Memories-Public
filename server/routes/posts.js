import express from "Express";
import { getPostsBySearch,getPost, createPost,updatePost,deletePost,updateLike, getOnePost } from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPost);
router.get("/search", getPostsBySearch);
router.get("/:id", getOnePost);
router.post("/",auth, createPost);
router.patch("/:id",auth, updatePost);
router.patch("/:id/likepost",auth, updateLike);
router.delete("/:id",auth, deletePost);


export default router;