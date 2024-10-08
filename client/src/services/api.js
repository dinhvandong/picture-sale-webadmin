// api.js
import axios from 'axios';
// export const ROOT_URL = "api.ambassadordaycruise.com";

export const ROOT_URL = "localhost:8080";
export const API_URL_IMAGE = `http://${ROOT_URL}/api/images/`;

export const API_URL = `http://${ROOT_URL}/api`; // Replace with your API URL
axios.defaults.baseURL = `http://${ROOT_URL}`; // Replace with your backend API's base URL

// Add the following lines to set the CORS headers
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // Replace '*' with the allowed origin(s) of your backend API
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Specify the allowed HTTP methods
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'; // Specify the allowed headers
export const loginRequest = async (email, password) => {

  const data = {
    // JSON data to be sent in the request body
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, data,
      {
        withCredentials: true,
      });
    console.log("login:", response);
    if (response.data.success === 200) {
      const token = response.data.message;
      localStorage.setItem("token", token);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/user/findAll?token=${token}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/findById?token=${token}&id=${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFromToken = async (token) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/findByToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/user/insert?token=${token}`, {
      withCredentials: true,
    }, userData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/user/update?token=${token}`, {
      withCredentials: true,
    }, userData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userID) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/user/delete?token=${token}&id=${userID}`, {
      withCredentials: true,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category-group/findAll?token=${token}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCategory = async () => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category/findAll`,
      {
        withCredentials: true,
      });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryByGroupId = async (groupId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category/findAllByGroupId?token=${token}&groupId=${groupId}`,
      {
        withCredentials: true,
      }

    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createGroups = async (groupData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category-group/insert?token=${token}`, {
      withCredentials: true,
    }, groupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryData) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category/insert?token=${token}`, categoryData);
    console.log("categoryData",categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category/findById?id=${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/transaction/findAll?token=${token}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const findTransactionsByUserId = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/transaction/findAllByUserId?token=${token}&userId=${userId}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/transaction/insert?token=${token}`, {
      withCredentials: true,
    },
      transactionData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRoom = async (roomData) => {
  console.log("JSONXXX:", roomData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/room/insert?token=${token}`,
      roomData, config)

    console.log("JSONDATA:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGallery = async (galleryData) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/galleryFolder/insert`,
      galleryData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGallery = async (galleryData) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/galleryFolder/insert`,
      galleryData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (roomData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log("AAAXXXUUU:", roomData);
    const response = await axios.post(`${API_URL}/room/update?token=${token}`,
      roomData, config)
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const deleteRoom = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${API_URL}/room/delete?token=${token}&id=${id}`,
       {
      withCredentials: true,
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRooms = async () => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/room/findAll`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getGalleries = async () => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/galleryFolder/findAll`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getGalleryById = async (galleryID) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/galleryFolder/findById?id=${galleryID}`,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const getGalleryItemsById = async (galleryID) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/galleryFolder/findAllGalleryItems?galleryID=${galleryID}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getEvents = async () => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/event-plan/findAll`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }

}

export const getEventsItem = async (eventID) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/event-plan/findAllEventItems?eventID=${eventID}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }

}

export const getEventsItemChild = async (eventID, eventItemID) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/event-plan/findAllEventItemsChild?eventID=${eventID}&eventItemID=${eventItemID}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}


export const createEvent = async (eventData) => {

  console.log("EventData:", eventData);
  try {
    const response = await axios.post(`${API_URL}/event-plan/insert`, eventData, {
      withCredentials: true,
    }
    )
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/event-plan/update`,
      eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (eventID) => {
  try {
    const response = await axios.get(`${API_URL}/event-plan/findById?id=${eventID}`)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventID) => {
  console.log("delete_eventID:", eventID);
  try {
    const response = await axios.post(`${API_URL}/event-plan/delete`, eventID
    )
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEventItem = async (eventID, eventItemID) => {
  //console.log("delete_eventID:", eventItemID);
  try {
    const response =
      await axios.post(`${API_URL}/event-plan/remove-event-plan-item?id=` + eventID + "&itemID=" + eventItemID)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPricesByRoomID = async (roomID) => {
  try {
    //const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/priceFolio/findByRoomID?id=${roomID}`, {
      withCredentials: true,
    });
    return response.data.data.priceTableList;
  } catch (error) {
    throw error;
  }

}

export const getRoomById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(`${API_URL}/room/findById?id=${id}`, {
        withCredentials: true,
      });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateTransaction = async (transactionData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/transaction/update?token=${token}`,
      {
        withCredentials: true,
      }, transactionData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNotification = async (notificationData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/notification/insert?token=${token}`,
      notificationData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotification = async (notificationData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/notification/update?token=${token}`,
      {
        withCredentials: true,
      }, notificationData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllNotification = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/notification/findAll?token=${token}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (groupID, categoryData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category/update?token=${token}&groupID=${groupID}`, categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroups = async (groupData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/category-group/update?token=${token}`, {
      withCredentials: true,
    }, groupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios
      .post(`${API_URL}/category-group/findById?token=${token}&id=${id}`, {
        withCredentials: true,
      });

    console.log("response1111:", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getFirstSentence =(text)=> {
  const sentences = text.trim().split(/[.!?]/);
  const firstSentence = sentences[0].trim();
  return firstSentence;
}

export const convertDateFormat = (inputDate) => {
  let inpuDateString = inputDate + "";
  const year = inpuDateString.substring(0, 4);
  const month = inpuDateString.substring(4, 6);
  const day = inpuDateString.substring(6, 8);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  //const token = localStorage.getItem("token");
  formData.append('file', file);
  const fileResponse = await axios.post(`${API_URL}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },);
  console.log("fileResponse", fileResponse);
  return fileResponse.data;
};

export const getPriorityList = () => {
  const array = [
    {
      id: 1,
      priority: 1,
      name: "Cao nhất"
    },
    {
      id: 2,
      priority: 2,
      name: "Trung bình"
    },
    {
      id: 3,
      priority: 3,
      name: "Thấp"
    }
  ];
  return array;
};

export const getNotificationType = () => {
  const array = [
    {
      id: 1,
      name: "Đến tất cả",
      code: "ALL"
    },
    {
      id: 2,
      name: "Đến nhóm cụ thể",
      code: "GROUP"
    },
    {
      id: 3,
      name: "Đến 1 người cụ thể",
      code: "PERSONAL"
    }
  ];
  return array;
};





// Add more API functions as needed