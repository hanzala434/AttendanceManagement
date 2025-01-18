import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeaveRequests, reset, updateLeaveStatus } from '../features/leave/leaveSlice';
import { Link } from 'react-router-dom';

const AdminLeaveTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { leaveRequests, isLoading, error } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(getAllLeaveRequests());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateLeaveStatus({ id, status }));
  };

  if (isLoading) {
    return <p>Loading leave data...</p>;
  }

  if (error) {
    return <p>Error fetching leave data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Leave Records</h2>
      
      {/* Responsive Table (Cards for small screens) */}
      <div className="w-full overflow-x-auto">
        {leaveRequests.length === 0 ? (
          <p className="text-center py-4 text-gray-600">No leave records found.</p>
        ) : (
          leaveRequests.map((record) => (
            <div
              key={record._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50"
            >
              <div className="flex-1">
                <strong className="text-gray-800">Name:</strong> {record.userName}
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">Type:</strong> {record.leaveType}
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">Start Date:</strong>{' '}
                {new Date(record.startDate).toLocaleDateString()}
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">End Date:</strong>{' '}
                {new Date(record.endDate).toLocaleDateString()}
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">Status:</strong> {record.status}
              </div>
              <div className="flex-1">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(record._id, 'Approved')}
                    className="bg-green-500 text-white px-4 py-1 rounded focus:outline-none"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(record._id, 'Rejected')}
                    className="bg-red-500 text-white px-4 py-1 rounded focus:outline-none"
                  >
                    Reject
                  </button>
                  <Link
                    to={`/leave-detail/${record._id}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded focus:outline-none"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminLeaveTable;
