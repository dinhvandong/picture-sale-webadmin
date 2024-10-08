import { Button } from 'antd';
import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import UserTable from '../table/UserTable';
import { useNavigate } from 'react-router-dom';
import CategoryGroupTable from '../table/CategoryGroupTable';

const CategoryGroup = () => {
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
   navigate("/admin/categoryGroup/create-new");
  };
  const handleSearch = ()=>{

  }
  return (
    <div className='w-full h-auto flex flex-col p-3'>
      <div className="m-5 flex justify-start md:justify-center sm:justify-center lg:justify-start">
        <p className="font-bold">GROUP</p>
      </div>
      <Button className="w-[120px] font-bold text-center ml-5 mb-5 bg-blue-500" type="primary" onClick={handleInsert}>
      NEW GROUP
    </Button>
    <div className='flex m-5 flex-row'>
                <div className='flex gap-3 items-center'>
                    <input type="radio"
                        className='h-4 w-4 text-green-500 focus:bg-green-500 p-3'
                        checked />
                    <label className='flex items-center'> Tất cả </label>
                </div>
                <div className='flex ml-5'>
                    <form onSubmit={handleSearch}>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full py-1 px-3 outline-none rounded-tl-md rounded-bl-md"
                                placeholder="Tìm kiếm"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            <button
                                className="p-2 border scale-105 shadow-sm text-gray-500 bg-white hover:bg-gray-100 rounded-tr-md rounded-br-md"
                            >
                                <IoMdSearch />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
      <div className="flex w-[100%]   flex-row justify-center">
        <CategoryGroupTable />

      </div>
      
    </div>);
}

export default CategoryGroup