import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import MediasAdmin from './../components/admin/MediasAdmin';
import Sidebar from './../components/admin/SideBar';


const Medias = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab8" />
        </div>
        <div>
          <MediasAdmin />
        </div>
      </div>
    </div>
  )
}

export default Medias