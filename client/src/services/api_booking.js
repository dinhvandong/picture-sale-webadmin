import axios from "axios";
import { API_URL } from "./api";

export const createBooking = async (booking) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/booking/insert`,
      booking)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };


  export const getBookings = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/booking/findAll`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  
  }
  