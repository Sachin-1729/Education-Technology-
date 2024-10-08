import React from 'react'
import  Users  from './Users'; 
import Sidebar from './Sidebar'
import User from './Users'

function Dashboard() {
  return (
    <div >
   
    <Sidebar content={<User />}
    title = "User Dashboard" />
    
  </div>
  )
}

export default Dashboard