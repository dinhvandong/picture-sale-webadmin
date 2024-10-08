import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteEvent, deleteUser, getEvents, getEventsItem, getEventsItemChild, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
// import defaultImage from '../../assets/icon.png';
// import defaultImage3 from '../../assets/checkbox.png';
import { IoReturnUpBackSharp } from "react-icons/io5";
import './UserTable.css'; // Import your custom CSS file
import { getBookings } from '../../services/api_booking';
//import './tableStyle.css';
const BookingTable = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingsJson, setBookingsJson] = useState([]);
    const [bookingItem, setBookingItem] = useState([]);
    const [bookingID, setBookingID] = useState();
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log('Edit clicked for ID:', id);
        navigate(`/admin/event/update/${id}`)
    };



    const handleDelete = async (id) => {
        console.log('Delete clicked for ID:', id);
        const deleteEventModel = { id: id };
        const response = await deleteEvent(deleteEventModel);
        refreshData();
        console.log("delete:", response);
    };

    const refreshData = async () => {
        try {
            const bookingList = await getBookings();
            console.log("bookingList", bookingList);
            setBookings(bookingList);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const getRowClassName = (record, index) => {
        return index % 2 === 1 ? 'row-even' : 'row-odd';
    };

    const handleButtonClick = (id) => {
        // Perform the desired action based on the row ID
        console.log('Button clicked for row:', id);
    };

    const dataJson = [
        {
            "id": 8,
            "title": "Mr",
            "firstName": "Đinh",
            "lastName": "Đông"

        }
    ]

    useEffect(() => {
        const fetBookings = async () => {
            try {
                const bookingList = await getBookings();
                console.log("bookingList", bookingList);

                if (bookingList && Array.isArray(bookingList)) {
                    bookingList.forEach((item) => {
                        // Perform operations on each item
                        console.log(item)
                    });
                } else {
                    console.error("myArray is either not defined or not an array");
                }
                setBookings(bookingList);

                const modifiedData = bookingList.map(item => ({
                    ...item,
                    flexibleOrNonRefund: item.flexibleOrNonRefund ? 'Flexible' : 'NonRefund',
                  }));
                  setBookingsJson(modifiedData);
                
            } catch (error) {
                // Handle error
                console.error('Error:', error);
            }
        };
        fetBookings();
    }, []);
    // const columns = [
    //     {
    //         title: 'id',
    //         dataIndex: 'id',
    //         key: 'id',
    //     },
    //     {
    //         title: 'title',
    //         dataIndex: 'title',
    //         key: 'title',

    //     },
    //     {
    //         title: 'firstName',
    //         dataIndex: 'firstName',
    //         key: 'firstName',

    //     },
    //     {
    //         title: 'lastName',
    //         dataIndex: 'lastName',
    //         key: 'lastName',

    //     },
    //     {
    //         title: 'cruiseType',
    //         dataIndex: 'cruiseType',
    //         key: 'cruiseType',

    //     },
    //     {
    //         title: 'flexibleOrNonRefund',
    //         dataIndex: 'flexibleOrNonRefund',
    //         key: 'flexibleOrNonRefund',

    //     },

    //     {
    //         title: 'price',
    //         dataIndex: 'price',
    //         key: 'price',

    //     },
    //     {
    //         title: 'createdDate',
    //         dataIndex: 'createdDate',
    //         key: 'createdDate',

    //     },
    //     {
    //         title: 'status',
    //         dataIndex: 'status',
    //         key: 'status',

    //     },
    //     {
    //         title: 'Hành động',
    //         key: 'actions',
    //         render: (text, record) => (
    //             <Space size="middle">
    //                 {/* <Button className="text-white bg-orange-600" type="primary" onClick={() => handleStep(record.id)}>Xem danh mục con</Button> */}
    //                 <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
    //                 <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
    //             </Space>
    //         ),
    //     },
    //     // Add more columns as needed
    // ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Title',
        //     dataIndex: 'title',
        //     key: 'title',
        // },
        // {
        //     title: 'FirstName',
        //     dataIndex: 'firstName',
        //     key: 'firstName',
        // },
        // {
        //     title: 'LastName',
        //     dataIndex: 'lastName',
        //     key: 'lastName',
        // },

        {
            title: 'FullName',
            key: 'fullName',
            render: (record) => (
                <span>
                    {record.title} {record.firstName} {record.lastName}
                </span>
            ),
        },
         {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'CruiseType',
            dataIndex: 'cruiseType',
            key: 'cruiseType',
        },
        // {
        //     title: 'FlexibleOrNonRefund',
        //     dataIndex: 'flexibleOrNonRefund',
        //     key: 'flexibleOrNonRefund',
        //     render: (value) => (value.toString()),

        //     // render: (value) => (value===true ? 'Flexible' : 'Non-refundable'),
        // },

        {
            title: 'FlexibleOrNonRefund',
            dataIndex: 'flexibleOrNonRefund',
            key: 'flexibleOrNonRefund',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'BookingDate',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
        },
        {
            title: 'BookingCode',
            dataIndex: 'bookingCode',
            key: 'bookingCode',
        },
        // {
        //     title: 'CreatedDate',
        //     dataIndex: 'createdDate',
        //     key: 'createdDate',
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (record) => (record.status === 2 ? 
                
                <span className='font-bold text-green-600'>Confirm</span> :<span className='font-bold text-red-600'>Pending</span>),
          },
        {
            title: 'Member',
            key: 'member',
            render: (record) => (
                <span>
                    {record.adult} adult - {record.children} children - {record.infant} infant
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleButtonClick(record.id)}
                >
                    Action
                </button>
            ),
        },
    ];
    return (
        <div className="w-[100%] flex-col flex justify-center items-center">
            <div className='w-[100%] flex-col flex'>

                <table className="table-auto">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.key} className="px-4 py-2">
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsJson.map(item => (
                            <tr key={item.id}>
                                {columns.map(column => (
                                    <td key={column.key} className="px-4 py-2 border">
                                        {column.render ? column.render(item) : item[column.dataIndex]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={bookings} columns={columns} /> */}
            </div>
        </div>
    );
};

export default BookingTable;