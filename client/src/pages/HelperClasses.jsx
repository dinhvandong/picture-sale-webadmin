import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import HelperClassesAdmin from './../components/admin/HelperClassesAdmin';


const HelperClasses = () => {
  return (
    <div>
        <HeaderAdmin/>
        <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab3" />
        </div>
        <div>
          <HelperClassesAdmin />
        </div>
      </div>
    </div>
  )
}

export default HelperClasses