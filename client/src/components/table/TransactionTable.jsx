import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { convertDateFormat, deleteUser, getCategory, getTransactions } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const TransactionTable = () => {
    const [transactionList, setTransactionList] = useState([]);
    const navigate = useNavigate();
  
    const handleEdit = (id) => {
      console.log('Edit clicked for ID:', id);
      navigate(`/admin/transaction/update/${id}`)
    };
  
    const handleDelete = async (id) => {
      console.log('Delete clicked for ID:', id);
      const response = await deleteUser(id);
      refreshData();
      console.log("delete:", response);
    };
  
    const refreshData = async()=>{
      try {
        const transactionList = await getTransactions();
        console.log("transactionList", transactionList);
        setTransactionList(transactionList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    }
  
    const getRowClassName = (record, index) => {
      return index % 2 === 0 ? 'row-even' : 'row-odd';
    };
  
    useEffect(() => {
      const fetchTransaction = async () => {
        try {
          const transactionList = await getTransactions();
          console.log("transactionList", transactionList);
          setTransactionList(transactionList);
        } catch (error) {
          // Handle error
          console.error('Error:', error);
        }
      };
      fetchTransaction();
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
        title: 'Số tiền',
        dataIndex: 'money',
        key: 'money',
  
      },
      {
        title: 'Nhóm',
        dataIndex: 'group',
        key: 'group',
  
      },
      {
        title: 'Hạng mục',
        dataIndex: 'category',
        key: 'category',
  
      },
      {
        title: 'Mô tả',
        dataIndex: 'note',
        key: 'note',
  
      },
      {
        title: 'Tài khoản',
        dataIndex: 'username',
        key: 'username',
        
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
            color: status === 1 ? 'inherit' : 'red',
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
      // Add more columns as needed
    ];
    return (
      <div className="w-[100%]  flex justify-center items-center">
        <Table  style={{width:'100%', fontFamily:'Courier New '}}  rowClassName={getRowClassName} dataSource={transactionList} columns={columns}  />
      </div>
    );
}

export default TransactionTable