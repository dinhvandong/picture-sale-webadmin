import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createRoom, createUser, getRoomById, updateRoom, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import UserTable from '../table/UserTable';
import { MdAdd } from 'react-icons/md';
import RoomTable from '../table/RoomTable';

const PriceEdit = (props) => {
    const navigate = useNavigate();
    const { id } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const roomTypes = ['Deluxe', 'Superior', 'Standard', 'Suite'];
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const [items, setItems] = useState([]);
    const handleInsert = () => {
        console.log("Item_SIZE:", items);

        const newItem = {
            id: (items.length +1), // Generate a unique ID for the new item
            item: 'Dịch vụ ' + items.length ,
            active: true // Initialize the value as an empty string
        };
        setFormData((prevData) => ({
            ...prevData,
            roomItemList: [...prevData.roomItemList, newItem]
          }));

       setItems((prevItems) => [...prevItems, newItem]);
    }

    useEffect(() => {

        //        fetchCategoryById();

        const fetchRoomById = async () => {
            try {
                const response = await getRoomById(id);
                setFormData(response);
                setFile(response.thumb);
                setItems(response.roomItemList)
                //const groupID = response.groupID;
                // Find the index of the selected option
                //const selectedOptionIndex = options.findIndex((option) => option.id === groupID);
                //console.log("selectedOptionIndex", selectedOptionIndex)
                //console.log("option value", options[selectedOptionIndex]);
                //setSelectedOptionIndex(selectedOptionIndex);
                //setSelectedOption(options[selectedOptionIndex]);
                //   setOptions(response.gr)
                // setGroup(response);
            } catch (error) {
            }
        };

        //const fetchData = async () => {
        //const data = await getGroups();
        //setOptions(data);
        //   fetchCategoryById();
        // };
        // fetchData();

        fetchRoomById();
    }, []);
    const handleTypeSelection = (type) => {
        setSelectedType(type);
    };
    const gotoCreateNew = () => {
        navigate('/admin/users/room-new');

    }
    const gotoUserList = () => {
        navigate('/admin/room');

    }
    const [formData, setFormData] = useState({
        id: id,
        roomType: '',
        priceBase: 0,
        description: '',
        thumb: '',
        roomItemList: []

    });

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });


        const { name, value } = e.target;
        const updatedValue = name === 'priceBase' ? parseFloat(value) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue
        }));
        // const [priceBase, value]= e.target;
        // setFormData((prevData)=>({
        //     ...prevData, [priceBase]:value
        // }));
    };

    const [file, setFile] = useState(noImage);

    const handleFileUpload = async (file) => {
        // Handle the file upload logic here
        console.log(file);

        const response = await uploadFile(file);
        const fileResponse = API_URL_IMAGE + response.data;
        setFile(fileResponse);
        console.log("upload-file", response);

        setFormData(prevFormData => ({
            ...prevFormData,
            thumb: response.data
        }));


    };

    function handleInputChangeItem(e, itemId) {
        const updatedItems = items.map((item) => {
          if (item.id === itemId) {
            return { ...item, item: e.target.value };
          }
          return item;
        });
      
        setItems(updatedItems);
        console.log("Items-List:", items);
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setFormData({avatar: file})
        console.log("file", file);
        const convertedPriceBase = parseFloat(formData.priceBase);
        setFormData(prevFormData => ({
            ...prevFormData,
            thumb: file, priceBase:convertedPriceBase
        }));

        console.log("updateRoom", formData);
        const result = await updateRoom(formData);
        console.log("result_updateRoom:", result);

        if (result.success === 200) {
            navigate('/admin/room');
        }

        // Reset form data
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Cập nhật thông tin phòng</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-1/3 h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
                                Loại phòng: <span className="text-lg text-red-500">*</span>
                            </label>
                            {/* <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            /> */}

                            <select
                                name="roomType"
                                id="roomType"
                                value={formData.roomType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"

                            //className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                                <option value="">Chọn loại phòng</option>
                                {roomTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Giá cơ bản: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceBase"
                                name="priceBase"
                                value={formData.priceBase}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Mô tả: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
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
                            <img src={file} className='w-[100px] h-[100px]' />

                        </div>

                        <div onClick={handleInsert}
                            className="flex items-center px-2 mt-5 font-bold text-gray-500 scale-105 bg-white border rounded-lg shadow-sm hover:cursor-pointer"
                        >
                            <MdAdd />
                            <p>
                                Thêm options

                            </p>

                        </div>

                        <div className='h-auto '>
                        <ul>
                            {items.map((item) => (
                                <li key={item.id}>
                                    <input className='w-full mt-5 border-2 border-gray-500'
                                        type="text"
                                        value={item.item}
                                        onChange={(e) => handleInputChangeItem(e, item.id)}
                                    />
                                </li>
                            ))}
                        </ul>

                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Cập nhật phòng
                        </button>
                    </form>
                </div>
                <div className='flex flex-col w-2/3 h-auto'>

                    <div className="flex w-[100%] ml-5 mr-2 flex-row justify-center">
                        <RoomTable />
                    </div>

                </div>

            </div>


        </div>

    );
}

export default PriceEdit