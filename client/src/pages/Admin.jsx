import React, { useEffect } from "react";
import HomeAdmin from './../components/admin/HomeAdmin';
import Sidebar from './../components/admin/SideBar';
import HeaderAdmin from './../components/admin/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../utils/localStorage";


const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
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
        <div className='w-[15%]'>
          <Sidebar menu="tab1" />
        </div>
        <div className="flex w-[100%] flex-row justify-center">
          <HomeAdmin />
        </div>
      </div>
    </div>
  );
};

export default Admin;
