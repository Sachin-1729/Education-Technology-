import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Plans from './Plans'

function PlansandMembership() {
  return (
    <div>
        <Sidebar  content={<Plans/>}
        title = "Plans & Membership" >
        </Sidebar>
    </div>
  )
}

export default PlansandMembership