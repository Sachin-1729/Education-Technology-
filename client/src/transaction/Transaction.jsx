

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
import { format } from 'date-fns';





export default function BasicTable() {

  const [users, setusers] = useState([]);
  const[plans , setplan] = useState([]);
  const[transaction , settransaction] = useState([]);
  const [viewmore, setviewmore ] = useState([]);
  



 
 async function getallusersubscriptiondetail()
 {
    const response = await fetch('http://localhost:7000/payment/subscribe');
    if(response.ok)
    {
      const data = await response.json();
      setusers(data);
    }
    else{
      const data = await response.json();
      toast.error(data.error)
    }
 }




 async function getalltransactiondetail()
 {
  const response = await fetch('http://localhost:7000/payment/transaction');
  if(response.ok)
  {
     const data = await response.json();
     settransaction(data)
     console.log(data);
 
  }
 }


  useEffect(()=>{
   
    getalltransactiondetail()
  } , [])
console.log(users);

useEffect(()=>{
  const intialview =[];
  for(let i=0; i<transaction.length; i++)
   {    
     intialview.push(false);
         // setviewmore[i] = false;
   }
   setviewmore(intialview)
 } , [transaction]) 
 

function DateAndTime({ isoDate }) {
  // Format the date and time
  const formattedDate = format(new Date(isoDate), 'dd/MM/yyyy'); // October 20th, 2024
  const formattedTime = format(new Date(isoDate), 'hh:mm a');        // 07:21 AM

  // Return the formatted date and time in JSX
  return (
    <div>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}


function handleviewmore(event , index)
{ 
  event.preventDefault();
  const updatedViewmore = [...viewmore];

  if(viewmore[index])
  {
    
    updatedViewmore[index] = false;
    setviewmore(updatedViewmore);
  }
  else
  { 
    updatedViewmore[index] = true;
    setviewmore(updatedViewmore);
    
  }


}


  return (

    <>
    <div align="right" className='p-4' >
    <ToastContainer/>
 
    </div>
    
   
    <TableContainer sx={{ minWidth: 850 }} component={Paper}>
     
      <Table  aria-label="simple table">
     
        <TableHead>
          <TableRow>
            <TableCell align="center">Subscription Id</TableCell>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">Plan</TableCell>
            <TableCell align="center">Transaction Amount in INR</TableCell>
            <TableCell align="center">Status</TableCell> 
            <TableCell align="center">Transaction Id</TableCell>
            <TableCell align="center">Transaction Time</TableCell>
           
          
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction?.map((row , index) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell align="center"> {row?.subscriptionId}</TableCell>
              <TableCell align="center" component="th" scope="row">
              {row?.userId?.name}
              </TableCell>
             
            
              <TableCell align="center">{row?.planId.Productname}</TableCell>
              <TableCell align="center"> {row?.amount}</TableCell>
             
             
             
            
              <TableCell align="center">
              {row.status}
                </TableCell>
               
              <TableCell sx={{cursor:'pointer'}} align="center" onClick={(event)=>handleviewmore(event , index)} >
             {viewmore[index] === true ?row.stripeTransactionId : row.stripeTransactionId.substring(0, 20)+"..."}
                </TableCell>

                <TableCell align="center">
                <DateAndTime isoDate={row?.createdAt}></DateAndTime>
                </TableCell>
              
              
             
            
             
            
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
