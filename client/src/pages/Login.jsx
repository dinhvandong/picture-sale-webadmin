import React, { useContext, useEffect, useState } from 'react'
//import iconImg from '../assets/twemoji_pig-face.png'
import logo from '../assets/logo_horizontal.png'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';
import { AuthContext } from '../AuthProvider';
import { loginRequest } from './../services/api';
import bg_signin from '../assets/bg_signin.png'
import logo_icon from '../assets/art_logo.jpeg';
const Login = () => {
 const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const { login } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  // const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    const result = await loginRequest(email, password);
    if(result.success===200){
      const token = result.data.message;
      const user = result.data
      login(token, user);
      navigate('/admin');
      
    }else {
      console.log("resultLogin:", result);
    }
   // navigate('/admin');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
         navigate('/admin');
      } else {
      }
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    checkAuthentication();
  }, []);
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-base_color' 
    // style={{
    //   backgroundImage: `url(${bg_signin})`, backgroundRepeat: 'no-repeat',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // }}
    >
      <img src={logo_icon} alt='pig-icon' className='rounded-full mt-5 mb-5 w-[250px] h-auto' />
      <form className="w-1/4 h-auto p-8 bg-[#EB6744] rounded shadow" >
        <div className="mt-4 mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            id="myCheckbox"
            className="w-5 h-5 text-blue-500 form-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="myCheckbox" className="ml-2">
            Remember me !
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-5 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login