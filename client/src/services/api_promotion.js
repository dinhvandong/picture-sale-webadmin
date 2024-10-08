import axios from "axios";
import { API_URL } from "./api";

export const createPromotion = async (promotion) => {
    try {
      const response = await axios.post(`${API_URL}/promotion/insert`,
      promotion)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const updatePromotion = async (promotion) => {
    try {
      const response = await axios.post(`${API_URL}/promotion/update`,
      promotion)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deletePromotion = async (promotion) => {
    try {
      const response = await axios.post(`${API_URL}/promotion/update`,
      promotion)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getPromotion = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/promotion/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findPromotionById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/promotion/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  