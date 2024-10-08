import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { convertDateFormat, deleteUser, getGroups, getUsers } from '../../services/api';
import defaultImage from '../../assets/avata.png'

const CategoryGroupTable = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
  
    const handleEdit = (id) => {
      console.log('Edit clicked for ID:', id);
      navigate(`/admin/categoryGroup/update/${id}`)
    };
  
    const handleDelete = async (id) => {
      console.log('Delete clicked for ID:', id);
      const response = await deleteUser(id);
      refreshData();
      console.log("delete:", response);
    };
  
    const refreshData = async()=>{
      try {
        const groups = await getGroups();
        console.log("groups", groups);
        setGroups(groups);
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
          const groups = await getGroups();
          setGroups(groups);
        } catch (error) {
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
        title: 'Tên nhóm',
        dataIndex: 'name',
        key: 'name',
       // width: '20%'
  
      },
      {
        title: 'Mã nhóm',
        dataIndex: 'code',
        key: 'code',
       // width: '20%'
  
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'icon',
        key: 'icon',
        render: (icon) => <img
          src={icon || defaultImage}
          alt="Icon"
          className="h-10 w-10 rounded-full"
        />,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (text) => convertDateFormat(text),
       // width: '20%'
  
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   key: 'status',
      //   //width: '20%',
      //   render: (status) => (status === 1 ? 'Active' : 'Inactive'),
  
  
      // },
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
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Button className="bg-edit text-white" type="primary" onClick={() => handleEdit(record.id)}>Cập nhật</Button>
            <Button className="bg-delete mr-5 text-white" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
            <Button className="bg-emerald-500 mr-5 text-white" type="danger" onClick={() => handleDelete(record.id)}>Kích hoạt</Button>

          </Space>
        ),
      },
      // Add more columns as needed
    ];
    return (
      <div className="w-[100%]  flex justify-center items-center">
        <Table  style={{width:'100%', fontFamily:'Courier New '}}  rowClassName={getRowClassName} dataSource={groups} columns={columns}  />
      </div>
    );
}

export default CategoryGroupTable