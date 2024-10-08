import React from 'react'
import ExamplePagesAdmin from './../components/admin/ExamplePagesAdmin';
import Sidebar from './../components/admin/SideBar';
import HeaderAdmin from './../components/admin/HeaderAdmin';


const ExamplePages = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab10" />
        </div>
        <div>
          <ExamplePagesAdmin />
        </div>
      </div>
    </div>
  )
}

export default ExamplePages