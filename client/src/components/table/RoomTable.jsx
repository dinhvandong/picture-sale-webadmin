import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteRoom, deleteUser, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/admin/room/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteRoom(id);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const roomList = await getRooms();
      console.log("roomList", roomList);
      setRooms(roomList);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index %2===1 ? 'row-even' : 'row-odd';
  };
  //const fileResponse = API_URL_IMAGE + response.data;

  useEffect(() => {
    const fetRooms = async () => {
      try {
        const roomList = await getRooms();
        console.log("roomList", roomList);
        setRooms(roomList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };
    fetRooms();
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
      title: 'Loại phòng',
      dataIndex: 'roomType',
      key: 'roomType',
      // width: '20%'

    },
    {
      title: 'Giá cơ bản',
      dataIndex: 'priceBase',
      key: 'priceBase',
      // width: '20%'

    },

    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      // width: '20%'

    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   //width: '20%',
    //   render: (status) => (status === 1 ? 'Active' : 'Inactive'),


    // },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'active',
    //   key: 'status',
    //   render: (status) => {
    //     const statusStyle = {
    //       color: status === 0 ? 'red' : 'inherit',
    //     };

    //     return <span style={statusStyle}>{(status === 1 ? 'Hoạt động' : 'Dừng hoạt động')}</span>;
    //   },
    // },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (thumb) => <img
        src={(API_URL_IMAGE + thumb)}
        alt="thumb"
        className="w-10 h-10 rounded-full"
      />,
    },
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'createdDate',
    //   key: 'createdDate',
    //   render: (text) => convertDateFormat(text),
    //  // width: '20%'

    // },
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
      <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={rooms} columns={columns} />
    </div>
  );
};

export default RoomTable;