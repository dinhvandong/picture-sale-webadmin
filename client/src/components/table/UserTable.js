import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteUser, getUsers } from '../../services/api'
import { Button, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/admin/users/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteUser(id);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const userList = await getUsers();
      console.log("userList", userList);
      setUsers(userList);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index %2===1 ? 'row-even' : 'row-odd';
  };
  const handleSelectChange = (key, value) => {
    // Perform the action based on the selected value
    console.log(`Row with key ${key} selected action: ${value}`);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        console.log("userList", userList);
        setUsers(userList);
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
    // {
    //   title: 'Tài khoản',
    //   dataIndex: 'username',
    //   key: 'username',
    //   // width: '20%'

    // },
    {
      title: 'Địa chỉ email',
      dataIndex: 'email',
      key: 'email',
      // width: '20%'

    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      // width: '20%'

    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusStyle = {
          color: status === 0 ? 'red' : 'inherit',
        };

        return <span style={statusStyle}>{(status === 2 ? 'Hoạt động' : 'Chưa kích hoạt')}</span>;
      },
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <img
        src={(avatar!= null)?(API_URL_IMAGE + avatar): defaultImage}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => convertDateFormat(text),
     // width: '20%'

    },
   
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className="text-white bg-base_color" type="primary" onClick={() => handleEdit(record.id)}>Kích hoạt</Button>
          <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
          <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
       
        </Space>
      ),
    },
    // Add more columns as needed
  ];
  return (
    <div className="w-[100%]  flex justify-center items-center">
      <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={users} columns={columns} />
    </div>
  );
};

export default UserTable;