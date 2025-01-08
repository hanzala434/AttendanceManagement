const express = require('express');
const {
  createLeaveRequest,
  getLeaveRequestsByUser,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
} = require('../Controllers/LeaveController');
const router = express.Router();

// Create Leave Request
router.post('/', createLeaveRequest);

// Get Leave Requests by User ID
router.get('/user/:userId', getLeaveRequestsByUser);

// Update Leave Request Status
router.put('/:id', updateLeaveRequestStatus);

// Delete Leave Request
router.delete('/:id', deleteLeaveRequest);

module.exports = router;
