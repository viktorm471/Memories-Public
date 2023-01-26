import axios from "axios";
const API = axios.create ({baseURL:"http://localhost:5000" })

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})
export const fetchPosts= (page) => API.get(`/posts?page=${page}`);
export const getPostsBySearch= (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPost= (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post("/posts",newPost);

export const updatePost = (_id, newPost) => API.patch(`/posts/${_id}`,newPost);
export const updateLike = (_id ) => API.patch(`/posts/${_id}/likepost`);

export const deletePost = (_id) => API.delete(`/posts/${_id}`);

export const signup = (formData) => API.post(`user/signup`,formData);

export const signin = (formData) => API.post(`user/signin`,formData);