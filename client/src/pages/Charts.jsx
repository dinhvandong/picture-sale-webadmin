import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import ChartsAdmin from './../components/admin/ChartsAdmin';



const Charts = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab9" />
        </div>
        <div>
          <ChartsAdmin />
        </div>
      </div>
    </div>
  )
}

export default Charts