import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createUser, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'

const UserCreate = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const gotoCreateNew = () => {
        navigate('/admin/users/create-new');

    }
    const gotoUserList = () => {
        navigate('/admin/users');

    }
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        avatar: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            avatar: response.data
        }));


    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setFormData({avatar: file})
        console.log("file", file);

        setFormData(prevFormData => ({
            ...prevFormData,
            avatar: file
        }));

        console.log("formData", formData);
        const result = await createUser(formData);
        if (result.success === 200) {
            navigate('/admin/users');
        }

        // Reset form data
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo tài khoản đăng ký</p>
            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className='flex items-center gap-3 my-5 ml-5'>
                <button onClick={gotoUserList} className='text-lg font-semibold'>Danh sách</button>
                <button className='flex items-center justify-center w-24 p-4 text-white border-black rounded bg-base_color h-9 hover:shadow-lg'>Tạo mới</button>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Họ tên: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                        Địa chỉ email: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium">
                        Mật khẩu <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 font-medium">
                        Số điện thoại: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                        Chọn ảnh đại diện: <span className="text-lg text-red-500">*</span>
                    </label>
                    <Upload
                        id='avatar' name='avatar'
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

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Tạo mới tài khoản
                </button>
            </form>
        </div>

    );
}

export default UserCreate