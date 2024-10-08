import axios from "axios";
import { API_URL } from "./api";

export const createJanCard = async (janCard) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axios.post(`${API_URL}/janCard/insert`,
        janCard, config)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const updateJanCard = async (janCard) => {
    try {
      const response = await axios.post(`${API_URL}/janCard/update`,
        janCard)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

export const deleteJanCard = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${API_URL}/janCard/delete?token=${token}&id=${id}`,
       {
      withCredentials: true,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

  export const getJanCard = async () => {
    try {
      const response = await axios.get(`${API_URL}/janCard/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }

  export const findJanCardById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/janCard/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
  