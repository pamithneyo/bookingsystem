import React, { useState, useEffect } from 'react';
import Room from '../components/Room';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]); // State for storing rooms
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(false); // State for error handling
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicaterooms, setDuplicaterooms] = useState([]); // Duplicate room data for filtering
  const [searchkey, setSearchkey] = useState('');
  const [type, setType] = useState('all'); // Room type filter

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true); // Start loading
        setError(false); // Reset error before fetching
        const response = await fetch('http://localhost:5000/api/rooms/getallrooms');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setRooms(data.rooms); // Update rooms state with fetched data
        setDuplicaterooms(data.rooms); // Set duplicate rooms
      } catch (error) {
        setError(true); // Set error state if fetching fails
        console.error('Error fetching rooms:', error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchRooms();
  }, []);

  // Log state for debugging
  console.log('Rooms state:', rooms);

  // Filter rooms by date range
  function filterByDate(dates) {
    const formattedFromDate = moment(dates[0]).format('DD-MM-YYYY');
    const formattedToDate = moment(dates[1]).format('DD-MM-YYYY');

    setFromdate(formattedFromDate);
    setTodate(formattedToDate);

    const filteredRooms = duplicaterooms.filter((room) => {
      let availability = true;

      for (const booking of room.currentbookings || []) {
        if (
          moment(formattedFromDate).isBetween(booking.fromdate, booking.todate, undefined, '[)') ||
          moment(formattedToDate).isBetween(booking.fromdate, booking.todate, undefined, '[)')
        ) {
          availability = false;
          break;
        }
      }

      return availability;
    });

    setRooms(filteredRooms);
  }

  // Filter rooms by search keyword
  function filterBySearch() {
    const filteredRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setRooms(filteredRooms);
  }

  function filterByType(selectedType) {
    if (selectedType === 'all') {
      setRooms(duplicaterooms); // Show all rooms when "all" is selected
    } else {
      const filteredRooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === selectedType.toLowerCase()
      );
      setRooms(filteredRooms);
    }
  }
  

  return (
    <div className="container bs">
      <div className="row mt-2 bs">
        <div className="col-md-3 mt-5">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search rooms"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3 mt-5">
        <select
  className="form-control"
  value={type}
  onChange={(e) => {
    setType(e.target.value); // Update the selected type state
    filterByType(e.target.value); // Call the filter function
  }}
>
  <option value="all">All</option>
  <option value="Suite">Suite</option>
  <option value="Double Room">Double Room</option>
  <option value="Family Room">Family Room</option>
  <option value="Single Room">Single Room</option>
  <option value="Penthouse">Penthouse</option>
</select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error fetching rooms</h1>
        ) : rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div key={index} className="col-md-9 mt-2">
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <h1>No rooms available</h1>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
