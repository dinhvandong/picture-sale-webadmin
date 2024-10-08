
import React, { useEffect } from 'react'
import CategoriesList from '../components/admin/CategoriesList';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import { isAuthenticated } from '../utils/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import NotificationList from '../components/admin/NotificationList';
import GalleryFolderList from '../components/admin/GalleryFolderList';
import GalleryDetailList from '../components/admin/GalleryDetailList';
const GalleryDetailPage = () => {

  const { id } = useParams();

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
          <Sidebar menu="tab7" />
        </div>
        <div className="flex w-[100%]   flex-row justify-center">     
          <GalleryDetailList id = {id} />
        </div>
      </div>
    </div>);
}


export default GalleryDetailPage