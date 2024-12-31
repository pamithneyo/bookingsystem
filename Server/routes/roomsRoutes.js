const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// Route to get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    console.log('Fetched rooms:', rooms);  // Log fetched rooms for debugging
    return res.status(200).json({ success: true, rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
});

// Route to get room by ID
router.post("/getroombyid", async (req, res) => {
  const { roomid } = req.body;

  console.log(roomid);
  

  if (!roomid) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  try {
    const room = await Room.findOne({ _id: roomid });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Error fetching room:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Failed to fetch room",
      error: error.message,
    });
  }
});

module.exports = router;







