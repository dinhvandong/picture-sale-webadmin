// utils/localStorage.js
import axios from 'axios';
import { ROOT_URL } from '../services/api';
const API_URL = `http://${ROOT_URL}/api`; // Replace with your API URL

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get(`${API_URL}/user/findToken?token=${token}`
      , {
        withCredentials: true,
      },);
      const user = response.data;
      console.log("USER:"+ user);

      if (user.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};