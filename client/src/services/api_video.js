import axios from "axios";
import { API_URL } from "./api";

export const createVideo = async (news) => {
    try {
      const response = await axios.post(`${API_URL}/video/insert`,
      news)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  

  export const updateVideo = async (news) => {
    try {
      const response = await axios.post(`${API_URL}/video/update`,
      news)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deleteVideo = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/video/delete?id=${id}`)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getVideos = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/video/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findVideoById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/video/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }