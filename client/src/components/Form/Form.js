import React, { useState,useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost,updateId,updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";



const Form = ()=>{
  const dispatch = useDispatch();
  const [postData,setPostData]=useState({
     title:"", message:"", tags:"", selectedFile:""
  });
  const classes = useStyles();
  const update = useSelector((state)=>state.update);
  const post = useSelector((state)=>update ?  state.posts.posts.find(p => p._id === update) : null);

  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(()=>{

   if(post) setPostData(post);
  },[post,update]);
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(post){
      
      dispatch(updatePost(update, postData));
    }else{
      dispatch(createPost(postData));
    }
    clear()
  }
  const clear = ()=>{
    dispatch(updateId(null));
    setPostData( { title:"", message:"", tags:"", selectedFile:""});
    
    
  }
  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center"> Please Sign In to create a Post or Like other memories</Typography>
      </Paper>
    )
  }
    return(
        <Paper className={classes.paper} elevation={6}>
          <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{!update ? 'Creating' : 'Editing'} a Memory </Typography>
          
          <TextField   name="title" variant="outlined" label="Title" value={postData.title} onChange={e=> setPostData({...postData, title: e.target.value})} />
          <TextField   name="message" variant="outlined" label="Message" value={postData.message} onChange={e=> setPostData({...postData, message: e.target.value})} />
          <TextField   name="tags" variant="outlined" label="tags" value={postData.tags} onChange={e=> setPostData({...postData, tags: e.target.value.split(/[, .]+/)})} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile:base64})} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
        
    )
}

export default Form;