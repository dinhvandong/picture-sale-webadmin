import { Button, DatePicker } from 'antd';
import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CategoryTable from '../table/CategoryTable';
import TransactionTable from '../table/TransactionTable';
import moment from 'moment';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const TransactionList = () => {
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const handleInsert = () => {
    navigate("/admin/transaction/create-new");
  };
  const handleSearch = () => {

  }

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  function handleExportToExcel() {
    const tableData = [
      // Your table data goes here
    ];
  
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'tableData.xlsx');
  }
  const handleDateFromChange = (value) => {
    setDateFrom(value);
  };

  const handleDateToChange = (value) => {
    setDateTo(value);
  };
  return (
    <div className='w-full h-auto flex flex-col p-3'>
      <div className="m-5 flex justify-start md:justify-center sm:justify-center lg:justify-start">
        <p className="font-bold">TRANSACTIONS</p>
      </div>
      <Button className="w-[160px] font-bold ml-5 text-center mb-5 bg-blue-500" type="primary" onClick={handleInsert}>
        NEW TRANSACTION
      </Button>
      <div className='flex m-5 flex-row'>
        <div className='flex gap-3 items-center'>
          <input type="radio"
            className='h-4 w-4 text-green-500 focus:bg-green-500 p-3'
            checked />
          <label className='flex items-center'> Tất cả </label>
        </div>
        <div className='flex flex-row ml-5'>
          <form onSubmit={handleSearch}>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="text"
                className="w-full py-1 px-3 outline-none rounded-tl-md rounded-bl-md"
                placeholder="Tìm theo tên tài khoản"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className="p-2 border scale-105 shadow-sm text-gray-500 bg-white hover:bg-gray-100 rounded-tr-md rounded-br-md"
              >
                <IoMdSearch />
              </button>
            </div>
          </form>

          <div className='ml-5'>
            <div>Ngày bắt đầu:<DatePicker value={dateFrom} onChange={handleDateFromChange} /></div>
          </div>
          <div className='ml-5'>Ngày kết thúc:  <DatePicker value={dateTo} onChange={handleDateToChange} /></div>

          <div className='ml-5'>
            <Button className='bg-insert font-bold' type="primary" onClick={handleExportToExcel}>
              Export to Excel
            </Button>
            {/* Your Ant Design table goes here */}
          </div>
        </div>
      </div>
      <div className="flex w-[100%]   flex-row justify-center">
        <TransactionTable />

      </div>

    </div>
  );
}

export default TransactionList