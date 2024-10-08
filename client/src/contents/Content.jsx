// import React, { useState, useEffect, useContext } from "react";
// import { styled } from "@mui/material/styles";
// import {
//   Box,
//   Container,
//   Paper,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {Link} from 'react-router-dom'

// const CustomBox = styled(Box)({
//   padding: 10,
// });

// const CustomBox_For_Form = styled(Box)({
//   paddingTop: 50,
//   paddingBottom: 50,
//   paddingLeft: 100,
//   paddingRight: 100,
// });

// function CreateProperties() {
//   const [plans, setplans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(""); // State to store the selected value
//   const[videos , setvideos] = useState([]);
//   const[document , setdocument] = useState([]);

//   async function gettingallplan(req, res) {
//     const response = await fetch("http://localhost:7000/plans/getallplan");
//     if (response.ok) {
//       const data = await response.json();
//       setplans(data);
//     }
//   }

//   useEffect(() => {
//     gettingallplan();
//   }, [setplans]);

 

//   function handlechangeplan(event)
//   {
//        setSelectedPlan(event.target.value);
//   }
 
//   async function handlesubmit(event) {
//     event.preventDefault(); 
//     try {
//       const response = await fetch('http://localhost:7000/content/getcontentbyplan', {
//         method: 'POST', // Enclose POST in quotes
//         headers: { // Fix content-type syntax
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ // Convert the body object to a JSON string
//           planId: selectedPlan
//         }),
//       });
  
//       const data = await response.json(); // Parse the response as JSON
      
//       console.log(data); // Handle the response data
//     } catch (error) {
//       console.error('Error submitting:', error); // Handle errors
//     }
//   }
  

//   return (
//     <div>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <CustomBox>
//           <Paper>
//             <Link to="/createcontent">
           
//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
//               sx={{ mt: 3 }}
//             >
//               Create Content
//             </Button>
//             </Link>
//             <ToastContainer />
//             <CustomBox_For_Form>
//               <form onSubmit={handlesubmit}>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel id="plans-dropdown-label">Plans</InputLabel>
//                   <Select
//                     labelId="plans-dropdown-label"
//                     id="plans-dropdown"
//                     label="Plans"
//                     value={selectedPlan}
//                     onChange={handlechangeplan}
//                   >
//                     {plans?.map((plan) => (
//                       <MenuItem key={plan._id} value={plan._id}>
//                         {plan?.Productname}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <br />
//                 <br />

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   sx={{ mt: 3 }}
//                 >
//                   Select Plan
//                 </Button>
//               </form>
//             </CustomBox_For_Form>
//           </Paper>
//         </CustomBox>
//       </Container>
//     </div>
//   );
// }

// export default CreateProperties;
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import  {Box} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function BasicTable() {

  const navigate = useNavigate();
  const[content , setcontent] = React.useState([]);

async function getallcontent()
{
  const response = await fetch('http://localhost:7000/content/getallcontent')
  if(response.ok)
  {
    const data = await response.json();
    setcontent(data);
  }

}
React.useEffect(()=>{
  getallcontent();
} , []);


function handleEdit(event , id)
{
  event.preventDefault();

    navigate(`/editcontent/${id}`);

}

async function deletecontent(event , id)
{ 
  event.preventDefault();
     const response = await fetch('http://localhost:7000/content/deletecontent',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
     id: id
      }),

    });

    if(response.ok)
    {
      toast.success("Content Deleted successfully!");
      getallcontent();
    }
    else{
      toast.error("Error in Deleting Content")
    }

     
   
     
}



  return (
    <>
    <Box align="right">

  
    <Link  to="/createcontent">
           
           <Button
       variant="contained"
          color="primary"
          type="submit"
         sx={{ mt: 3 }}
         
        >
         Create Content
         </Button>
        </Link>
        </Box>
  
    <TableContainer component={Paper}>
    <ToastContainer />
                 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Content Title</TableCell>
            <TableCell align="center">Content Description</TableCell>
            <TableCell align="center">Plan Name</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Content_title}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.Content_description}
              </TableCell>
              <TableCell align="center">{row.planId.Productname}</TableCell> 
              <TableCell align="center">
              
             <Button onClick={(event) => handleEdit(event, row._id)} align="center" variant="contained">Edit</Button>
                 
            </TableCell>
            <TableCell align="center">
                 <Button  align="center" variant="contained" onClick={(event) => deletecontent(event, row._id)} >Delete</Button>
            </TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}