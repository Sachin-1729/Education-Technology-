import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import ContentsEdit from '../contents/Editcontent'

function Contentscontainer() {
  return (
    <div>
<     Sidebar  content={<ContentsEdit/>}
        title = "Edit Content" >

        </Sidebar>
    </div>
  )
}

export default Contentscontainer