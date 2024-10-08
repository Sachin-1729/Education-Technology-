import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import ContentsCreate from '../contents/Createcontent'

function Contentscontainer() {
  return (
    <div>
<     Sidebar  content={<ContentsCreate/>}
        title = "Create Contents" >

        </Sidebar>
    </div>
  )
}

export default Contentscontainer