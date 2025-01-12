import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceByUser,reset } from '../features/attendance/attendanceSlice'; // Adjust the import path as needed

const UserAttendanceTable = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth)
  const { attendanceByUser, isLoading, error } = useSelector((state) => state.attendance);

  useEffect(() => {
    if (user._id) {
      dispatch(getAttendanceByUser(user._id));
    }

    return () => {
        dispatch(reset())
      }
      
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading attendance data...</p>;
  }

  if (error) {
    return <p>Error fetching attendance data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Attendance Records</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceByUser.map((record) => (
            <tr key={record._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(record.date).toLocaleTimeString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAttendanceTable;
