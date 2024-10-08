import React from 'react'
import Profile from './Userprofile'
import Usersidebar from '../pages/Usersidebar'

function Homecontainer() {
  return (
    <div>
        
    <Usersidebar content={<Profile/>} />
    
       

    
    </div>
  )
}

export default Homecontainer