
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




  

function MyForm() {

  const navigate = useNavigate();
  const[role , setRole] = useState('');
  const { id } = useParams(); // Extract id from URL path
  const [user, setUser] = useState({});
  const [name, setName] = useState(''); // Initialize with an empty string
  const [email, setEmail] = useState(''); // Initialize with an empty string
  const [password, setPassword] = useState(''); // Initialize with an empty string
  



  // When user data is fetched, update the form fields
  useEffect(() => {
    if (user) {
      setName(user.name || ''); // Ensure fallback to an empty string
      setEmail(user.email || ''); // Ensure fallback to an empty string
      setPassword(user.password || ''); // Ensure fallback to an empty string
    }
  }, [user]);

 

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

  async function handlecreateuser(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:7000/users/signup' , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Password: password,
        Role: role
        
      }),

    });
    if(response.ok)
    {  
      const data = await response.json();
        toast.success(data.message);
        setName(''); // Ensure fallback to an empty string
        setEmail(''); // Ensure fallback to an empty string
        setPassword(''); // Ensure fallback to an empty string
        setRole('');
        setTimeout(() => {
          navigate('/')
        }, 2000);

        console.log(data);
    }
    else
    { const data = await response.json();
      toast.error(data.message)
    }
   
   
  }

  const handleChange = (event) => {
    setRole(event.target.value);
  };



  return (

   <>
  
    <form onSubmit={handlecreateuser} >
     
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
     
      <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={'66e2d3329c82415c6c96f041'}>Admin</MenuItem>
              <MenuItem value={'66e2d38d9c82415c6c96f042'}>User</MenuItem>
              
            </Select> 
          </FormControl>
        </Box>
       <br />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
      >
        Create
      </Button>
    </form>
    <ToastContainer/>
    </> 
  );
}

export default MyForm;
