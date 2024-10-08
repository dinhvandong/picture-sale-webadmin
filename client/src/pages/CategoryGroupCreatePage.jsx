import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import UserCreate from '../components/admin/UserCreate';
import CategoryGroupCreate from '../components/admin/CategoryGroupCreate';

const CategoryGroupCreatePage = () => {
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
            <Sidebar menu="tab3" />
          </div>
          <div className="flex w-[100%] flex-row justify-center">     
               <CategoryGroupCreate />
          </div>
        </div>
      </div>
    );
}

export default CategoryGroupCreatePage