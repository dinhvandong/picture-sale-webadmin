import React, { useState } from 'react';
//import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { createNews } from '../../services/api_news';
import CategoryNewsList from './CategoryNewsList';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { API_URL_IMAGE, createGallery, uploadFile } from '../../services/api';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createVideo } from './../../services/api_video';

const VideoCreate = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate();


    const gotoVideoList = () => {
        navigate("/admin/video");
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescChange = (e) => {
        setDesc(e.target.value);

    }

    const handleLinkChange = (e) => {
        setLink(e.target.value);

    }
    const saveContent = async () => {
        try {
            const video = {
                title: title,
                desc: desc,
                link: link
            }
            console.log("video:", video);
            const response = await createVideo(video);
            console.log('Content saved:', response.data);
        } catch (error) {
            console.error('Error saving content:', error);
        }

        gotoVideoList();
    };



    return (
        <div className='flex flex-col w-full h-auto'>
            <div className="w-full h-[50px] bg-base_color">

            </div>
            <div className='flex flex-col px-5 py-5 w-[50%] h-auto'>

                <div className='mt-5'>

                    <label>Title</label>
                    <input onChange={handleTitleChange} className='w-full p-2 py-3 border border-gray-600 ' />
                </div>

                <div className='mt-5'>

                    <label>Description</label>
                    <input onChange={handleDescChange} className='w-full p-2 py-3 border border-gray-600 ' />
                </div>


                <div className='mt-5'>

                    <label>URL</label>
                    <input onChange={handleLinkChange} className='w-full p-2 py-3 border border-gray-600 ' />
                </div>

                <button
                    className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={saveContent}>
                    Save Content
                </button>

            </div>
        </div>
    )
}
export default VideoCreate