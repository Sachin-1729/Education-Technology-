import React from 'react'
import Contentofplan from './Accordiancontent'
import Usersidebar from '../pages/Usersidebar'

function Homecontainer() {
  return (
    <div>
        
    <Usersidebar content={<Contentofplan/>} />

    </div>
  )
}

export default Homecontainer