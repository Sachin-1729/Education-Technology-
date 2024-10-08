import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Productnavbar from "../pages/Productlistcontainer"
import Usersidebar from '../pages/Usersidebar'

function Userlayout() {
  const users = useSelector((state) => state);

  console.log(users);

  const logintoken = users.user.login; 
  const Role = users.user.role;

  console.log(logintoken, "LoginToken", Role, "Role");

  if (!logintoken || Role !== "User") {
    return <Navigate to="/login" />;
  }
 
  // Otherwise, render the nested routes
  return(
    <div>
  
       <Outlet />
   
  </div>
  )

}

export default Userlayout;
