import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createCategory, createNotification, createUser, getGroups, getNotificationType, getPriorityList, getUsers, uploadFile } from '../../services/api';
import { Upload, Button, AutoComplete, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import noImage from '../../assets/avatar-default-icon.png'

const { Option } = Select;
const NotificationCreate = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(noImage);
  const gotoCategoryList = () => {
    navigate('/admin/notifications');
  }
  const [userList, setUserList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState();
  const [notificationTypeList, setNotificationTypeList] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 0,
    type: 0,
    receivedAccount: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileUpload = async (file) => {
    // Handle the file upload logic here
    const response = await uploadFile(file);
    const fileResponse = API_URL_IMAGE + response.data;
    setFile(fileResponse);
    console.log("upload-file", response);
    setFormData(prevFormData => ({
      ...prevFormData,
      icon: response.data
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const result = await createNotification(formData);
    if (result.success === 200) {
      navigate('/admin/notification');
    }
    // Reset form data
    setFormData({
      title: '',
      content: '',
      priority: 0,
      type: 0,
      receivedAccount: []
    });
  };

  useEffect(() => {
    setPriorityList(getPriorityList());
    setNotificationTypeList(getNotificationType());
    const fetchData = async () => {
      const array = await getUsers();
      console.log("listuser:", array);
      var userArray = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index].username;
        //setUserList([...userList, element]);
        userArray.push(element);
      }
      setUserList(userArray);
    };
    fetchData();
  }, []);

  const handleChangeOption = (value) => {
    // Handle the selected value here
    console.log("valueOption", value);
    setSelectedOption(value);
    setFormData(prevFormData => ({
      ...prevFormData,
      groupID: value
    }));
  };

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // const [userData, setUserData] = useState([
  //   'John Doe',
  //   'Jane Smith',
  //   'David Johnson',
  //   'Sarah Davis',
  // ]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSelectUser = (value) => {
    if (value && !selectedUsers.includes(value)) {
      const usersData = [...selectedUsers, value];
      setSelectedUsers(usersData);
      setFormData(prevFormData => ({
        ...prevFormData,
        receivedAccount: usersData
      }));
      setInputValue('');
    }
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter((u) => u !== user);
    setSelectedUsers(updatedUsers);
    setFormData(prevFormData => ({
      ...prevFormData,
      receivedAccount: updatedUsers
    }));
  };


  return (
    <div className='w-full h-auto flex flex-col p-3'>
      {/* <p className='text-sm ml-10'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
      <div className='flex items-center gap-3 my-5'>
        <button onClick={gotoCategoryList} className='text-lg font-semibold'>Danh sách</button>
        <button className='w-24 h-9 p-4 bg-white text-gray-500 border-black rounded flex justify-center items-center hover:shadow-lg'>Tạo mới</button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Tiêu đề: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium">
            Nội dung: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block mb-2 font-medium">
            Chọn độ ưu tiên: <span className="text-lg text-red-500">*</span>
          </label>
          <Select className="w-full  h-[40px]" value={selectedPriority} onChange={handleChangeOption}>
            {priorityList.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

        </div>

        <div className="mb-4">
          <label htmlFor="group" className="block mb-2 font-medium">
            Chọn loại thông báo: <span className="text-lg text-red-500">*</span>
          </label>
          <Select className="w-full  h-[40px]" value={selectedNotification} onChange={handleChangeOption}>
            {notificationTypeList.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

        </div>

        <div className="mb-4">
          <label htmlFor="userID" className="block mb-2 font-medium">
            ID của người nhận: <span className="text-lg text-red-500">*</span>
          </label>
          <AutoComplete
            value={inputValue}
            onChange={handleInputChange}
            onSelect={handleSelectUser}
            style={{ width: '100%' }}
            placeholder="Enter user name"
            dataSource={userList}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </div>

        <div className="mb-4">

          <div style={{ marginTop: '10px' }}>
            {selectedUsers.map((user) => (
              <Tag
                key={user}
                closable
                onClose={() => handleRemoveUser(user)}
              >
                {user}
              </Tag>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Tạo mới thông báo
        </button>
      </form>
    </div>

  );
}

export default NotificationCreate