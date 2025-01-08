const LeaveRequest = require('../Models/Leave');
const asyncHandler = require('express-async-handler');

// Create Leave Request
const createLeaveRequest = asyncHandler(async (req, res) => {
  const { user, leaveType, startDate, endDate, reason } = req.body;

  if (!user || !leaveType || !startDate || !endDate || !reason) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const leaveRequest = await Leave.create({
    user,
    leaveType,
    startDate,
    endDate,
    reason,
  });

  if (leaveRequest) {
    res.status(201).json(leaveRequest);
  } else {
    res.status(400);
    throw new Error('Invalid leave request data');
  }
});

// Get Leave Requests by User ID
const getLeaveRequestsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  const leaveRequests = await Leave.find({ user: userId });

  if (leaveRequests) {
    res.status(200).json(leaveRequests);
  } else {
    res.status(404);
    throw new Error('Leave requests not found');
  }
});

// Update Leave Request Status
const updateLeaveRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const leaveRequest = await Leave.findById(req.params.id);

  if (!leaveRequest) {
    res.status(404);
    throw new Error('Leave request not found');
  }

  leaveRequest.status = status || leaveRequest.status;

  const updatedLeaveRequest = await leaveRequest.save();

  res.status(200).json(updatedLeaveRequest);
});

// Delete Leave Request
const deleteLeaveRequest = asyncHandler(async (req, res) => {
  const leaveRequest = await Leave.findById(req.params.id);

  if (!leaveRequest) {
    res.status(404);
    throw new Error('Leave request not found');
  }

  await leaveRequest.remove();

  res.status(200).json({ message: 'Leave request removed' });
});

module.exports = {
  createLeaveRequest,
  getLeaveRequestsByUser,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
