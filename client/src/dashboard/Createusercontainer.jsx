import React from 'react'
import Sidebar from './Sidebar'
import Edituser from './Editusers'
import Createuser from './CreateUser'

function Edituserss() {
  return (
    <div>
        <Sidebar  content={<Createuser/>}
        title = "Create User" >
        </Sidebar>
    </div>
  )
}

export default Edituserss