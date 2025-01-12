import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeaveRequests,reset, updateLeaveStatus } from '../features/leave/leaveSlice';
import { Link } from 'react-router-dom';

const AdminLeaveTable = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth)
  const { leaveRequests, isLoading, error } = useSelector((state) => state.leave);

  useEffect(() => {
      dispatch(getAllLeaveRequests());

    return () => {
        dispatch(reset())
      }
      
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
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Leave Records</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((record) => (
            <tr key={record._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{record.userName}</td>
              <td className="border border-gray-300 px-4 py-2">{record.leaveType}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.startDate).toLocaleDateString()}
              </td> 
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.endDate).toLocaleDateString()}
              </td> 
              <td className="border border-gray-300 px-4 py-2">{record.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleStatusUpdate(record._id, 'Approved')}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(record._id, 'Rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Reject
                </button>
                <Link
                  to={`/leave-detail/${record._id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaveTable;
