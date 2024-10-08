import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Contents from '../contents/Content'

function Contentscontainer() {
  return (
    <div>
<     Sidebar  content={<Contents/>}
        title = "Contents" >

        </Sidebar>
    </div>
  )
}

export default Contentscontainer