import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveRequestsByUser,reset } from '../features/leave/leaveSlice';

const UserLeaveTable = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth)
  const { leaveRequestsByUser, isLoading, error } = useSelector((state) => state.leave);

  useEffect(() => {
    if (user._id) {
      dispatch(getLeaveRequestsByUser(user._id));
    }

    return () => {
        dispatch(reset())
      }
      
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading leave data...</p>;
  }

  if (error) {
    return <p>Error fetching leave data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Leaves Records</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequestsByUser.map((record) => (
            <tr key={record._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.startDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.endDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLeaveTable;
