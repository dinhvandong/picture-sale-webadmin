import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createRoom, createUser, uploadFile } from '../../services/api';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import { MdAdd } from 'react-icons/md';
import { createItinerary } from '../../services/api_itinerary';

const ItineraryCreate = () => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        thumb: '',
        importanceNotes: '',
        benefits: '',
        inclusions: '',
        exclusions: '',
        itemList: []
    });

    const handleInsert = () => {
        console.log("Item_SIZE:", itemList);
        const newItem = {
            id: (itemList.length + 1), // Generate a unique ID for the new item
            timer: 'Thời gian',
            desc: 'Mô tả' // Initialize the value as an empty string
        };
        setItemList((prevItems) => [...prevItems, newItem]);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState(null);

    const handleFileUpload = async (file) => {
        const response = await uploadFile(file);
        setFile(String(response.data));
        console.log("upload-file", response);
        setFormData(prevFormData => ({
            ...prevFormData,
            thumb: String(response.data)
        }));


    };

    const handleRemoveByIndex = (index) => {
        const newArray = [...itemList]; // Create a new array to avoid mutating the state directly
        newArray.splice(index, 1); // Remove the element at the given index
        setItemList(newArray); // Update the state with the new array
    }

    function handleInputChangeItemTimer(e, itemId) {
        const updatedItems = itemList.map((item) => {
            if (item.id === itemId) {
                return { ...item, timer: e.target.value };
            }
            return item;
        });

        setItemList(updatedItems);
    }

    function handleInputChangeItemDesc(e, itemId) {
        const updatedItems = itemList.map((item) => {
            if (item.id === itemId) {
                return { ...item, desc: e.target.value };
            }
            return item;
        });

        setItemList(updatedItems);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        insertData();

    };

    const insertData = async () => {
        const updatedFormData = {
            ...formData,
            itemList: itemList, // Update the specific field
        };
        setFormData(updatedFormData);
        const jsonData = JSON.stringify(updatedFormData);
        console.log("itineraryList::", jsonData);
        const result = await createItinerary(jsonData);
        if (result.success === 200) {
            navigate('/admin/itinerary');
        }
    }

    return (
        <div className='flex flex-col w-full h-auto'>
            <div className="w-full h-[50px] bg-base_color">
            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo mới Lịch trình</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-[60%] h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
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
                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Mô tả: <span className="text-lg text-red-500">*</span>
                            </label>

                            <textarea
                                type="text"
                                id="desc"
                                name="desc"
                                value={formData.desc}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            ></textarea>
                           
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                ImportanceNotes: <span className="text-lg text-red-500">*</span>
                            </label>
                            <textarea
                                type="text"
                                id="importanceNotes"
                                name="importanceNotes"
                                value={formData.importanceNotes}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Benefits: <span className="text-lg text-red-500">*</span>
                            </label>
                            <textarea
                                type="text"
                                id="benefits"
                                name="benefits"
                                value={formData.benefits}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inclusions" className="block mb-2 font-medium">
                                Inclusions: <span className="text-lg text-red-500">*</span>
                            </label>
                            <textarea
                                type="text"
                                id="inclusions"
                                name="inclusions"
                                value={formData.inclusions}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="exclusions" className="block mb-2 font-medium">
                                Exclusions: <span className="text-lg text-red-500">*</span>
                            </label>
                            <textarea
                                type="text"
                                id="exclusions"
                                name="exclusions"
                                value={formData.exclusions}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="thumb" className="block mb-2 font-medium">
                                Ảnh đại diện: <span className="text-lg text-red-500">*</span>
                            </label>
                            <Upload
                                id='thumb' name='thumb'
                                beforeUpload={() => false} // Prevent automatic file upload
                                onChange={(info) => handleFileUpload(info.file)}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        </div>
                        <div className="mb-2">
                            <img src={API_URL_IMAGE + file} className='w-[200px] h-[200px]' />
                        </div>
                        <div onClick={handleInsert}
                            className="flex items-center px-2 mt-5 font-bold text-gray-500 scale-105 bg-white border rounded-lg shadow-sm hover:cursor-pointer"
                        >
                            <MdAdd />
                            <p>
                                Thêm mốc thời gian
                            </p>
                        </div>
                        <div className='h-auto '>
                            <ul>
                                {itemList.map((item, index) => (
                                    <li className='flex items-center w-full px-5 mt-5' key={item.id}>
                                        <input className='border-2 w-[20%] border-gray-500'
                                            type="text"
                                            value={item.timer}
                                            onChange={(e) => handleInputChangeItemTimer(e, item.id)}
                                        />
                                        <textarea className='w-[60%] ml-5 border-2 border-gray-500'
                                            type="text"
                                            value={item.desc}
                                            onChange={(e) => handleInputChangeItemDesc(e, item.id)}
                                        />
                                        <button onClick={() => handleRemoveByIndex(index)} className='ml-5 w-[100px] h-[30px] text-white bg-red-700'>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Tạo mới lộ trình
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default ItineraryCreate