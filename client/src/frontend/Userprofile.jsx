import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import {Card , CardContent , Typography} from '@mui/material'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Userprofile() {
 
    const[name , setname] = useState('');
    const[email , setemail] = useState('');
    const[password , setpassword] = useState('');


    async function myprofile()
    {
        const token = localStorage.getItem("Token");
        const response = await fetch('http://localhost:7000/users/myprofile',{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
         
            
          }),
      
        })
        if(response.ok)
        {
            const data = await response.json();
            setemail(data.email);
            setname(data.name)
           
            setpassword(data.password)
           
        }
        else{
            const data = await response.json();
            
        }
    }
 
    const logout = (event) => {
        event.preventDefault()
        localStorage.removeItem("Role");
        localStorage.removeItem("Token");
        // Redirect to login page or another action if needed
        window.location.reload();
      
      };

useEffect(()=>{
    myprofile();
}, [])

  return (
    <div>
      <Box
        component="section"
        sx={{ ml: 10, mr: 10, mt: 10, p: 2 }}
      >
     <Box sx={{ flexGrow: 1 }}>
      {/* Outer Box to contain both Card and Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Card Component */}
        <Card sx={{ marginRight: 2, width:700}}>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ fontWeight: 'bold'}} variant="body2" color="text.secondary">
              Email: {email}
            </Typography>
            <br />
            <Typography sx={{ fontWeight: 'bold'}} variant="body2" color="text.secondary">
              Password: {password}
            </Typography>
          </CardContent>
        </Card>
        
        {/* Button Component */}
        <Button onClick={(event)=>{return logout(event)}} variant="contained">Logout</Button>

      </Box>
    </Box>
      </Box>
    </div>
  );
}

export default Userprofile;
