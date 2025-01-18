const express = require('express');
const {
  createAttendance,
  getAttendanceByUser,
  updateAttendance,
  deleteAttendance,
  getAllAttendance
} = require('../Controllers/AttendanceController');
const router = express.Router();

// Create Attendance Record
router.post('/', createAttendance);

// Get Attendance by User ID
router.get('/user/:userId', getAttendanceByUser);

// Update Attendance Record
router.put('/:id', updateAttendance);

// Delete Attendance Record
router.delete('/:id', deleteAttendance);

// Get All Attendance Records (for Admin)
router.get('/all', getAllAttendance);

module.exports = router;
