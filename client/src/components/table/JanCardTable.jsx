import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteRoom, deleteUser, getRooms, getUsers } from '../../services/api'
import { Button, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
import { deleteJanCard, getJanCard } from '../../services/api_janCard';
//import './tableStyle.css';
const JanCardTable = () => {
  const [janCardList, setJanCardList] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/admin/jan-card/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteJanCard(id);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const janCardList = await getJanCard();
      console.log("janCardList", janCardList);
      setJanCardList(janCardList);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index % 2 === 1 ? 'row-even' : 'row-odd';
  };
  //const fileResponse = API_URL_IMAGE + response.data;
  const roomTypes = ['BASIC', 'Platinum', 'VIP', 'GOLD'];

  useEffect(() => {
    const fetRooms = async () => {
      try {
        const janCardList = await getJanCard();
        console.log("janCardList", janCardList);
        setJanCardList(janCardList);
      } catch (error) {
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
    {
      title: 'Loại thẻ',
      dataIndex: 'cardType',
      key: 'cardType',
      // width: '20%'

    },
    {
      title: 'Số thẻ',
      dataIndex: 'number',
      key: 'number',
      // width: '20%'

    },
    {
      title: 'Giá cơ bản',
      dataIndex: 'price',
      key: 'price',
      // width: '20%'

    },
    {
      title: 'Tài khoản',
      dataIndex: 'email',
      key: 'email',
      // width: '20%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      // width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusStyle = {
          color: status === 2 ? 'inherit' : 'red',
        };
        return <span style={statusStyle}>{(status === 2 ? 'Đã thanh toán' : 'Chưa kích hoạt')}</span>;
      },
    },
    {
      title: 'Mã thanh toán',
      dataIndex: 'codePayment',
      key: 'codePayment',
      // width: '20%'
    },
    // {
    //   title: 'Ảnh đại diện',
    //   dataIndex: 'thumb',
    //   key: 'thumb',
    //   render: (thumb) => <img
    //     src={(API_URL_IMAGE + thumb)}
    //     alt="thumb"
    //     className="w-10 h-10 rounded-full"
    //   />,
    // },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className="text-white bg-orange-500" type="primary" onClick={() => handleEdit(record.id)}>Thêm Voucher</Button>
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
      <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={janCardList} columns={columns} />
    </div>
  );
};


export default JanCardTable