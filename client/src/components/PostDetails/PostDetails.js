import React,{useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider,Card, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import { useHistory } from 'react-router-dom';



const PostDetails = () => {
    const { post,posts, isLoading } = useSelector(state=> state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } =useParams();

    useEffect(()=>{
      
      dispatch(getPost(id))
      
    },[id, dispatch])

    useEffect(()=>{
      if(post.length !== 0){
        
        dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}))
      }
    },[post])

   

    if(!post) return null;

    if(isLoading){
      return (
        <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress  size='7em'/>
        </Paper>
      )
    }

    const recommendedPost = posts.filter(({_id}) => _id !== post._id);
    const openPost = (_id)=>{
    
      history.push(`/post/${_id}`)
    }
  return (
  <Paper>
    
    <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.length >0 ?  post?.tags.map((tag) => `#${tag} `) : ''}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPost.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5"> You might also like: </Typography>
          <Divider/>
          <Grid className={classes.recommendedPosts} container alignItems='stretch' spacing={2}>
            {recommendedPost.map(({title, tags, name, selectedFile, _id, likes}) =>(
              <Grid item md={3} sm={6} xs={12} key={_id}>
              <Card elevation={6}  className={classes.recommendedCard} raised  onClick={()=>openPost(_id)}   >
                <div style={{marginLeft:"20px"}}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{tags ? tags?.map((tag) => `#${tag} `) : ''}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes:{likes.length}</Typography>
                <Divider></Divider>
                </div>
                <div className={classes.containerImage} ><img alt={title} src={selectedFile}  className={classes.imageCard} /></div>
              </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
  </Paper>
  )
}
  
export default PostDetails
