import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API}/api/leave`;

// Create Leave Request
const createLeaveRequest = async (leaveData) => {
  const res = await axios.post(API_URL, leaveData);
  return res.data;
};

// Get Leave Requests by User ID
const getLeaveRequestsByUser = async (userId) => {
  const res = await axios.get(`${API_URL}/user/${userId}`);
  return res.data;
};

// Update Leave Request Status
const updateLeaveRequestStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/${id}`, { status });
  return res.data;
};

// Delete Leave Request
const deleteLeaveRequest = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.message;
};

// Get All Leave Requests (for Admin)
const getAllLeaveRequests = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

const getLeaveRequestById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const leaveService = {
  createLeaveRequest,
  getLeaveRequestsByUser,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById
};

export default leaveService;
