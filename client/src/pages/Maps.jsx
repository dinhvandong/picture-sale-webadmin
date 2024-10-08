import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import MapsAdmin from './../components/admin/MapsAdmin';


const Maps = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab11" />
        </div>
        <div>
          <MapsAdmin />
        </div>
      </div>
    </div>
  )
}

export default Maps