import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, createGallery, deleteUser, getGalleries, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
import { deleteGallery } from '../../services/api_gallery';
import { getVideos } from '../../services/api_video';
//import './tableStyle.css';
const VideoTable = (props) => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const gotoGalleryItem =(id) =>{
    navigate("/admin/gallery_detail/"+ id);
  }

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    props.onChildCallback(id);
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteGallery(id);
    fetVideos();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const videoList = await getVideos();
      console.log("videoList", videoList);
      setVideos(videoList);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index % 2 === 1 ? 'row-even' : 'row-odd';
  };
  const fetVideos = async () => {
    try {
      const videoList = await getVideos();
      console.log("videoList", videoList);
      setVideos(videoList);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };
  useEffect(() => {
   
    fetVideos();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // width: '10%'
    },
    {
      title: 'Chủ đề',
      dataIndex: 'title',
      key: 'title',
      // width: '20%'

    },

    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      // width: '20%'

    },
    {
      link: 'Đường dẫn',
      dataIndex: 'link',
      key: 'link',
     
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
          <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
          {/* <Button className="mr-5 text-white bg-emerald-500" type="danger" onClick={() => handleDelete(record.id)}>Kích hoạt</Button> */}
          {/* <Button className="mr-5 text-white bg-history" type="danger" onClick={() => handleDelete(record.id)}>Xem lịch sử</Button> */}

        </Space>
      ),
    },
    // Add more columns as needed
  ];
  return (
    <div className="w-[100%]  flex justify-center items-center">
      <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={videos} columns={columns} />
    </div>
  );
};

export default VideoTable