import axios from "axios";
import { API_URL } from "./api";

export const createItinerary = async (item) => {

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
      const response = await axios.post(`${API_URL}/itinerary/insert`,
        item, config)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const updateItinerary = async (item) => {
    try {
      const response = await axios.post(`${API_URL}/itinerary/update`,
        item)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const deleteItinerary = async (item) => {
    try {
      const response = await axios.post(`${API_URL}/itinerary/update`,
        item)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getItinerary = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/itinerary/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }


  export const findItineraryById = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/itinerary/findById?id=${id}`, {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  