import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import TablesAdmin from './../components/admin/TablesAdmin';


const Tables = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab7" />
        </div>
        <div>
          <TablesAdmin />
        </div>
      </div>
    </div>
  )
}

export default Tables