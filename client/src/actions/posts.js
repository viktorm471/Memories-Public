import * as api from '../api';
import {CREATE, UPDATE, FETCH_ALL, DELETE, UPDATEID, START_LOADING, END_LOADING, FETCH_POST, FETCH_SEARCH} from "../constants/constants";
// action creators

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPosts(page);
        
        dispatch({type:FETCH_ALL, payload:data});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error)
    }
    
    
}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPost(id);
        
        dispatch({type:FETCH_POST, payload:data});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error)
    }
    
    
}
export const createPost = (newPost) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.createPost(newPost);
        
            dispatch({type:CREATE, payload:data});
            dispatch({type:END_LOADING});
        
            
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}
export const updatePost = (_id,newPost) => async (dispatch) => {
    try {
        
        const {data} = await api.updatePost(_id,newPost);
        
            dispatch({type:UPDATE, payload:data});
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}
export const deletePost = (_id) => async (dispatch) => {
    try {
        
        const {data} = await api.deletePost(_id);
        
            dispatch({type:DELETE, payload:data});
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}

export const updateId = (_id) => async (dispatch) => {
    try {
            
            dispatch({type:UPDATEID, payload:_id});
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}
export const updateLike = (_id) => async (dispatch) => {
    try {
            
        const {data} = await api.updateLike(_id);
        
        dispatch({type:UPDATE, payload:data});
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.getPostsBySearch(searchQuery);
        
       
        dispatch({type:FETCH_SEARCH, payload:data});
        dispatch({type:END_LOADING});
        
    } catch (error) {
        console.log(error)
    }
    
    
}