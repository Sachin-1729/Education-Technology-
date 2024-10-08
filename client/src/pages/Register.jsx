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

function Register() {


    const [name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setpassword] = useState('');
   
    const[password1 , setpassword1] = useState('');
    const[password2 , setpassword2] = useState('');
    const[role , setRole] = useState([]);
     
   
   
   function handlenamechange(event)
   {
     setName(event.target.value); 
     console.log(name)
   
   }
   function handleEmailChange(event)
   {
     setEmail(event.target.value);
     console.log(email);
   }
   function handlepassword1change(event)
   {
     setpassword1(event.target.value);
   }
   
   function handlepassword2change(event)
   {
     setpassword2(event.target.value)
   }
   
    function confirmpassword() {
     if (password1 !== password2) {
       toast.error('Passwords do not match!');
   
       return false;
       
     }
     else if(email ==='' || password1=='' || password2 =='' || name=='')
     {
       toast.error('All fields are mandatory');
       return false;
     }
     else {
       setpassword(password1);
       console.log(password ,"password")
       return true;
     }  
   };
   
   async  function signup()
   {
     const Email = email;
     const Name = name;
   
   
     try {
       setRole('66e2d38d9c82415c6c96f042');
   const response = await fetch('http://localhost:7000/users/signup' , {
      method: 'POST',
      headers:{
       'Content-Type': 'application/json',
   
      },
      body: JSON.stringify({
       Name: Name,
       Email: Email,
       Password: password1,
       Role: "66e2d38d9c82415c6c96f042",
       
      })
   })
   if(response.ok)
   {
     toast.success("User Created Successfully");
     setName('');
     setEmail('');
     setpassword1('');
     setpassword2('');
     
   }
   else{
     const data = await response.json();
     console.log(data);
     toast.error(data.message);
   }
   
       
       
     } catch (error) {
      
       toast.error(error);
     }
   
   
   }
   
   function handleSubmit(event) {
     event.preventDefault();
   
     if(confirmpassword())
      {
       signup();
      }
      else{
     toast.error("Error in Login")
      }
    
     
    
   }

  return (
    <div>
    

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handlenamechange} // Update email state
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
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
            value={password1}
            onChange={handlepassword1change}
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
            value={password2}
            onChange={handlepassword2change}
          />
    
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
           
          >
            Sign Up
          </Button>
         
          <Grid container>
           
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

    </div>
  )
}

export default Register