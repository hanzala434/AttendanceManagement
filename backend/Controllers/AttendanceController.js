const Attendance = require('../Models/Attendance');
const asyncHandler = require('express-async-handler');
const User = require('../Models/User');

// Create Attendance Record
const createAttendance = asyncHandler(async (req, res) => {
  const { user, date, status } = req.body;

  if (!user || !date || !status) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userRecord = await User.findById(user);
  if (!userRecord) {
    res.status(404);
    throw new Error('User not found');
  }

  const attendance = await Attendance.create({
    user,
    userName: userRecord.name, 
    date,
    status,
  });

  if (attendance) {
    res.status(201).json(attendance);
  } else {
    res.status(400);
    throw new Error('Invalid attendance data');
  }
});

// Get Attendance by User ID
const getAttendanceByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  const attendanceRecords = await Attendance.find({ user: userId });

  if (attendanceRecords) {
    res.status(200).json(attendanceRecords);
  } else {
    res.status(404);
    throw new Error('Attendance records not found');
  }
});

// Update Attendance Record
const updateAttendance = asyncHandler(async (req, res) => {
  const { date, status } = req.body;

  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    res.status(404);
    throw new Error('Attendance record not found');
  }

  attendance.date = date || attendance.date;
  attendance.status = status || attendance.status;

  const updatedAttendance = await attendance.save();

  res.status(200).json(updatedAttendance);
});

// Delete Attendance Record
const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    res.status(404);
    throw new Error('Attendance record not found');
  }

  await attendance.remove();

  res.status(200).json({ message: 'Attendance record removed' });
});

// Get All Users Attendance Records (for Admin)
const getAllAttendance = asyncHandler(async (req, res) => {
  const attendanceRecords = await Attendance.find()

  if (attendanceRecords) {
    res.status(200).json(attendanceRecords);
  } else {
    res.status(404);
    throw new Error('No attendance records found');
  }
});

module.exports = {
  createAttendance,
  getAttendanceByUser,
  updateAttendance,
  deleteAttendance,
  getAllAttendance
};
