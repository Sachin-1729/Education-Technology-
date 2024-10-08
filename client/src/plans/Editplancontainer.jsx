import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Editplan from './Editplan'

function EditPlans() {
  return (
    <div>
        <Sidebar  content={<Editplan/>}
        title = "Edit Plans & Membership" >
        </Sidebar>
    </div>
  )
}

export default EditPlans