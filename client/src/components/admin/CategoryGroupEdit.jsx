import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, getGroupById, updateGroups, uploadFile } from '../../services/api';
import noImage from '../../assets/avatar-default-icon.png'
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const CategoryGroupEdit = (props) => {
    const navigate = useNavigate();
    const { id } = props;
   // const [group, setGroup] = useState(null);
   const [formData, setFormData] = useState({
    name: '',
    code: '',
    icon: '',
    desc: ''
});
    const gotoGroup = () => {
        navigate('/admin/categoryGroup');
    }
    const gotoCreate = () => {
        navigate('/admin/categoryGroup');
    }
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
    

    const [file, setFile] = useState(noImage);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({id:id});

        setFormData(prevFormData => ({
            ...prevFormData,
            icon: file
        }));

        const result = await updateGroups(formData);
        if (result.success === 200) {
            navigate('/admin/categoryGroup');
        }
        // Reset form data
        setFormData({ name: '', code: '', icon: '', desc: '' });
    };

    useEffect(() => {
        const fetchGroupById = async () => {
          try {
            const response = await getGroupById(id);
            console.log("fetchGroupById", response);
            setFormData(response);
            setFile(response.icon);
           // setGroup(response);
          } catch (error) {
          }
        };
        fetchGroupById();
      }, []);

    return (
        <div className='w-full h-auto flex flex-col p-3'>
            {/* <p className='text-sm ml-10'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className='flex items-center gap-3 my-5'>
                <button onClick={gotoGroup} className='text-lg font-semibold'>Danh sách</button>
                <button onClick={gotoCreate} className='w-24 h-9 p-4 bg-insert text-white rounded flex justify-center items-center hover:shadow-lg'>Tạo mới</button>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Group name: <span className="text-lg text-red-500">*</span>
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
                    <label htmlFor="code" className="block mb-2 font-medium">
                        Code: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="desc" className="block mb-2 font-medium">
                        Description: <span className="text-lg text-red-500">*</span>
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

                <div className="mb-4">
                    <label htmlFor="icon" className="block mb-2 font-medium">
                        Chọn ảnh đại diện: <span className="text-lg text-red-500">*</span>
                    </label>
                    <Upload
                        id='icon' name='icon'
                        maxCount={1}
                        beforeUpload={() => false} // Prevent automatic file upload
                        onChange={(info) => handleFileUpload(info.file)}
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
                    Tạo nhóm danh mục
                </button>
            </form>
        </div>

    );
}

export default CategoryGroupEdit