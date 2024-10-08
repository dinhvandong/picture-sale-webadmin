import axios from "axios";
import { API_URL } from "./api";

export const createJanShop = async (janShop) => {
    try {
      const response = await axios.post(`${API_URL}/janShop/insert`,
        janShop)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const updateJanShop = async (janShop) => {
    try {
      const response = await axios.post(`${API_URL}/janShop/update`,
        janShop)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deleteJanShop = async (janShop) => {
    try {
      const response = await axios.post(`${API_URL}/janShop/delete`,
        janShop)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getJanShop = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/janShop/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findJanShopById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/janShop/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  