import React, { useEffect } from 'react'
import CategoryGroup from '../components/admin/CategoryGroup';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import { isAuthenticated } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const CategoryGroupPage = () => {
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
        <div className="flex w-[100%]   flex-row justify-center">     
          <CategoryGroup />
        </div>
      </div>
    </div>
  );
}

export default CategoryGroupPage