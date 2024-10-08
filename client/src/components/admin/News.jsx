import { Button } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTable from '../table/UserTable';
import { IoMdSearch } from 'react-icons/io';
import CategoryTable from '../table/CategoryTable';
import NotificationTable from '../table/NotificationTable';
import NewsTable from '../table/NewsTable';

const News = () => {
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const handleInsert = () => {
    navigate("/admin/news/create-new");
  };
  const handleSearch = () => {

  }
  return (
    <div className='flex flex-col w-full h-auto'>
      <div className="w-full h-[50px] bg-base_color">

      </div>
      <div className="flex justify-start m-5 md:justify-center sm:justify-center lg:justify-start">
        <p className="font-bold">NEWS LIST</p>
      </div>
      <Button className="w-[160px] ml-5 font-bold text-center mb-5 bg-blue-500" type="primary" onClick={handleInsert}>
        Create News
      </Button>
      <div className='flex flex-row m-5'>
        <div className='flex items-center gap-3'>
          <input type="radio"
            className='w-4 h-4 p-3 text-green-500 focus:bg-green-500'
            checked />
          <label className='flex items-center'> Tất cả </label>
        </div>
        <div className='flex ml-5'>
          <form onSubmit={handleSearch}>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="text"
                className="w-full px-3 py-1 outline-none rounded-tl-md rounded-bl-md"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className="p-2 text-gray-500 scale-105 bg-white border shadow-sm hover:bg-gray-100 rounded-tr-md rounded-br-md"
              >
                <IoMdSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-[100%]   flex-row justify-center">
        <NewsTable />

      </div>

    </div>
  );
}

export default News