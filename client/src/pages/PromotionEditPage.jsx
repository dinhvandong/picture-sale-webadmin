import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import UserEdit from '../components/admin/UserEdit';
import CategoryEdit from '../components/admin/CategoryEdit';
import NotificationEdit from '../components/admin/NotificationEdit';
import NewsEdit from '../components/admin/NewsEditCopy';
import PromotionEdit from '../components/admin/PromotionEdit';
const PromotionEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("ID", id);
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
            <Sidebar menu="tab5" />
          </div>
          <div className="flex w-[100%]   flex-col items-center">    
          <div className="w-full h-[50px] bg-base_color">
          </div> 
               <PromotionEdit id = {id} />
          </div>
        </div>
      </div>
    );
}


export default PromotionEditPage