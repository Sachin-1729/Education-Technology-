import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function BasicTable() {


 async  function handlechange(event , row){
    event.preventDefault(); 

    const response = await fetch("http://localhost:7000/payment/modifysubscription",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          Stripesubscription_id: row.stripeSubscriptionId,
          status: event.target.value,
          
        }),
      }
    )
    if(response.ok)
    {

      setTimeout(() => {

        getallusersubscriptiondetail();
       // window.location.reload();
      }, 2000);
      
     
    }
    console.log(event.target.value);
  }
  const [users, setusers] = useState([]);
  const [plans, setplan] = useState([]);

  async function getallusersubscriptiondetail() {
    const response = await fetch("http://localhost:7000/payment/subscribe");
    if (response.ok) {
      const data = await response.json();
      setusers(data);
     
    } else {
      const data = await response.json();
      toast.error(data.error);
    }
  }
  useEffect(() => {
    getallusersubscriptiondetail();
  }, []);
  console.log(users);

  async function getallplan() {
    const response = await fetch("http://localhost:7000/payment/subscribe");
    if (response.ok) {
      const data = await response.json();
      setplan(data);
      console.log("Data", data);
    } else {
      const data = await response.json();
      toast.error(data.error);
    }
  }

  useEffect(() => {
    getallplan();
  }, []);

  function DateAndTime({ isoDate }) {
    // Format the date and time
    const formattedDate = format(new Date(isoDate), "dd/MM/yyyy"); // October 20th, 2024
    const formattedTime = format(new Date(isoDate), "hh:mm a"); // 07:21 AM

    // Return the formatted date and time in JSX
    return (
      <div>
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
    );
  }

  

 

  return (
    <>
      <div align="right" className="p-4">
        <ToastContainer />
      </div>

      <TableContainer sx={{ minWidth: 850 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Subscription Id</TableCell>
              <TableCell align="center">User Name</TableCell>

              <TableCell align="center">Plan</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Subscription Started</TableCell>
              <TableCell align="center">Subscription End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {row?.stripeSubscriptionId}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row?.userId?.name}
                </TableCell>

                <TableCell align="center">{row?.planId?.Productname}</TableCell>
                <TableCell align="center"> {row?.status}</TableCell>
                <TableCell align="center">
                  {row?.status !== 'canceled' ?(<FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      label="status"
                      onChange={(event) => handlechange(event, row)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="canceled">Cancel</MenuItem>
                    </Select>
                  </FormControl>): ("Cancelled")}
                </TableCell>

                <TableCell align="center">
                  <DateAndTime isoDate={row?.createdAt} />
                </TableCell>

                <TableCell align="center">
                  <DateAndTime isoDate={row?.currentPeriodEnd} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
