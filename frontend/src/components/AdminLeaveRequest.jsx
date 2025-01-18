import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLeaveRequestById } from '../features/leave/leaveSlice';

const AdminLeaveRequest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { leaveRequest, isLoading, error } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(getLeaveRequestById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading leave request...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      {leaveRequest && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Leave Request Details</h2>
          <p><strong>ID:</strong> {leaveRequest._id}</p>
          <p><strong>User:</strong> {leaveRequest.user}</p>
          <p><strong>User Name:</strong> {leaveRequest.userName}</p>
          <p><strong>Leave Type:</strong> {leaveRequest.leaveType}</p>
          <p><strong>Reason:</strong> {leaveRequest.reason}</p>
          <p><strong>Start Date:</strong> {new Date(leaveRequest.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(leaveRequest.endDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {leaveRequest.status}</p>
          <p><strong>Applied At:</strong> {new Date(leaveRequest.appliedAt).toLocaleDateString()}</p>
        </>
      )}
    </div>
  );
};

export default AdminLeaveRequest;
