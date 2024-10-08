import axios from "axios";
import { API_URL } from "./api";

export const createEventPlan = async (eventPlanData) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/event-plan/insert`,
      eventPlanData)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };
  