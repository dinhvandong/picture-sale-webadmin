import React, { useEffect } from 'react'
import HeaderAdmin from './../components/admin/HeaderAdmin';
import Sidebar from './../components/admin/SideBar';
import UserInterfaceAdmin from './../components/admin/UserInterfaceAdmin';
// import  { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { isAuthenticated } from './../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../utils/localStorage";
const UserInterface = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      console.log("authenticated", authenticated);
      if (!authenticated) {
         navigate('/login');
      } else {
      }
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    checkAuthentication();
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-row w-full">
        <div>
          <Sidebar menu="tab1" />
        </div>
        <div className="flex w-[100%]   flex-row justify-center">     
             <UserInterfaceAdmin />
        </div>
      </div>
    </div>
    // <div>
    //   <HeaderAdmin/>
    //   <div className="flex flex-row w-full">
    //     <div className='w-[15%]'>
    //       <Sidebar menu="tab5" />
    //     </div>
    //     <div className="flex w-[100%] flex-row justify-center">
    //       <UserInterfaceAdmin />
    //     </div>
    //   </div>
    // </div>
  )
}

export default UserInterface