
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

  const[productname , setProductname] = useState('');
  const[productdetail , setproductdetail] = useState('');
  const[billing , setbilling] = useState('');
  const[price , setprice ] = useState('');


  function onproductnamechange(event)
  {
    setProductname(event.target.value);
  }

  function onproductdetailchange(event)
  {
    setproductdetail(event.target.value);
  }

  function onbillingchange(event)
  {
    setbilling(event.target.value);
  }

  function onpricechange(event)
  {
    setprice(event.target.value);
  }

  async function handlecreateplan(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:7000/plans/createplan',
      {
        method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  
        ProductName: productname,
        ProductDetail: productdetail,
        Productbilling: billing,
        Productprice: price,
        
        
      }),

      }
      
    )
    const data = await response.json();
    if(response.ok)
    {
      setProductname('');
      setproductdetail('');
      setbilling('');
      setprice('');
      toast.success(data.message);




    }
  }


  return (

   <>
    <form onSubmit={handlecreateplan} >
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={productname}
        onChange={onproductnamechange}
      />
      <TextField
        label="Product Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={productdetail}
        onChange={onproductdetailchange}
        multiline // This makes the TextField a TextArea
        rows={4} // Adjust the number of rows to fit your design
      />
       <TextField
        label="Price in INR"
        variant="outlined"
         type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={onpricechange}
        
      />
      <br />
      <br />
     
      <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Billing Period</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={billing}
              label="Role"
              onChange={onbillingchange}
            >
              <MenuItem value={'Daily'}>Daily</MenuItem>
              <MenuItem value={'Weekly'}>Weekly</MenuItem>
              <MenuItem value={'Monthly'}>Monthly</MenuItem>
              <MenuItem value={'Every 3 Months'}>Every 3 Months</MenuItem>
              <MenuItem value={'Every 6 Months'}>Every 6 Months</MenuItem>
             
              
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
        Add Products
      </Button>
    </form>
    <ToastContainer/>
    </> 
  );
}

export default MyForm;
