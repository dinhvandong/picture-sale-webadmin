import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createRoom, createUser, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, DatePicker, Table, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import UserTable from '../table/UserTable';
import { MdAdd } from 'react-icons/md';
import RoomTable from '../table/RoomTable';
import TimePriceTable from '../table/TimePriceTable';
import { createPriceArray, getPriceArray, getPriceByDate } from '../../services/api_price_by_date';
import { IoSearchCircle } from "react-icons/io5";
//import { Button, Space, Table, Input } from 'antd';

const TimeTablePriceList = () => {
    const navigate = useNavigate();
    // const [items, setItems] = useState([]);

    // const handleInputChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    // const handleTypeSelection = (type) => {
    //     setSelectedType(type);
    // };
    // const gotoCreateNew = () => {
    //     navigate('/admin/users/room-new');

    // }
    // const gotoUserList = () => {
    //     navigate('/admin/room');

    // }
    const [formData, setFormData] = useState({
        roomType: '',
        priceBase: '',
        description: '',
        thumb: '',
        roomItemList: []

    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };




    // function handleInputChangeItem(e, itemId) {
    //     const updatedItems = items.map((item) => {
    //         if (item.id === itemId) {
    //             return { ...item, item: e.target.value };
    //         }
    //         return item;
    //     });
    //     setItems(updatedItems);
    //     console.log("Items-List:", items);
    // }

    // const handleSearch = () => {

    // }

    const [searchTerm, setSearchTerm] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [priceDay, setPriceDay] = useState(0);
    const [priceDinner, setPriceDinner] = useState(0);
    const [priceDayNonRefund, setPriceDayNonRefund] = useState(0);
    const [priceDinnerNonRefund, setPriceDinnerNonRefund] = useState(0);

    const [priceWeekDay, setPriceWeekDay] = useState(0);
    const [priceWeekEnd, setPriceWeekEnd] = useState(0);

    const [dateTime, setDateTime] = useState(null);
    const [priceList, setPriceList] = useState([]);

    const [first, setFirst] = useState(true);
    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };

    function formatDateTime(dateString) {
        const parts = dateString.split('-');
        const formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;

        return formattedDate;
    }

    const handleStartDateChange = (date, dateString) => {
        const formattedDate = formatDateTime(dateString)
        console.log(formattedDate);
        setStartDate(formattedDate);

    };


    const handleEndDateChange = (date, dateString) => {
        const formattedDate = formatDateTime(dateString);
        console.log(formattedDate);
        setEndDate(formattedDate);
    };

    const handlePriceDayChange = (e) => {
        setPriceDay(e.target.value);

    }
    useEffect(() => {

        if (first) {

            refreshData();

            setFirst(false);
        }
    }, []);
    const handlePriceDayNonRefundChange = (e) => {
        setPriceDayNonRefund(e.target.value);

    }

    const handlePriceDinnerChange = (e) => {
        setPriceDinner(e.target.value);
    }

    const handlePriceDinnerNonRefundChange = (e) => {
        setPriceDinnerNonRefund(e.target.value);
    }

    const handleTextSearchChange = async (e) => {
        setDateTime(e.target.value);
        const dateTime = e.target.value;
        if (dateTime != null && dateTime != "" && String(dateTime).length > 0 ) 
            {
                try {
                    const priceDate = await getPriceByDate(dateTime);
                    const myArray = [];
                    const updatedArray = [...myArray, priceDate];
                    setPriceList(updatedArray);
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                refreshData();
            }

    }


    const handlePriceWeekDayChange = (e) => {
        setPriceWeekDay(e.target.value);
    }

    const handlePriceWeekEndChange = (e) => {
        setPriceWeekEnd(e.target.value);
    }
    const handleRefresh = () => {
        window.location.reload();
    };


    const handleSearchByDate = async () => {

        if (dateTime != null && dateTime != "" && String(dateTime).length > 0 ) 
        {
            try {
                const priceDate = await getPriceByDate(dateTime);
                const myArray = [];
                const updatedArray = [...myArray, priceDate];
                setPriceList(updatedArray);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            refreshData();
        }
    }

    const refreshData = async () => {
        try {
            const priceList = await getPriceArray(0, 10000);
            console.log("priceList", priceList);
            setPriceList(priceList);
            // setUpdateValue(priceList)
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createPriceArray(startDate, endDate,
            priceDay, priceDinner
            , priceDayNonRefund, priceDinnerNonRefund, priceWeekDay, priceWeekEnd);
        console.log("Data_Response:", result.data);

        handleRefresh();

    };

    const [index, setIndex] = useState(-1);
    const [updateValue, setUpdateValue] = useState();

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
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>

            {/* <div className='flex w-full bg-base_color'>

                <div className='w-1/2'></div>

                <div className='w-1/2'>

                    <div className='flex flex-row m-5'>
                        <div className='flex items-center gap-3'>
                            <input type="radio"
                                className='w-4 h-4 p-3 text-green-500 focus:bg-green-500'
                                checked />
                            <label className='flex items-center'> Tất cả </label>
                        </div>
                        <div className='flex ml-5'>
                            <form onSubmit={handleSearch}>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-1 outline-none rounded-tl-md rounded-bl-md"
                                        placeholder="Tìm kiếm"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className="p-2 text-gray-500 scale-105 bg-white border shadow-sm hover:bg-gray-100 rounded-tr-md rounded-br-md"
                                    >
                                        <IoMdSearch />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div> */}


            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo mới bảng giá</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className='flex justify-end px-5 mt-5 mr-5'>
                <input onChange={handleTextSearchChange} className='w-[300px] border border-1 px-3 py-2' placeholder='YYYY/MM/DD' />
                <button onClick={() => handleSearchByDate()} className='px-3 py-2 text-white rounded-md bg-base_color'>Tìm kiếm</button>
            </div>

            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-[30%] h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">

                        <div className="mb-2">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select start date"
                                dateFormat='YYYY-MM-DD'
                            // selectsStart
                            // startDate={startDate}
                            // endDate={startDate}
                            />
                        </div>
                        <div className="mb-2">
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select end date"
                                dateFormat='YYYY-MM-DD'
                            // selectsEnd
                            // startDate={endDate}
                            // endDate={endDate}
                            // minDate={endDate}
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Giá ban ngày (Flexible): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceBase"
                                name="priceBase"
                                value={priceDay}
                                onChange={handlePriceDayChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Giá ban ngày (Non-refund): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceDayNonRefund"
                                name="priceDayNonRefund"
                                value={priceDayNonRefund}
                                onChange={handlePriceDayNonRefundChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Giá ban đêm (Flexible): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={priceDinner}
                                onChange={handlePriceDinnerChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="priceDinnerNonRefund" className="block mb-2 font-medium">
                                Giá ban đêm (Non-refund): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceDinnerNonRefund"
                                name="priceDinnerNonRefund"
                                value={priceDinnerNonRefund}
                                onChange={handlePriceDinnerNonRefundChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="priceWeekDay" className="block mb-2 font-medium">
                                Giá trong tuần (WeekDay): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceWeekDay"
                                name="priceWeekDay"
                                value={priceWeekDay}
                                onChange={handlePriceWeekDayChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="priceWeekEnd" className="block mb-2 font-medium">
                                Giá cuối tuần (WeekEnd): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="priceWeekEnd"
                                name="priceWeekEnd"
                                value={priceWeekEnd}
                                onChange={handlePriceWeekEndChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Tạo bảng giá
                        </button>
                    </form>
                </div>

                <div className="flex ml-5 w-[2px] h-full bg-base_color">

                </div>
                <div className='flex flex-col w-[68%] h-auto ml-5'>
                    <div className="flex w-[100%] ml-5 mr-2 flex-row justify-center">
                        {/* <TimePriceTable key={priceList.length} priceList={priceList} /> */}

                        <div className="flex items-center justify-center w-full">
                            <Table style={{ border: '1px', borderColor: '#2F4842', width: '90%', fontFamily: 'Courier New ', marginRight: '20px', backgroundColor: '#2F4842' }} rowClassName={getRowClassName} dataSource={priceList} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TimeTablePriceList