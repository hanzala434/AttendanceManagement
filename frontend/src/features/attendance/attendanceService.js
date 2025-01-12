import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API}/api/attendance`;

// Create Attendance Record
const createAttendance = async (attendanceData) => {
  const res = await axios.post(API_URL, attendanceData);
  return res.data;
};

// Get Attendance by User ID
const getAttendanceByUser = async (userId) => {
  const res = await axios.get(`${API_URL}/user/${userId}`);
  return res.data;
};

// Update Attendance Record
const updateAttendance = async (recordId, attendanceData) => {
  console.log(attendanceData)
  const res = await axios.put(`${API_URL}/${recordId}`, attendanceData);
  return res.data;
};

// Delete Attendance Record
const deleteAttendance = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.message;
};

// Get All Attendance Records (for Admin)
const getAllAttendance = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

const attendanceService = {
  createAttendance,
  getAttendanceByUser,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
};

export default attendanceService;
