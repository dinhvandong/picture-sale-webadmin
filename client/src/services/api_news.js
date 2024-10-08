import axios from "axios";
import { API_URL } from "./api";

export const createNews = async (news) => {
    try {
      const response = await axios.post(`${API_URL}/news/insert`,
      news)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const updateNews = async (news) => {
    try {
      const response = await axios.post(`${API_URL}/news/update`,
      news)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deleteNews = async (news) => {
    try {
      const response = await axios.post(`${API_URL}/news/update`,
      news)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getNews = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/news/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findNewsById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/news/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  