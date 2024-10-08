import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Createplan from './Createplan'

function CreatePlans() {
  return (
    <div>
        <Sidebar  content={<Createplan/>}
        title = "Create Plans & Membership" >
        </Sidebar>
    </div>
  )
}

export default CreatePlans