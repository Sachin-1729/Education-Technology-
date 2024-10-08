import React, { useState, useContext , useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Link as Links } from "react-router-dom"; 


import { TEInput, TERipple } from "tw-elements-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  useDispatch } from "react-redux";
import Loginfunction from '../Redux/loginfucntion'
import authReducer, { loginDone, logoutDone } from '../Redux/loginfucntion';



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Correct this line
  
   const[email , setEmail] = useState('');
   const[password , setpassword] = useState('');
  
  
  
  
  function handleEmailChange(event)
  {
    setEmail(event.target.value);
    
  }
  function handlepasswordchange(event)
  {
    setpassword(event.target.value);
   
  }
  
  
  
  
  
  async function signin()
  {   
      const Email = email;
      const Password = password;
      if(!email||!password)
      {
        toast.error("All fields are mandatory");
        return false;
      }
      const response = await fetch('http://localhost:7000/users/signin' , {
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
          
             },
             body: JSON.stringify({
            
              Email: Email,
              Password: password,
              
             })   
      })
      if(response.ok)
      {
          const data = await response.json();
          console.log(data);
          
          
          toast.success(data.message)
          setEmail('');
          setpassword('');
          localStorage.setItem('Token' , data.token);
          dispatch(loginDone({'Token' : data.token , Role: data.Role}))
          if(data.Role === 'Admin' && data.token)
          {
            navigate('/')
          }
          else{
            navigate('/membership')
          }
       
          
          
  
      }
      else{
          const data = await response.json();
          console.log(data);
          toast.error(data.message);
        }
  }
  
  function handleSubmit(event) {
    event.preventDefault();
   signin();
   
  }



  return (
   <>
   
  
    {/* <div className="App" onMouseMove={handleMouseMove}>
      <div className="circle" style={{ left: trail.x, top: trail.y }}></div> */}
    

    <Container component="main" maxWidth="xs">
    <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email} // Set value to email state
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password} // Set value to password state
            onChange={(e) => setpassword(e.target.value)} // Update password state
          />
    
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
           
          >
            Sign In
          </Button>
         
          <Grid container>
           
            <Grid item>
              <Link href="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    {/* </div> */}
    </>
  );
}
