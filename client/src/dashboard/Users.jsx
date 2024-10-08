

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Modaldelete from '../components/Modalpopup'

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

  const [users, setusers] = useState([]);


  async function getalluser() {
    const token = localStorage.getItem("Token");
    const response = await fetch("http://localhost:7000/users/getuserexceptloginadmin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    setusers(data);
  }
  useEffect(() => {
    getalluser();
  }, []);

 
  async function handledelete(id, event) {
    event.preventDefault(); // Prevent default anchor behavior
    const response = await fetch("http://localhost:7000/users/deleteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iid: id,
      }),
    });
    if(response.ok)
    { 
      getalluser();
      const data = await response.json();
      toast.success(data.message);
    }
  
  }



  return (

    <>
    <div align="right" className='p-4' >
    <ToastContainer/>
    <Button href="/createusers"   variant="contained"  >Create User</Button>
    </div>
    
   
    <TableContainer sx={{ minWidth: 850 }} component={Paper}>
     
      <Table  aria-label="simple table">
     
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row?.Role?.role}</TableCell>
              <TableCell align="center">{row.carbs}
              <Link to={`/edit/${row._id}`}>
              <Button  variant="contained"  >Edit</Button>
              </Link>
              </TableCell>
              <TableCell align="center">{row.protein}
                <Modaldelete
                Message="Are you sure want to delete?" 
                message="Deleting this is user is irreversible"
                id={row._id}
                onConfirm={getalluser} // Pass the callback function here
                ></Modaldelete>
              {/* <Button variant="contained"   onClick={(event) => handledelete(row._id, event)}  >Delete</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
