import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function Guestlayout() {

    // const users = useSelector((state) => state);
    // const logintoken =  users.user.login;
  const logintoken = useSelector((state) => state.user.login);

  // If the user is logged in, navigate to the home page
  if (logintoken) {
    return <Navigate to="/" replace  = {true}/>;
  }

  // Otherwise, render the nested routes
  return <Outlet />;
} 



export default Guestlayout;
