import React, { useEffect } from 'react'
import CategoriesList from '../components/admin/CategoriesList';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import { isAuthenticated } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import NotificationList from '../components/admin/NotificationList';
import Promotion from '../components/admin/Promotion';
const PromotionPage = () => {
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
        <div>
          <Sidebar menu="tab10" />
        </div>
        <div className="flex w-[100%]   flex-col items-center">     
          {/* <div className="w-full h-[50px] bg-base_color">
          </div> */}
          <div className="w-full h-[50px] bg-base_color">

          </div>
          <Promotion />
        </div>
      </div>
    </div>);
}


export default PromotionPage