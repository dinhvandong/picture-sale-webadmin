import React, { useContext, useEffect, useState } from 'react'
import iconApp from '../../assets/cruise-logo.png';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine, RiNotification2Line } from 'react-icons/ri';
import { AuthContext } from '../../AuthProvider';
import logo from '../../assets/art_logo.jpeg';
import { useNavigate } from 'react-router-dom';
const HeaderAdmin = () => {
  const {userInfo}  = useContext(AuthContext);
  const navigate = useNavigate();

  //useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // useEffect(() => {
  //   const user = useContext(AuthContext);
  //   setUserInfo(user);
  // }, []);


  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login');///sign-in
    // Perform logout action
    // ...
};
  return (
    <div className='flex flex-row justify-end w-full h-full'>
      <div className="flex h-[60px] flex-row w-full justify-center items-center bg-base_color">
        <img className='rounded-full w-[60px] ml-5 h-[60px]' src={logo} alt='icon-app' />
        <div className="flex  font-bold text-white w-[50%]  ml-[100px]">
          QUẢN LÝ DỰ ÁN TRIỂN LÃM TRANH
        </div>
        <div className="flex flex-row justify-end w-[50%]">
          {/* <button>
            <img
              className="w-[20px] h-[20px]"
              src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png"
              alt=""
            />
          </button> */}
          <button>
            <RiNotification2Line className='w-5 h-5 text-white' />
            {/* <img
              className="w-[20px] h-[20px] ml-5"
              src="https://cdn-icons-png.flaticon.com/128/148/148920.png"
              alt=""
            /> */}
          </button>
          {/* <button>
            <img
              className="w-[20px] h-[20px] ml-5"
              src="https://cdn-icons-png.flaticon.com/128/11041/11041911.png"
              alt=""
            />
          </button> */}
          <button className='ml-5 mr-5'>
            {/* <img
              className="w-[20px] h-[20px] ml-3 mr-5"
              src="https://cdn-icons-png.flaticon.com/128/225/225287.png"
              alt=""
            /> */}
            <FaUser className='w-5 h-5 text-white' onClick={toggleMenu} />
          </button>
          {/* <button>
            {userInfo.email}
          </button> */}
        </div>
      </div>
      {isMenuOpen &&
        (<div onMouseLeave={toggleMenu} className='w-[150px] items-center justify-center mt-[45px] z-10 absolute h-auto bg-edit'>

          <nav>
            <ul>
              <li>
                <a href="/profile">
                  <div className='flex mt-5 text-sm text-white'>
                    <FaUserCircle className='w-5 h-5 ml-5 mr-5 ' />            <span>Tài khoản</span>
                  </div>
                </a>
              </li>
              <li>
                <a >
                  <div onClick={handleLogout} className='flex mt-5 mb-5 text-sm text-white'>
                    <RiLogoutBoxLine className='w-5 h-5 ml-5 mr-5 ' />
                    <span>Đăng xuất</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>)}
    </div>

  )
}

export default HeaderAdmin