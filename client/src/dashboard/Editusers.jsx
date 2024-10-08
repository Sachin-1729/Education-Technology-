
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'


  

function MyForm() {

  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from URL path
  const [user, setUser] = useState({});
  const [name, setName] = useState(''); // Initialize with an empty string
  const [email, setEmail] = useState(''); // Initialize with an empty string
  const [password, setPassword] = useState(''); // Initialize with an empty string

  async function getsingleuser() {
    const response = await fetch("http://localhost:7000/users/getsingleuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  }

  // When user data is fetched, update the form fields
  useEffect(() => {
    if (user) {
      setName(user.name || ''); // Ensure fallback to an empty string
      setEmail(user.email || ''); // Ensure fallback to an empty string
      setPassword(user.password || ''); // Ensure fallback to an empty string
    }
  }, [user]);

  useEffect(() => {
    getsingleuser(); // Fetch the user data
  }, [id]); // Runs only once on mount when the component is rendered

  // Input handlers
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleupdateuser(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:7000/users/updateuser' , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Password: password,
        id: user._id
      }),

    });
    if(response.ok)
    {  
      const data = await response.json();
        toast.success(data.message);
        setName(''); // Ensure fallback to an empty string
        setEmail(''); // Ensure fallback to an empty string
        setPassword(''); // Ensure fallback to an empty string
        setTimeout(() => {
          navigate('/')
        }, 2000);

        console.log(data);
    }
   
   
  }



  return (

   <>
  
    <form onSubmit={handleupdateuser} >
     
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
      />
       <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
      >
        Edit
      </Button>
    </form>
    <ToastContainer/>
    </> 
  );
}

export default MyForm;
