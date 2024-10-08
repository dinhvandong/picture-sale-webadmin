import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, deleteEvent, deleteUser, getEvents, getEventsItem, getEventsItemChild, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
// import defaultImage from '../../assets/icon.png';
// import defaultImage3 from '../../assets/checkbox.png';
import { IoReturnUpBackSharp } from "react-icons/io5";
import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const EventTable = () => {
    const [events, setEvents] = useState([]);
    const [eventsItem, setEventsItem] = useState([]);
    const [eventsItemChild, setEventsItemChild] = useState([]);
    const [eventID, setEventID] = useState();
    const [eventItemID, setEventItemID] = useState();

    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log('Edit clicked for ID:', id);
        navigate(`/admin/event/update/${id}`)
    };

    const handleStep = (id) => {

        if (step == 1) {
            setStep(step + 1)

            setEventID(id);

            refreshData2(id);
        }
        // console.log('Edit clicked for ID:', id);
        // navigate(`/admin/room/update/${id}`)
    };

    const handleBack3 = () => {
        setStep(2);
        refreshData2(eventID);

    }

    const handleBack2 = () => {

        setStep(1);
        refreshData();
    }
    const handleStep2 = (id) => {

        if (step == 2) {
            setStep(step + 1)
            setEventItemID(id);
            refreshData3(eventID, id);

        }
        // console.log('Edit clicked for ID:', id);
        // navigate(`/admin/room/update/${id}`)
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
            const eventsList = await getEvents();
            console.log("eventsList", eventsList);
            setEvents(eventsList);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const refreshData2 = async (id) => {
        try {
            const eventsListItem = await getEventsItem(id);
            console.log("eventsListItem", eventsListItem);
            setEventsItem(eventsListItem);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const refreshData3 = async (eventID, eventItemID) => {
        try {
            const eventsListItemChild = await getEventsItemChild(eventID, eventItemID);
            console.log("eventsListItemChild", eventsListItemChild);
            setEventsItemChild(eventsListItemChild);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const getRowClassName = (record, index) => {
        return index % 2 === 1 ? 'row-even' : 'row-odd';
    };

    useEffect(() => {
        const fetRooms = async () => {
            try {
                const eventsList = await getEvents();
                console.log("eventsList", eventsList);
                setEvents(eventsList);
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
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Mô tả ngắn',
            dataIndex: 'subName',
            key: 'subName',

        },

        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',

        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon, item) => <img
                src={API_URL_IMAGE + icon}
                alt="icon"
                className={`w-10 h-10`}

               style={{ width: `${parseInt(item.width)}px`, height: `${parseInt(item.height)}px` }}

            />,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button className="text-white bg-orange-600" type="primary" onClick={() => handleStep(record.id)}>Xem danh mục con</Button> */}
                    <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
                    <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },
        // Add more columns as needed
    ];


    const columns2 = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Mô tả ngắn',
            dataIndex: 'subTitle',
            key: 'subTitle',

        },

        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',

        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon, item) => <img
                src={API_URL_IMAGE + icon}
                alt="icon"
                className={`w-10 h-10`}

                // style={{ width: `50px`, height: `50px` }}

                style={{ width: `${parseInt(item.width)}px`, height: `${parseInt(item.height)}px` }}

            />,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button className="text-white bg-orange-600" type="primary" onClick={() => handleStep2(record.id)}>Tạo Danh mục con</Button>
                    <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
                    <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },
        // Add more columns as needed
    ];

    const columns3 = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon, item) => <img
                src={API_URL_IMAGE + icon}
                alt="icon"
                style={{ width: `${parseInt(item.width)}px`, height: `${parseInt(item.height)}px` }}

            // className={`w-10 h-10`}
            />,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
                    <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },
        // Add more columns as needed
    ];
    return (
        <div className="w-[100%] flex-col flex justify-center items-center">
            {step === 1 && (
                <div className='w-[100%] flex-col flex'>

                    <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={events} columns={columns} />


                </div>

            )}

            {step === 2 && (
                <div className='w-[100%] flex-col flex'>
                    <div onClick={handleBack2} className='flex item-center hover:cursor-pointer'>
                        <IoReturnUpBackSharp />
                        <div className='ml-5'>Quay lại</div>
                    </div>
                    <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={eventsItem} columns={columns2} />
                </div>
            )}

            {step === 3 && (
                <div className='w-[100%] flex-col flex'>
                    <div onClick={handleBack3} className='flex item-center hover:cursor-pointer'>
                        <IoReturnUpBackSharp />
                        <div className='ml-5'>Quay lại</div>
                    </div>
                    <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={eventsItemChild} columns={columns3} />
                </div>
            )}


        </div>
    );
};

export default EventTable;