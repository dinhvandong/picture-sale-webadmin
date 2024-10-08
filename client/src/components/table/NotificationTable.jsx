import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { convertDateFormat, deleteUser, getAllNotification, getCategory, getUsers } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import CategoriesList from './../admin/CategoriesList';
const NotificationTable = () => {
    const [notificationList, setNotificationList] = useState([]);
    const navigate = useNavigate();
  
    const handleEdit = (id) => {
      console.log('Edit clicked for ID:', id);
      navigate(`/admin/notifications/update/${id}`)
    };
  
    const handleDelete = async (id) => {
      console.log('Delete clicked for ID:', id);
      const response = await deleteUser(id);
      refreshData();
      console.log("delete:", response);
    };
  
    const refreshData = async()=>{
      try {
        const notificationList = await getAllNotification();
        console.log("notificationList", notificationList);
        setNotificationList(notificationList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    }
  
    const getRowClassName = (record, index) => {
      return index % 2 === 0 ? 'row-even' : 'row-odd';
    };
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const notificationList = await getAllNotification();
          console.log("notificationList", notificationList);
          setNotificationList(notificationList);
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      };
      fetchNotifications();
    }, []);
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Người gửi',
        dataIndex: 'senderAccount',
        key: 'senderAccount',
      },
      {
        title: 'Người nhận thông báo',
        dataIndex: 'receivedAccount',
        key: 'receivedAccount',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (text) => convertDateFormat(text),
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          const statusStyle = {
            color: status === 0 ? 'red' : 'inherit',
          };
          return <span style={statusStyle}>{(status === 1 ? 'Active' : 'Inactive')}</span>;
        },
      },
      {
        title: 'Hành động',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Button className="bg-edit text-white" type="primary" onClick={() => handleEdit(record.id)}>Cập nhật</Button>
            <Button className="bg-delete mr-5 text-white" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
            <Button className="bg-emerald-500 mr-5 text-white" type="danger" onClick={() => handleDelete(record.id)}>Kích hoạt</Button>
          </Space>
        ),
      },
    ];
    return (
      <div className="w-[100%]  flex justify-center items-center">
        <Table  style={{width:'100%', fontFamily:'Courier New '}}  rowClassName={getRowClassName} dataSource={notificationList} columns={columns}  />
      </div>
    );
}

export default NotificationTable