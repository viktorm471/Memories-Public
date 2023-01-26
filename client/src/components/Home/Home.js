import React from "react";

import { useDispatch } from 'react-redux';

import {Grow, Grid, Container, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import Pagination from "../Pagination/Pagination";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from "./styles";
import { useState } from "react";
import { getPostsBySearch } from "../../actions/posts";

import { useEffect } from "react";





function useQuery (){
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
    
    const query = useQuery();
    const classes = useStyles();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = (query.get('searchQuery'));
    const searchTags = (query.get('tags'));
    
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();

    function handleKeyPress(e){
      if(e.keyCode === 13){
        searchPost();
      }
    }
    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete ));
    
    
        
      
    

    const searchPost = () => {
      
      if(search.trim() || tags){
        
          dispatch(getPostsBySearch({search, tags: tags.join(',')}));
          history.push(`/post/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        
       
      }else{
        history.push('/');
      }
  };
     
      
    
    
    useEffect(()=>{
      if(searchQuery){
        dispatch(getPostsBySearch({search: searchQuery, tags: searchTags}));
        
      }
      
    },[searchQuery,searchTags, dispatch])
   
    
    return(
      
        <Grow in>
        <Container maxWidth="xl">
          <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems='stretch' spacing={2}>
            <Grid item xs={12} sm={7} md={8}>
              < Posts />
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e)=> {setSearch(e.target.value) }}
                onKeyPress={handleKeyPress}

                />
                <ChipInput 
                style={{margin:'10px 0'}}
                value= {tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label= "Search Tags"
                variant="outlined"
                
                />
                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
              </AppBar> 
              < Form />
              { !searchQuery? 
              <Paper className={classes.pagination} elevation={6} >
                <Pagination page={page}/>
              </Paper> : ''}
            </Grid>

          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;