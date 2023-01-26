import React, {useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";

import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import {signGoogle, signin, signup} from "../../actions/auth";

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp]= useState(false);
    const dispatch= useDispatch();
    const history = useHistory();
    const formInitial={firstName:"", lastName:"", email:"",password:"",confirmPassword:""};
    const [formData, setFormData] =useState(formInitial);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))

        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleShowPassword = () => {
        setShowPassword(prevShowPassword=> !prevShowPassword);
    }
    const switchMode = () => {
        setIsSignUp (prevSignUp => !prevSignUp);
    }
    const successGoogle = async (credentialResponse)=>{
        const credentials = credentialResponse?.credential;
        try {
            dispatch(signGoogle(credentials));
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }   
    
    return(
       <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.Avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    
                </Grid>
                
                <Button type="submit" variant="contained" fullWidth color="primary" className={classes.submit} >{isSignUp ? 'Sign up' : 'Sign In'}</Button>
                <Grid container justifyContent="center" >
                    <GoogleLogin  className={classes.googleButton}
                    onSuccess={credentialResponse => {
                        successGoogle(credentialResponse);
                        
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                </Grid>
                
                <Grid container justifyContent="center" className={classes.submit}>
                    <Grid item >
                        
                        <Button onClick={switchMode} color="secondary" variant="contained" >{isSignUp ?   'Sign In' : 'Register'}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

       </Container>
    )
}

export default Auth;