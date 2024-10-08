import React from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import FormAdmin from './../components/admin/FormAdmin';


const Form = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab6" />
        </div>
        <div>
          <FormAdmin />
        </div>
      </div>
    </div>
  )
}

export default Form