import React from 'react'
import HomePage from './Home'
import Usersidebar from '../pages/Usersidebar'

function Homecontainer() {
  return (
    <div>
        
    <Usersidebar content={<HomePage/>} />
    
       

    
    </div>
  )
}

export default Homecontainer