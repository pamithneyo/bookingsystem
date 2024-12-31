import React, { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';
import axios from 'axios';
import Error from '../components/Error';

const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div className='mt-3 ml-1 mr-3 bs'>
            <h2 className='mt-5 text-center' style={{ fontSize: '30px' }}>
                <b>Admin Panel</b>
            </h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key='1'>
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key='2'>
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab="Add Rooms" key='3'>
                    <h1>Add Rooms</h1>
                </TabPane>
                <TabPane tab="Users" key='4'>
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/getallbookings`);
                setBookings(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <Spin tip="Loading bookings..." />;
    }

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {error ? (
                    <Error message={error.message} />
                ) : bookings.length > 0 ? (
                    <h2>There are a total of {bookings.length} bookings.</h2>
                ) : (
                    <h2>No bookings available.</h2>
                )}
            </div>
        </div>
    );
}

