import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import TypographyAdmin from './../components/admin/TypographyAdmin';


const Typography = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab2" />
        </div>
        <div>
          <TypographyAdmin />
        </div>
      </div>
    </div>
  )
}

export default Typography