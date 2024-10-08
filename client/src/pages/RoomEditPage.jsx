import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import HomeAdmin from '../components/admin/HomeAdmin';
import UserCreate from '../components/admin/UserCreate';
import RoomCreate from '../components/admin/RoomCreate';
import RoomEdit from '../components/admin/RoomEdit';

const RoomEditPage = () => {
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
      <div className="flex flex-row w-full h-auto">
        <div >
          <Sidebar menu="tab2" />
        </div>
        <div className="flex h-auto w-[100%] flex-row justify-center">     
             <RoomEdit id={id} />
        </div>
      </div>
    </div>
  );

}

export default RoomEditPage