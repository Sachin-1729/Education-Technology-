import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const stylebutton={
    
         
          display: 'flex',
            justifyContent:"space-between",
          alignItems: "flex-end",
          spaceBetween: "even"
}

export default function TransitionsModal({Message , id , message , onConfirm }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteid , setdeleteid] = React.useState([]);

//   setdeleteid(id);


  async function handledelete() {
    console.log(id)
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
      
      const data = await response.json();
      onConfirm();
      handleClose();
      toast.success(data.message);
    }
  
  }



  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Delete</Button>
      <ToastContainer/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
             {Message}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>
            <Box sx={stylebutton}>
            <Button sx={{marginTop:4}} onClick={handleClose} variant="contained" >Cancel</Button>
            <Button sx={{marginTop:4}} onClick={handledelete} variant="contained">Delete</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}