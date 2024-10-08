import React, { useEffect } from 'react'
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import UserCreate from '../components/admin/UserCreate';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import UserEdit from '../components/admin/UserEdit';

const UserEditPage = () => {
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
            <Sidebar menu="tab1" />
          </div>
          <div className="flex w-[100%]   flex-row justify-center">     
               <UserEdit id = {id} />
          </div>
        </div>
      </div>
    );
}

export default UserEditPage