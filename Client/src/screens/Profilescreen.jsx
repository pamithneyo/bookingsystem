import React, { useState, useEffect } from 'react'
import { Tabs, Tag } from 'antd';
import axios from "axios";
import Error from '../components/Error';
import { data } from 'react-router-dom';
import Swal from 'sweetalert2'
// import {Tag, Divider} from 'antd';
const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        if (!user) {
            window.local.href = '/login'
        }

    }, [])

    return (
        <div className='ml-3 mt-5'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key='1'>
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>IsAdmin: {user.isAdmin ? 'Yes' : 'No'}</h1>
                </TabPane>
                <TabPane tab="Booking" key='2'>
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen;




export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user._id) {
                setError("User ID is missing or invalid");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', {
                    userid: user._id,
                });
                setBookings(response.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch bookings");
            }
        };

        fetchBookings();
    }, [user]);

    async function cancelBooking(bookingid, roomid) {
        try {
            const result = (await axios.post("http://localhost:5000/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(error)
            Swal.fire('Congrats', 'Your booking has been cancelled.', 'sucess').then(result => {
                window.location.reload()
            }
            )

        } catch (error) {
            console.log(error)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <h1>{booking.room}</h1>
                        <p><b>BookingId</b>: {booking._id}</p>
                        <p><b>CheckIn</b>: {booking.fromdate}</p>
                        <p><b>CheckOut</b>: {booking.todate}</p>
                        <p><b>Amount</b>: {booking.totalamount}</p>
                        <p><b>Status</b>: {" "}
                        {booking.status == "cancelled" ? (<Tag color="Red">Cancelled</Tag>):(<Tag color="green"> Confirmed</Tag>)}
                       
                        </p>
                        {booking.status !== 'cancelled' && (<div style={{ float: "right" }}>
                            <button className='btn btn-primary'
                                onClick={() => { cancelBooking(booking._id, booking.roomid) }}>
                                Cancel Booking
                            </button>

                        </div>)}
                    </div>
                ))
            ) : (
                !error && <h1>No bookings found.</h1>
            )}
        </div>
    );
}