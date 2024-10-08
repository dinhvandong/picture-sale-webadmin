import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Sidebar from '../components/admin/SideBar';
import CategoryEdit from './../components/admin/CategoryEdit';
import TransactionEdit from './../components/admin/TransactionEdit';

const TransactionEditPage = () => {
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
            <Sidebar menu="tab2" />
          </div>
          <div className="flex w-[100%]   flex-row justify-center">     
               <TransactionEdit id = {id} />
          </div>
        </div>
      </div>
    );
}

export default TransactionEditPage