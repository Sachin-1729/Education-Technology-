import React from 'react'
import Sidebar from './Sidebar'
import Edituser from './Editusers'

function Edituserss() {
  return (
    <div>
        <Sidebar  content={<Edituser/>}
        title = "Edit User" >

        </Sidebar>
    </div>
  )
}

export default Edituserss