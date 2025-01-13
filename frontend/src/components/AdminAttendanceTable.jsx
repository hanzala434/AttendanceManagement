import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance, reset, updateAttendance } from '../features/attendance/attendanceSlice'; 
import { updateGrade } from '../features/grade/gradeSlice';

const AdminAttendanceTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { attendance, isLoading, error } = useSelector((state) => state.attendance);
  
  const [searchDate, setSearchDate] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    dispatch(getAllAttendance()).catch(err => console.error('Failed to fetch attendance:', err));
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    filterAttendanceByDate();
  }, [attendance, searchDate]);

  const filterAttendanceByDate = () => {
    if (attendance) {
      const filtered = searchDate
        ? attendance.filter(record => new Date(record.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString())
        : attendance;
      setFilteredAttendance(filtered);
    }
  };

  const handleStatusChange = (recordId, currentStatus, date, userId) => {
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    dispatch(updateAttendance({ recordId, attendanceData: { status: newStatus, date } }))
      .then(() => dispatch(updateGrade({ userId })))
      .catch(error => alert('Failed to update status: ' + error.message));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-20"><div className="spinner"></div></div>;
  }
  
  if (error) {
    return <p className="text-red-500">Error fetching attendance data: {error.message}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 md:p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Admin Attendance Records</h2>

      {/* Search Box for Date */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between space-x-4">
        <label htmlFor="searchDate" className="text-lg text-gray-700">Search by Date:</label>
        <input
          id="searchDate"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">No records found for this date.</td>
              </tr>
            ) : (
              filteredAttendance.map(record => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">{record.userName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                    {new Date(record.date).toLocaleTimeString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">{record.status || 'Absent'}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                    <button
                      onClick={() => handleStatusChange(record._id, record.status, record.date, record.user)}
                      className={`px-4 py-2 rounded-lg text-white ${record.status === 'Present' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      {record.status === 'Present' ? 'Mark Absent' : 'Mark Present'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendanceTable;
