import React, { useEffect, useState } from 'react';
import { convertDateFormat, deleteUser, getPricesByRoomID, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const PriceTable = (props) => {
  const [priceList, setPriceList] = useState([]);
  const [updateValue, setUpdateValue] = useState();
  const [index, setIndex]= useState(-1);
  const navigate = useNavigate();

  const roomID = props.roomID;
  console.log("RoomIDXXXX:", roomID);

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    navigate(`/admin/price/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteUser(id);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const priceList = await getPricesByRoomID(props.roomID);
      console.log("priceList", priceList);
      setPriceList(priceList);
      setUpdateValue(priceList)
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
  }, [props.roomID]);
  useEffect(() => {
    // const fetRooms = async () => {
    //   try {
    //     const priceList = await getPricesByRoomID(roomID);
    //     console.log("priceList", priceList);
    //     setPriceList(priceList);
    //   } catch (error) {
    //     // Handle error
    //     console.error('Error:', error);
    //   }
    // };
    // fetRooms();
    refreshData();

  }, []);

  const  handlePriceChange = (value, id, index)=> {
    // Handle the age change here and update the dataSource or make an API call
    console.log(`New age for record ${index} ${id}: ${value}`);

    
    setUpdateValue(value??0);
    setIndex(index);


  }
  const columns = [
    {
      title: 'Phần trăm',
      dataIndex: 'percentage',
      key: 'percentage',
      // width: '10%'
    },

    {
      title: 'Giá',
      dataIndex: 'priceUpdate',
      key: 'priceUpdate',

      render: (_, record, index2) => (
        <Input
          value={(updateValue && index2 == index)?updateValue: record.priceUpdate}
          onChange={(e) => handlePriceChange(e.target.value, record.priceUpdate, index2)}
        />
      ),
      width: '50%'

    }
    ,
    // {
    //   title: 'Hành động',
    //   key: 'actions',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Cập nhật</Button>
    //       <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>

    //     </Space>
    //   ),
    // },
    // Add more columns as needed
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <Table style={{ width: '90%', fontFamily: 'Courier New ', marginRight:'20px' }} rowClassName={getRowClassName} dataSource={priceList} columns={columns} />
    </div>
  );
};

export default PriceTable;