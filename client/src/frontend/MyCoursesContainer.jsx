import React from 'react'
import Mycourses from './Pricing'
import Usersidebar from '../pages/Usersidebar'

function Homecontainer() {
  return (
    <div>
        
    <Usersidebar content={<Mycourses/>} />
    
       

    
    </div>
  )
}

export default Homecontainer