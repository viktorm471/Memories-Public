import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories-Text.png";
import memoriesLogo from "../../images/memories-Logo.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useCallback } from "react";


const Navbar = () => {
    const auth= useSelector(state=>state.auth);
    const history = useHistory();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes= useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    

    
     useEffect(()=>{
       setUser(JSON.parse(localStorage.getItem('profile')));
     },[auth])

     const logOut= useCallback(()=> {
      googleLogout();
      setUser(null);
      history.push("/");
      dispatch({type:'LOGOUT'});
      
    },[dispatch,history])
    
  // verify the token when the location change 
     useEffect(()=>{
      const token = user?.token;
      
      if(token){
         const decodedToken = jwt_decode(token)

         if(decodedToken.exp *1000 < new Date().getTime()) logOut() ;
      }
     }, [user,location,logOut])

    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Link to="/" className={classes.brandContainer}>
            
            <img className={classes.image} src={memories} alt="icon" height="40px" /> 
            <img  src={memoriesLogo} alt="icon" height="45px" /> 
          </Link>
          <Toolbar className={classes.toolbar}>
            {user  ?(
                <div className={classes.profile}>
                    
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture} >{user.result.name.charAt(0)}</Avatar> 
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> 
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>LogOut</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    )
}

export default Navbar; 