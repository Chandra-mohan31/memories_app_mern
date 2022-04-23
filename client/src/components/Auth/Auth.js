import { Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core';
import React,{useState} from 'react';
import useStyles from "./styles";
import Input from "./Input"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import GoogleLogin from "react-google-login";
import Icon from "./icon.js";
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import {signin,signup} from "../../actions/auth.js";
const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
function Auth() {
    const classes = useStyles();
    const history = useHistory();
 
    const dispatch = useDispatch();
    const [testRes,setTestRes] = useState();
    const [isSignup,setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const [showPassword,setShowPassword] = useState(false);
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const switchMode = () =>{
        setIsSignup(!isSignup);
        setShowPassword(false);
    }
    const googleFailure = (error) => {
        console.log("Google signin was unsuccessfull ,try later",error);
    }
    const googleSuccess = async (res) => {
        // console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH',data: {result,token}});
            history.push('/');
        } catch (error) {
            console.log(error)
        }

    }
    const responseGoogle = async (response) => {
        console.log(response);
        
      }
      
    return (
    <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{ isSignup ? 'Sign Up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                               <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                               <Input name="lastName" label="last Name" handleChange={handleChange} half />

                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} /> 
                    {
                        isSignup && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />)
                    }
                </Grid>
               
                <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>

                    {
                        isSignup ? 'SignUp' : 'Signin'
                    }
                </Button>

                <GoogleLogin 
                clientId='929882193530-43hmk2ip93q1g9dbhu6b965m0ljkdi43.apps.googleusercontent.com' 
                render={(renderProps)=>(
                    <Button 
                    className={classes.googleButton} color='primary' fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"
                    
                    >Google Signin</Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}

                 />

  <p>{testRes}</p>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {
                                isSignup ? 'Already signed up signin' : 'dont have an account signup now'
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
    )
}

export default Auth