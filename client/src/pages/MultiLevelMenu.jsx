import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import MLMAdmin from './../components/admin/MLMAdmin';


const MultiLevelMenu = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab12" />
        </div>
        <div>
          <MLMAdmin />
        </div>
      </div>
    </div>
  )
}

export default MultiLevelMenu