import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createCategory, createUser, getGroups, uploadFile } from '../../services/api';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import noImage from '../../assets/avatar-default-icon.png'

const { Option } = Select;
const CategoryCreate = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(noImage);
  const gotoCategoryList = () => {
    navigate('/admin/categories');

  }
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    language:''
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
      icon: fileResponse
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const result = await createCategory(formData);
    if (result.success === 200) {
      navigate('/admin/categories');
    }
    // Reset form data
    setFormData({
      name: '',
      desc: '',
      language:''
    });
  };
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);

    setFormData(prevFormData => ({
      ...prevFormData,
      language: e.target.value
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getGroups();
      setOptions(data);
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


  return (
    <div className='flex flex-col w-full h-auto bg-[#EEA048]'>
      {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
      <div className="w-full h-[50px] bg-base_color">

      </div>
      <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
        <p className="font-bold">Tạo danh mục</p>
      </div>
      <div className='h-[1px] bg-base_color w-full'></div>

      <div className='flex items-center gap-3 my-5'>
        <button onClick={gotoCategoryList} className='text-lg font-semibold'>Danh sách</button>
        <button className='flex items-center justify-center w-24 p-4 text-gray-500 bg-white border-black rounded h-9 hover:shadow-lg'>Tạo mới</button>
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
          <label htmlFor="desc" className="block mb-2 font-medium">
            Mô tả: <span className="text-lg text-red-500">*</span>
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="text-indigo-600 form-radio"
            value="english"
            checked={selectedLanguage === 'english'}
            onChange={handleLanguageChange}
          />
          <span className="ml-2">English</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="text-indigo-600 form-radio"
            value="vietnamese"
            checked={selectedLanguage === 'vietnamese'}
            onChange={handleLanguageChange}
          />
          <span className="ml-2">Vietnamese</span>
        </label>
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

export default CategoryCreate