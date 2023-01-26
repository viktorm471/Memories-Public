import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post.js"
import useStyles from "./styles";
import {Grid, CircularProgress, Typography } from '@material-ui/core'

const Posts = ()=>{

const classes = useStyles();

const {posts, isLoading} = useSelector((state)=>state.posts);


 if( !posts &&!isLoading) return 'No Post';

 if ( posts){
    
    if ( posts.length === 0 ){
        return   <Typography variant="h6" align="center"> No matches for this search </Typography>;
    }
 } 
 
    return(
        isLoading ? <div className={classes.circularProgress}><CircularProgress  size={70}/></div> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post}/>
                    </Grid>
                ))}

            </Grid>
        )
        
    )
}

export default Posts;