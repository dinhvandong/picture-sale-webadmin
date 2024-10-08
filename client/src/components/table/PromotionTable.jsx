import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { convertDateFormat, deleteUser, getAllNotification, getCategory, getUsers } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../../services/api_news';
import { getPromotion } from '../../services/api_promotion';
const PromotionTable = () => {
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate();
  
    const handleEdit = (id) => {
      console.log('Edit clicked for ID:', id);
      navigate(`/admin/promotion/update/${id}`)
    };
  
    const handleDelete = async (id) => {
      console.log('Delete clicked for ID:', id);
      const response = await deleteUser(id);
      refreshData();
      console.log("delete:", response);
    };
  
    const refreshData = async()=>{
      try {
        const newsList = await getPromotion();
        console.log("newsList", newsList);
        setNewsList(newsList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    }
  
    const getRowClassName = (record, index) => {
      return index % 2 === 0 ? 'row-even' : 'row-odd';
    };
  
    useEffect(() => {
      const fetNewsList = async () => {
        try {
          const newsList = await getPromotion();
          console.log("newsList", newsList);
          setNewsList(newsList);
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      };
      fetNewsList();
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
        title: 'Tiều đề phụ',
        dataIndex: 'subTitle',
        key: 'subTitle',
      },
      {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (text) => convertDateFormat(text),
      },
      {
        title: 'Hành động',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Cập nhật</Button>
            <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
            <Button className="mr-5 text-white bg-emerald-500" type="danger" onClick={() => handleDelete(record.id)}>Kích hoạt</Button>
          </Space>
        ),
      },
    ];
    return (
      <div className="w-[100%]  flex justify-center items-center">
        <Table  style={{width:'100%', fontFamily:'Courier New '}}  rowClassName={getRowClassName} dataSource={newsList} columns={columns}  />
      </div>
    );
}

export default PromotionTable