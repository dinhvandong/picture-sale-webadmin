import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createCategory, createTransaction, createUser, getCategory, getCategoryByGroupId, getGroups, uploadFile } from '../../services/api';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import noImage from '../../assets/avatar-default-icon.png'
import { getGroupById } from './../../services/api';

const TransactionCreate = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [file, setFile] = useState(noImage);
  const gotoTransactionList = () => {
    navigate('/admin/transaction');
  }
  const [options, setOptions] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [dataGroup, setDataGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    note: '',
    userID: 0,
    groupID:0,
    categoryID:0,
    money:0,
    listImages:[String]
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
    const userID = formData.userID;
    const money = formData.money
    const intValue = parseInt(userID, 10); // Converts the value to an integer

    const moneyValue = parseFloat(money);

    setFormData((prevData) => ({
      ...prevData,
      [userID]: intValue,
      [money]: moneyValue
    }));

    const result = await createTransaction(formData);
    if (result.success === 200) 
    {
      navigate('/admin/transaction');
    }

    setFormData({
      name: '',
      icon: '',
      note: '',
      userID: 0,
      groupID:0,
      categoryID:0,
      money:0,
      listImages:[String]
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroups();
      setDataGroup(data);      
    };
    fetchData();
  }, []);

  const fetchDataCategory = async (groupId) =>{
    const categoryList = await getCategoryByGroupId(groupId);
    setDataCategory(categoryList);
  }

  const handleChangeGroup = async (value) => {
    setSelectedGroup(value);
    await fetchDataCategory(value);
    setFormData(prevFormData => ({
      ...prevFormData,
      groupID: value
    }));
  };

  const handleChangeCategory = (value) => {
    // Handle the selected value here
    setSelectedCategory(value);
    setFormData(prevFormData => ({
      ...prevFormData,
      categoryID: value
    }));
  };

  return (
    <div className='w-full h-auto flex flex-col p-3'>
      {/* <p className='text-sm ml-10'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
      <div className='flex items-center gap-3 my-5'>
        <button onClick={gotoTransactionList} className='text-lg font-semibold'>Danh sách</button>
        <button className='w-24 h-9 p-4 bg-white text-gray-500 border-black rounded flex justify-center items-center hover:shadow-lg'>Tạo mới</button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">
            Tên danh mục: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="group" className="block mb-2 font-medium">
            Chọn nhóm danh mục: <span className="text-lg text-red-500">*</span>
          </label>
          <Select className="w-full  h-[40px]" value={selectedGroup} onChange={handleChangeGroup}>
            {dataGroup.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

        </div>
        <div className="mb-4">
          <label htmlFor="group" className="block mb-2 font-medium">
            Chọn danh mục: <span className="text-lg text-red-500">*</span>
          </label>
          <Select className="w-full  h-[40px]" value={selectedCategory} onChange={handleChangeCategory}>
            {dataCategory.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

        </div>
        <div className="mb-4">
          <label htmlFor="icon" className="block mb-2 font-medium">
            Chọn ảnh đại diện: <span className="text-lg text-red-500">*</span>
          </label>
          <Upload
            id='icon' name='icon'
            beforeUpload={() => false} // Prevent automatic file upload
            onChange={(info) => handleFileUpload(info.file)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </div>
        <div className="mb-4">
          <img src={file} className='w-[100px] h-[100px]' />

        </div>

        <div className="mb-4">
          <label htmlFor="note" className="block mb-2 font-medium">
            Mô tả: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userID" className="block mb-2 font-medium">
            ID của người dùng: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="userID"
            name="userID"
            value={parseInt(formData.userID, 10)}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="money" className="block mb-2 font-medium">
            Số tiền: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="money"
            name="money"
            value={parseFloat(formData.money)}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Tạo mới danh mục
        </button>
      </form>
    </div>

  );
}

export default TransactionCreate