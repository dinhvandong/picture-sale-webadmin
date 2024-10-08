import React, { useEffect } from 'react'
import CategoriesList from '../components/admin/CategoriesList';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import { isAuthenticated } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import CruiseList from '../components/admin/CruiseList';
import RoomList from '../components/admin/RoomList';
import TimeTablePriceList from '../components/admin/TimeTablePriceList';

const TimeTablePricePage = () => {
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
          <Sidebar menu="tab8" />
        </div>
        <div className="flex w-[100%]   flex-row justify-center">     
          <TimeTablePriceList />
        </div>
      </div>
    </div>
  );
}

export default TimeTablePricePage