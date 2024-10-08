import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import UserCreate from '../components/admin/UserCreate';
import { isAuthenticated } from '../utils/localStorage';
import CabinCreate from '../components/admin/CabinCreate';

const CabinCreatePage = () => {
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
          <div >
            <Sidebar menu="tab2" />
          </div>
          <div className="flex w-[100%] flex-row justify-center">     
               <CabinCreate />
          </div>
        </div>
      </div>
    );
}

export default CabinCreatePage