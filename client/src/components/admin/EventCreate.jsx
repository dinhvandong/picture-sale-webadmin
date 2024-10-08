import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createEvent, createRoom, createUser, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import UserTable from '../table/UserTable';
import { MdAdd } from 'react-icons/md';
import RoomTable from '../table/RoomTable';
import EventTable from '../table/EventTable';
import EventItemList from './EventItemList';

const EventCreate = () => {
    const navigate = useNavigate();
    //const [items, setItems] = useState([]);
    const eventTypes = ['Flexible Rate', 'Non-Refundable Rate', 'Flexible Rate Dinner', 'Non-Refundable Rate Dinner'];

    //     id": 1,
    //   "name": "My Event Plan",
    //   "subName": "Sub Plan",
    //   "active": true,
    //   "icon": "plan-icon",
    //   "type": "type",
    //   "createdDate": 1620569200000,
    const [formData, setFormData] = useState({
        name: '',
        subName: '',
        type: 'root',
        width:50,
        height:50,
        icon: '',
        eventPlanItemList: []
    });

    const [updatedEventPlanItemList, setUpdateEventPlanItemList] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState(noImage);


    const [types, setTypes] = useState([]);

    const [items, setItems] = useState([]);
    const [images, setImages] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventItemList = types.map((item, index) => ({
            type: item,
            title: items[index],
            icon: images[index],
        }));


        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     eventPlanItemList: eventItemList
        //   }), ()=>{
        //     console.log("formDataEvent00::", formData);

        //   });

        setFormData(async prevFormData => {
            const updatedFormData = {
                ...prevFormData,
                eventPlanItemList: eventItemList
            };

            console.log("formDataEvent00::", updatedFormData);
            const result = await createEvent(updatedFormData);
            if (result.success === 200) {
                navigate('/admin/event');
            }

            return updatedFormData;
        });

        // console.log("eventItemList", eventItemList);
        // console.log("formDataEvent::", formData);

       
        // Reset form data
    };
    //==================EVENT PLAN ITEM =====================================

    // Cau hinh lien quan den event plan o duoi day


    const addItem = () => {
        setItems(prevItems => [...prevItems, '']);
        setTypes(prevTypes => [...prevTypes, 1]);
        setImages(prevImages => [...prevImages, null]);
    };

    const handleInputChange = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index] = value;
        setItems(updatedItems);
    };

    const handleInputEventTypeChange = (index, value) => {
        const updatedTypes = [...types];
        updatedTypes[index] = value;
        setTypes(updatedTypes);
    };


    const handleFileUpload = async (file) => {
        // Handle the file upload logic here
        //console.log(file);
        const response = await uploadFile(file);
        //const fileResponse = API_URL_IMAGE + response.data;
        // Khi hien thi image thi su dung API_URL_IMAGE + ten file luu trong database
        setFile(API_URL_IMAGE+response.data);
        //console.log("upload-file", fileResponse);
        setFormData(prevFormData => ({
            ...prevFormData,
            icon: response.data
        }));
    };

    const handleImageUpload = async (index, file) => {

        const response = await uploadFile(file);
        console.log("response:", response);
        const updatedImages = [...images];
        updatedImages[index] = response.data;
        setImages(updatedImages);
    };

    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo mới sự kiện</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-1/3 h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
                                Event type: <span className="text-lg text-red-500">*</span>
                            </label>
                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Type of Event</option>
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
                                Event Name: <span className="text-lg text-red-500">*</span>
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
                        <div className="mb-2">
                            <label htmlFor="subName" className="block mb-2 font-medium">
                                Event Desc: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subName"
                                name="subName"
                                value={formData.subName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="subName" className="block mb-2 font-medium">
                                Width: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="width"
                                name="width"
                                value={formData.width}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="subName" className="block mb-2 font-medium">
                                Height: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Icon: <span className="text-lg text-red-500">*</span>
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
                        <div className="mb-2">
                            <img src={file} className={` "w-[" + ${formData.width} + "px]" + "h-["+ ${formData.height} + "px]" `} />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Tạo mới sự kiện
                        </button>
                    </form>
                </div>
                <div className='flex flex-col w-2/3 h-auto'>
                    <div className="flex w-[100%] ml-5 mr-2 flex-col justify-center">
                        {/* <EventItemList/> */}

                        <button className='className="w-[200px] px-4 py-1 mt-2 mb-5 text-white rounded bg-base_color hover:bg-orange-600"' onClick={addItem}>Thêm danh mục con</button>
                        {items.map((item, index) => (
                            <div key={index}>
                                <input className='text-black border border-black'
                                    type="number"
                                    placeholder='Loại danh mục'
                                    value={types.at(index)}
                                    onChange={e => handleInputEventTypeChange(index, e.target.value)}
                                />
                                <input className='text-black border border-black'
                                    type="text"
                                    placeholder='Tên danh mục'
                                    value={item}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                />
                                <input
                                    className='text-black border border-black'
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageUpload(index, e.target.files[0])}
                                />
                                <button className="w-[200px] px-4 py-1 mt-2 mb-5 text-white rounded bg-red-500 hover:bg-orange-600" onClick={() => handleInputChange(index, '')}>Remove</button>
                            </div>
                        ))}
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCreate