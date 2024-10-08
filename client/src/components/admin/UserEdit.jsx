import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';

const UserEdit = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { id } = props;
    const [searchTerm, setSearchTerm] = useState('');

    const gotoCreateNew = () => {
        navigate('/admin/users/create-new');

    }
    const gotoUserList = () => {
        navigate('/admin/users');

    }


    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ id: id });
        const result = await updateUser(formData);
        console.log("formData", result);

        if (result.success === 200) {
            navigate('/admin/users');
        }

        // Reset form data
        setFormData({ name: '', email: '', password: '' });
    };


    useEffect(() => {
        const fetchUserById = async () => {
            try {
                console.log("userInfoID", id);

                const user = await getUserById(id);
                console.log("userInfo", user);
                setFormData(user);
                setUser(user);
            } catch (error) {
                // Handle error
                console.error('Error:', error);
            }
        };
        fetchUserById();
    }, []);
    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Cập nhật tài khoản</p>
            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className='flex items-center gap-3 my-5 ml-5'>
                <button onClick={gotoUserList} className='text-lg font-semibold'>Danh sách</button>
                <button onClick={gotoCreateNew} className='flex items-center justify-center w-24 p-4 text-white rounded h-9 bg-base_color hover:shadow-lg'>Cập nhật</button>
            </div>
            {/* <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <input type="radio"
                        className='w-4 h-4 p-3 text-green-500 focus:bg-green-500'
                        checked />
                    <label className='flex items-center'> Tất cả </label>
                </div>
                <div className='flex'>
                    <form onSubmit={handleSubmit}>
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
            </div> */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Username: <span className="text-lg text-red-500">*</span>
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
                        Email: <span className="text-lg text-red-500">*</span>
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
                        Password <span className="text-lg text-red-500">*</span>
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
                        Phone Number: <span className="text-lg text-red-500">*</span>
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

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white rounded bg-base_color hover:bg-base_color"
                >
                   Cập nhật
                </button>
            </form>
        </div>

    );
}

export default UserEdit