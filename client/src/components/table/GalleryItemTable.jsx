import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteUser, getGalleryById, getGalleryItemsById, getPricesByRoomID, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
import { deleteGalleryItem } from '../../services/api_gallery';
//import './tableStyle.css';
const GalleryItemTable = (props) => {
  const [galleryItemList, setGalleryItemList] = useState([]);
  const [updateValue, setUpdateValue] = useState();
  const [index, setIndex]= useState(-1);
  const navigate = useNavigate();

  const galleryID = props.galleryID;
  console.log("galleryID:", galleryID);

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/admin/price/update/${galleryID}`)
  };

  const handleDelete = async (id, idItem) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteGalleryItem(id, idItem);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const response = await getGalleryItemsById(galleryID);
      console.log("response", response);
      setGalleryItemList(response.data);
      //setUpdateValue(priceList)
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index % 2 === 1 ? 'row-even' : 'row-odd';
  };

  useEffect(() => {
    // Perform data reloading or any other necessary actions
    console.log('Reloading data...');
    refreshData();
  }, [props.galleryID]);
  useEffect(() => {
    
    refreshData();

  }, []);

  const  handlePriceChange = (value, id, index)=> {
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // width: '10%'
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'topic',
      key: 'topic',
      // width: '20%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'shortDesc',
      key: 'shortDesc',
      // width: '20%'
    },
    {
      title: 'Ảnh Thumb',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (thumb) => <img
        src={API_URL_IMAGE + thumb}
        alt="thumb"
        className="w-10 h-10 rounded"
      />,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
          <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(galleryID,record.id)}>Xóa</Button>
        </Space>
      ),
    },
    // Add more columns as needed
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <Table style={{ width: '90%', fontFamily: 'Courier New ', marginRight:'20px' }} rowClassName={getRowClassName} dataSource={galleryItemList} columns={columns} />
    </div>
  );
};

export default GalleryItemTable;