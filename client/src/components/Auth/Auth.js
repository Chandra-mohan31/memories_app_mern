import { Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core';
import React,{useState} from 'react';
import useStyles from "./styles";
import Input from "./Input"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
function Auth() {
    const classes = useStyles();
    const isSignup = false;
    const [showPassword,setShowPassword] = useState(false);
    const handleChange = () => {
        //
    }
    const handleSubmit = () => {
        //
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
                               <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                               <Input name="firstname" label="First Name" handleChange={handleChange} half />

                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} /> 
                    {
                        isSignup && (<Input name="confirmpassword" label="Repeat Password" handleChange={handleChange} type="password" />)
                    }
                </Grid>
                <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>

                    {
                        isSignup ? 'SignUp' : 'Signin'
                    }
                </Button>
            </form>
        </Paper>
    </Container>
    )
}

export default Auth