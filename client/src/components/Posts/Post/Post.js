import React from "react";
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateId,deletePost, updateLike } from "../../../actions/posts";

const Post = ({post})=>{
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const update = (_id) =>{
    dispatch(updateId(_id));
  }

  const deleteOnePost = (_id)=>{
    dispatch(deletePost(_id));
  }

  const incrementLike = (_id)=>{
    dispatch(updateLike(_id));
  }

  const openPost = ()=>{
    
    history.push(`/post/${post._id}`)
  }

    return(
        <Card className={classes.card} elevation={6} raised>
          <ButtonBase className={classes.cardAction} onClick={openPost}>
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
          <div className={classes.overlay}>
              <Typography variant="h6">{post.name}</Typography>
              <Typography variant="body2">{moment(post.createdAt).local(true).fromNow()}</Typography>
              
              
          </div>
          <div className={classes.overlay2}>
          
          </div>
          <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">{post.tags.map(tag=>`#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
          <CardContent>
          <Typography  component="p"  color="textSecondary">{ post.message.length > 30 ? post.message.slice(1,30): post.message}</Typography>
          </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={()=>{incrementLike(post._id)}}>
              {post.likes.find(like => like === user?.result._id) ? (
                 <ThumbUpAltIcon fontisize="small"/> 
              ) :(
                <ThumbUpAltOutlinedIcon fontSize="small"/>
              )}

              
              
               &nbsp;
              {post.likes.length}
            </Button>
            
            {(post.creator === user?.result?._id)  && (
              <>
              <Button color="primary" size="small" onClick={()=>{ update(post._id)}}>
              <MoreHorizIcon fontisize="default" />
              </Button>
              <Button size="small" color="primary"  onClick={()=>{deleteOnePost(post._id)}}>
              <DeleteIcon fontSize="small"/>
              </Button>
              </>
            )}
            
          </CardActions>
              

        </Card>
    )
}

export default Post;