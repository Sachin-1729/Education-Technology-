
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

  const [products, setproducts] = useState([]);

  async function getalluser() {
    const response = await fetch("http://localhost:7000/plans/getallplan");
    const data = await response.json();
    console.log(data)
    setproducts(data);
  }
  useEffect(() => {
    getalluser();
  }, []);

 
  async function handledelete(id, event) {
    event.preventDefault(); // Prevent default anchor behavior
    const response = await fetch("http://localhost:7000/plans/deleteproduct", {
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
    <Button href="/createplans"   variant="contained"  >Create Plans</Button>
    </div>
    
   
    <TableContainer sx={{ minWidth: 850 }} component={Paper}>
     
      <Table  aria-label="simple table">
     
        <TableHead>
          <TableRow>
            <TableCell align="center">Product Name</TableCell>
       
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Billing</TableCell>
            <TableCell align="center">Edit</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.Productname}
              </TableCell>
              <TableCell align="center">{row.PriceinInr}</TableCell>
              <TableCell align="center">{row.Billingpriod}</TableCell>
              <TableCell align="center">{row.carbs}
              <Link to={`/editproducts/${row._id}`}>
              <Button  variant="contained"  >Edit</Button>
              </Link>
              </TableCell>
              {/* <TableCell align="center">{row.protein}
              <Button variant="contained"   onClick={(event) => handledelete(row._id, event)}  >Delete</Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
