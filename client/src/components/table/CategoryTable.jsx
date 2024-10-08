import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { convertDateFormat, deleteUser, getCategory, getUsers } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import CategoriesList from './../admin/CategoriesList';

const CategoryTable = () => {
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();
  
    const handleEdit = (id) => {
      console.log('Edit clicked for ID:', id);
      navigate(`/admin/categories/update/${id}`)
    };
  
    const handleDelete = async (id) => {
      console.log('Delete clicked for ID:', id);
      const response = await deleteUser(id);
      refreshData();
      console.log("delete:", response);
    };
  
    const refreshData = async()=>{
      try {
        const categoryList = await getCategory();
        console.log("categoryList", categoryList);
        setCategoryList(categoryList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    }
  
    const getRowClassName = (record, index) => {
      return index % 2 === 0 ? 'row-even' : 'row-odd';
    };
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const categoryList = await getCategory();
          console.log("categoryList", categoryList);
          setCategoryList(categoryList);
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      };
      fetchUsers();
    }, []);
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
       // width: '10%'
      },
      {
        title: 'Tên hạng mục',
        dataIndex: 'name',
        key: 'name',
  
      },
      {
        title: 'Mô tả',
        dataIndex: 'desc',
        key: 'desc',
  
      },
      {
        title: 'Ngôn ngữ',
        dataIndex: 'language',
        key: 'language',
  
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (text) => convertDateFormat(text),
       // width: '20%'
  
      },
      {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
        render: (status) => {
          const statusStyle = {
            color: status === false ? 'red' : 'inherit',
          };
    
          return <span style={statusStyle}>{(status === true ? 'Active' : 'Inactive')}</span>;
        },
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
      // Add more columns as needed
    ];
    return (
      <div className="w-[100%]  flex justify-center items-center">
        <Table  style={{width:'100%', fontFamily:'Courier New '}}  rowClassName={getRowClassName} dataSource={categoryList} columns={columns}  />
      </div>
    );
}

export default CategoryTable