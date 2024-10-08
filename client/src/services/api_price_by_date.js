import axios from "axios";
import { API_URL } from "./api";


export function removeEmptyStringsFromURL(url) {
  const urlParts = url.split('/');
  const filteredParts = urlParts.filter(Boolean);
  const cleanedURL = filteredParts.join('/');

  return cleanedURL;
}
export const createPriceArray = async (dateFrom, dateTo, priceDay, priceDinner, priceDayNonRefund,priceDinnerNonRefund, priceWeekDay, priceWeekEnd ) => 
{
    try 
    {

    
    console.log("DateFrom:", dateFrom);
    console.log("DateTo:", dateTo);
    const response = await axios.post(`${API_URL}/pricetimes/insertMulti2?dateFrom=${dateFrom}&dateTo=${dateTo}&priceDay=${priceDay}&priceDinner=${priceDinner}&priceDayNonRefund=${priceDayNonRefund}&priceDinnerNonRefund=${priceDinnerNonRefund}&priceWeekDay=${priceWeekDay}&priceWeekEnd=${priceWeekEnd}`,
      {
        withCredentials: true,
      },)
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  };

  export const getPriceArray = async (page, size)=>{

    try 
    {
      const response = await axios.get(`${API_URL}/pricetimes/getList?page=${page}&size=${size}`,
      {
        withCredentials: true,
      })
      return response.data.content;
    } catch (error) 
    {
      throw error;
    }
  }


//   reactjs get data from rest api get mode json below
// {
// "id": 2775,
// "dateTime": 20240506,
// "dateTimeString": "2024/05/06",
// "monthTimeString": "202405",
// "priceDay": 1750.0,
// "priceDayNonRefund": 1600.0,
// "priceDinner": 2000.0,
// "priceDinnerNonRefund": 1750.0,
// "active": true,
// "activeDay": true,
// "activeDinner": true
// }
  export const getPriceByDate = async (dateString)=>{

    try 
    {
      const response = await axios.get(`${API_URL}/pricetimes/getPriceByDate?date=${dateString}`,
      {
        withCredentials: true,
      })
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  }

  