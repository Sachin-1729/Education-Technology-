import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminLayout() {
  const users = useSelector((state) => state);


console.log(users)

const logintoken =  users.user.login;
const Role = users.user.role;

console.log(logintoken ,"LoginToken" , Role ,"Role")

if(!logintoken || Role !=='Admin')
{
    return <Navigate to="/users" />;
}

   // Otherwise, render the nested routes
   return <Outlet />;
}

export default AdminLayout;
