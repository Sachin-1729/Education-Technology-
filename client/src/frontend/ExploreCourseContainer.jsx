import React from 'react'
import Product from './Product'
import Usersidebar from '../pages/Usersidebar'

function Homecontainer() {
  return (
    <div>
        
    <Usersidebar content={<Product/>} />
    
       

    
    </div>
  )
}

export default Homecontainer