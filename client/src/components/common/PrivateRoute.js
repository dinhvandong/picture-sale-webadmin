// import { isAuthenticated } from '../../utils/localStorage';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const navigate = useNavigate();
//   const handleRedirect = () => {
//     navigate('/login');
//   };

//   const checkAuthentication = async () => {
//     const authenticated = await isAuthenticated();
//     console.log('Authenticated:', authenticated);
//     if (authenticated===false) {
//       navigate('/login');
//       setIsLogin(false);
//     } else {
//       setIsLogin(true);

//     }
//   };
//   useEffect(() => {


//     checkAuthentication();


//   }, [isLogin]);

//   return (
//     isLogin ? (
//       <Component />
//     ) :
//       (
//         <>
//         </>
//       )
//   );
// };

// export default PrivateRoute;