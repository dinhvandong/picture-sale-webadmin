import React, { useEffect, useState } from 'react';
import { API_URL_IMAGE, convertDateFormat, createGallery, deleteUser, getFirstSentence, getGalleries, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
import { deleteGallery } from '../../services/api_gallery';
import { deleteItinerary, getItinerary } from '../../services/api_itinerary';
//import './tableStyle.css';
const ItineraryTable = (props) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const gotoGalleryItem = (id) => {
        navigate("/admin/itinerary/" + id);
    }

    const handleEdit = (id) => {
        console.log('Edit clicked for ID:', id);
        props.onChildCallback(id);
    };

    const handleDelete = async (id) => {
        console.log('Delete clicked for ID:', id);
        const response = await deleteItinerary(id);
        fetItinerary();
        console.log("delete:", response);
    };

    const refreshData = async () => {
        try {
            const itineraryList = await getItinerary();
            console.log("itineraryList", itineraryList);
            setData(itineraryList);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getRowClassName = (record, index) => {
        return index % 2 === 1 ? 'row-even' : 'row-odd';
    };
    const fetItinerary = async () => {
        try {
            const itineraryList = await getItinerary();
            console.log("itineraryList", itineraryList);
            setData(itineraryList);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };
    useEffect(() => {

        fetItinerary();
    }, []);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // width: '10%'
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            // width: '20%'

        },

        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',
            render: (text) => getFirstSentence(text),

            // width: '20%'

        },

        {
            title: 'Ảnh Thumb',
            dataIndex: 'thumb',
            key: 'thumb',
            render: (thumb) => <img
                src={API_URL_IMAGE + thumb}
                alt="thumb"
                className="w-10 h-10 rounded"
            />,
        },
        {
            title: 'Notes',
            dataIndex: 'importanceNotes',
            key: 'importanceNotes',
            // width: '20%'
            render: (text) => getFirstSentence(text),


        },

        {
            title: 'Benefits',
            dataIndex: 'benefits',
            key: 'benefits',
            // width: '20%'
            render: (text) => getFirstSentence(text),

        },

        {
            title: 'Inclusions',
            dataIndex: 'inclusions',
            key: 'inclusions',
            // width: '20%'
            render: (text) => getFirstSentence(text),

        },
        {
            title: 'Exclusions',
            dataIndex: 'exclusions',
            key: 'exclusions',
            // width: '20%'
            render: (text) => getFirstSentence(text),

        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button className="text-white bg-edit" type="primary" onClick={() => gotoGalleryItem(record.id)}>Xem nội dung</Button>
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
            <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={data} columns={columns} />
        </div>
    );
};


export default ItineraryTable