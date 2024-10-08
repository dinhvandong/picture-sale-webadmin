import React, { useEffect, useState } from 'react';
import { convertDateFormat, deleteUser, getPricesByRoomID, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import { getPriceArray } from '../../services/api_price_by_date'

import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const TimePriceTable = (props) => {

    const priceList = props.priceList;
    //const [priceList, setPriceList] = useState([]);
    const [updateValue, setUpdateValue] = useState();
    const [index, setIndex] = useState(-1);
    const navigate = useNavigate();

    //const roomID = props.roomID;
    //console.log("RoomIDXXXX:", roomID);

    const handleEdit = (id) => {
        console.log('Edit clicked for ID:', id);
        navigate(`/admin/price/update/${id}`)
    };

    const handleDelete = async (id) => {
        console.log('Delete clicked for ID:', id);
        const response = await deleteUser(id);
       // refreshData();
        console.log("delete:", response);
    };

      const refreshData = async () => {
        try {
          const priceList = await getPriceArray(0,10000);
          console.log("priceList", priceList);
         // setPriceList(priceList);
          setUpdateValue(priceList)
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      }

    const getRowClassName = (record, index) => {
        return index % 2 === 1 ? 'row-even' : 'row-odd';
    };

    

    const handlePriceChange = (value, id, index) => {
        console.log(`New age for record ${index} ${id}: ${value}`);
        setUpdateValue(value ?? 0);
        setIndex(index);
    }
    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'dateTimeString',
            key: 'dateTimeString',
         width: '20%'
        },
        {
            title: 'Giá ngày (Flexible)',
            dataIndex: 'priceDay',
            key: 'priceDay',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceDay}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceDay, index2)}
                />
            ),
            width: '20%'
        },
        {
            title: 'Giá ngày (Non-Refund)',
            dataIndex: 'priceDayNonRefund',
            key: 'priceDayNonRefund',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceDayNonRefund}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceDayNonRefund, index2)}
                />
            ),
            width: '20%'
        },
        {
            title: 'Giá đêm (Flexible)',
            dataIndex: 'priceDinner',
            key: 'priceDinner',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceDinner}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceDinner, index2)}
                />
            ),
            width: '20%'
        },
        {
            title: 'Giá đêm (Non-Refund)',
            dataIndex: 'priceDinnerNonRefund',
            key: 'priceDinnerNonRefund',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceDinnerNonRefund}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceDinnerNonRefund, index2)}
                />
            ),
            width: '20%'
        },
        {
            title: 'Giá trong tuần (WeekDay)',
            dataIndex: 'priceWeekDay',
            key: 'priceWeekDay',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceWeekDay}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceWeekDay, index2)}
                />
            ),
            width: '20%'
        },
        {
            title: 'Giá cuối tuần (WeekEnd)',
            dataIndex: 'priceWeekEnd',
            key: 'priceWeekEnd',
            render: (_, record, index2) => (
                <Input
                    value={(updateValue && index2 == index) ? updateValue : record.priceWeekEnd}
                    onChange={(e) => handlePriceChange(e.target.value, record.priceWeekEnd, index2)}
                />
            ),
            width: '20%'
        }
    ];
    return (
        <div className="flex items-center justify-center w-full">
            <Table style={{border:'1px', borderColor:'#2F4842', width: '90%', fontFamily: 'Courier New ', marginRight: '20px', backgroundColor:'#2F4842' }} rowClassName={getRowClassName} dataSource={priceList} columns={columns} />
        </div>
    );
};

export default TimePriceTable