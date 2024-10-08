import axios from "axios";
import { API_URL } from "./api";

export const createJanVoucher = async (janVoucher) => {
    try {
      const response = await axios.post(`${API_URL}/janVoucher/insert`,
        janVoucher)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const updateJanVoucher = async (janVoucher) => {
    try {
      const response = await axios.post(`${API_URL}/janVoucher/update`,
        janCard)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deleteJanVoucher = async (janVoucher) => {
    try {
      const response = await axios.post(`${API_URL}/janVoucher/delete`,
        janCard)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getJanVoucher = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/janVoucher/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findJanVoucherById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/janVoucher/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  