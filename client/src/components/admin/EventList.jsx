import React, { useState } from "react";
import tasks from "../../assets/tasks.png";
import tickets from "../../assets/tickets.png";
import comments from "../../assets/comments.png";
import visitors from "../../assets/visitors.png";
import bieudo from "../../assets/bieudo.png";
import bieudo2 from "../../assets/bieudo2.png";
import arrow3 from "../../assets/arrow3.png";
import UserTable from './../table/UserTable';
import { Button } from "antd";
import { GotoCreateNew } from "../../utils/navigationPage";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from 'react-icons/io';
import { MdAdd } from "react-icons/md";
import RoomTable from "../table/RoomTable";
import EventTable from "../table/EventTable";
import EventItemTable from "../table/EventItemTable";
import EventItemChildTable from "../table/EventItemChildTable";

const EventList = () => {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };
    const createNewRoom = () => {
        navigate("/admin/event/create-new");
    };
    const handleSearch = () => {

    }
    return (
        <div className='flex flex-col w-full h-auto '>
            <div className="w-full h-[50px] bg-base_color">

            </div>
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Danh sách events</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>

            {/* <Button className="w-[120px] text-center font-bold ml-5 mb-5 bg-blue-500" type="primary" onClick={handleInsert}>
      NEW USER
    </Button> */}
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
                <div onClick={createNewRoom}
                    className="flex items-center px-2 ml-5 font-bold text-gray-500 scale-105 bg-white border rounded-lg shadow-sm hover:cursor-pointer hover:bg-base_color hover:text-white"
                >
                    <MdAdd />
                    <p>
                        Thêm mới

                    </p>

                </div>

            </div>
            <div className="flex w-[100%] ml-5 flex-row justify-center">
                <EventTable />
            </div>
        
        </div>
    );
};

export default EventList;
