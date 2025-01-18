import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceByUser, reset } from '../features/attendance/attendanceSlice'; // Adjust the import path as needed

const UserAttendanceTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { attendanceByUser, isLoading, error } = useSelector((state) => state.attendance);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAttendanceByUser(user._id));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user?._id]);

  if (isLoading) {
    return <p className="text-center text-blue-600">Loading attendance data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error fetching attendance data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4 md:mb-6">Your Attendance Records</h2>
      <div className="w-full max-w-4xl px-2 sm:px-4 lg:px-8">
        <table className="table-auto border-collapse border border-gray-300 w-full shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 md:px-6 py-2 md:py-3 text-left">Date</th>
              <th className="border border-gray-300 px-4 md:px-6 py-2 md:py-3 text-left">Time</th>
              <th className="border border-gray-300 px-4 md:px-6 py-2 md:py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceByUser.map((record) => (
              <tr key={record._id} className="hover:bg-blue-100">
                <td className="border border-gray-300 px-4 md:px-6 py-2 md:py-3">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 md:px-6 py-2 md:py-3">
                  {new Date(record.date).toLocaleTimeString()}
                </td>
                <td className="border border-gray-300 px-4 md:px-6 py-2 md:py-3">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendanceTable;
