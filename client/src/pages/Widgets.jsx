import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import WdigetsAdmin from './../components/admin/WidgetsAdmin';


const Widgets = () => {
  return (
    <div>
        <HeaderAdmin/>
        <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab4" />
        </div>
        <div>
          <WdigetsAdmin />
        </div>
      </div>
    </div>
  )
}

export default Widgets