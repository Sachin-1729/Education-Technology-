
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



  

function MyForm() {

  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from URL path
  const[products , setproducts] = useState('');
  const [Productname, setProductName] = useState(''); // Initialize with an empty string
  const [Price, setPrice] = useState(''); // Initialize with an empty string
  

  async function getsingleuser() {
    const response = await fetch("http://localhost:7000/plans/getsingleproducts", {
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
      console.log(data)
      setproducts(data);
    }
  }

  // When user data is fetched, update the form fields
  useEffect(() => {
    if (products) {
        setProductName(products.Productname || ''); // Ensure fallback to an empty string
        setPrice(products.PriceinInr || ''); // Ensure fallback to an empty string
     
    }
  }, [products]);

  useEffect(() => {
    getsingleuser(); // Fetch the user data
  }, [id]); // Runs only once on mount when the component is rendered

  // Input handlers
  function handleProductNameChange(event) {
    setProductName(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }



  async function handleupdateuser(event)
  {
    event.preventDefault();
    const response = await fetch('http://localhost:7000/plans/updateplan' , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      membership_id_of_our_database: id,
      Productname: Productname,
      Price: Price
      }),

    });
    if(response.ok)
    {  
      const data = await response.json();
      setProductName('');
      setPrice('');
        toast.success(data.message);
       
    

        console.log(data);
    }
   
   
  }



  return (

   <>
  
    <form onSubmit={handleupdateuser} >
     
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={Productname}
        onChange={handleProductNameChange}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        value={Price}
        onChange={handlePriceChange}
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
