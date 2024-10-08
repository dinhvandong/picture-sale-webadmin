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
import { findJanCardById, updateJanCard } from '../../services/api_janCard';

const JanCardEdit = (props) => {
    const navigate = useNavigate();
    const { id } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const roomTypes = ['BASIC','Platinum',  'VIP', 'GOLD'];
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const [items, setItems] = useState([]);
    const handleInsert = () => {
        console.log("Item_SIZE:", items);

        const newItem = {
            id: (items.length + 1), // Generate a unique ID for the new item
            item: 'Dịch vụ ' + items.length,
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

        const fetchJanCardById = async () => {
            try {
                const response = await findJanCardById(id);
                setFormData(response);
                setFile(response.thumb);
                setItems(response.janItemBenefits)
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


        fetchJanCardById();
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
        cardType: '',
        price: '',
        description: '',
        thumb: '',
        janItemBenefits: []

    });

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        const updatedValue = name === 'price' ? parseFloat(value) : value;

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
        setFile(response.data);
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
        const convertedPriceBase = parseFloat(formData.price);
        console.log("items-xxx:", items);
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     thumb: file, priceBase: convertedPriceBase, roomItemList: items
        // }));


        // Update the formData state
        const updatedFormData = {
            ...formData,
            thumb: file,
            price: convertedPriceBase,
            janItemBenefits: items
        };
        setFormData(updatedFormData);
        const jsonData = JSON.stringify(updatedFormData);
        // const jsonData = JSON.stringify(formData);
        console.log("jsonData", jsonData);

        const result = await updateJanCard(jsonData);
        console.log("result_updateJanCard:", result);

        if (result.success === 200) {
            navigate('/admin/jan-card');
        }
        // Reset form data
        setFormData({ name: '', email: '', password: '' });
    };

    const handleRemoveByIndex = (index) => {
        const newArray = [...items]; // Create a new array to avoid mutating the state directly
        newArray.splice(index, 1); // Remove the element at the given index
        setItems(newArray); // Update the state with the new array
    }
    return (
        <div className='flex flex-col w-full h-auto'>
            <div className="w-full h-[50px] bg-base_color">
            </div>
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Cập nhật thông tin thẻ</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">
                <div className='flex flex-col w-1/2 h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
                                Loại thẻ: <span className="text-lg text-red-500">*</span>
                            </label>
                            <select
                                name="cardType"
                                id="cardType"
                                value={formData.cardType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Chọn loại thẻ</option>
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
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
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
                            <img src={(API_URL_IMAGE + file)} className='w-[200px] h-[200px]' />
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
                                {items.map((item, index) => (
                                    <li className='flex items-center px-5 mt-5' key={item.id}>
                                        <input className='w-full border-2 border-gray-500'
                                            type="text"
                                            value={item.item}
                                            onChange={(e) => handleInputChangeItem(e, item.id)}
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
                            Cập nhật thẻ
                        </button>
                    </form>
                </div>

            </div>


        </div>

    );
}


export default JanCardEdit