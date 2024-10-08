import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Subscription from './Subscriptions'

function Subscriptioncontainer() {
  return (
    <div>
<Sidebar  content={<Subscription/>}
        title = "Subscription" >

        </Sidebar>
    </div>
  )
}

export default Subscriptioncontainer