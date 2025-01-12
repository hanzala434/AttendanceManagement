import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createLeave } from '../features/leave/leaveSlice';

const LeaveForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get logged in user from redux
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error('Please fill all the fields');
      return;
    }

    setIsSubmitting(true);

    const leaveData = {
      user: user._id,
      leaveType,
      startDate,
      endDate,
      reason,
    };

    dispatch(createLeave(leaveData))
      .then(() => {
        toast.success('Leave request submitted successfully!');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
      })
      .catch((error) => {
        toast.error(error.message || 'Error in submitting leave request');
      })
      .finally(() => setIsSubmitting(false));

      console.log(leaveData);
  };

  return (
    <>
      <div className="container mx-auto mt-8 px-4 sm:px-6 md:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold text-center">Create Leave Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Leave Type</label>
            <input
              type="text"
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter leave type (e.g., Sick, Vacation)"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter the reason for leave"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
      </div>
    </>
  );
};

export default LeaveForm;
