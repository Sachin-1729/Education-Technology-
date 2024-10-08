import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Transaction from './Transaction'

function Transactioncontainer() {
  return (
    <div>
    <Sidebar  content={<Transaction/>}
            title = "Transaction" >
    
    </Sidebar>
        </div>
  )
}

export default Transactioncontainer
