import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance, reset, updateAttendance } from '../features/attendance/attendanceSlice'; 

const AdminAttendanceTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { attendance, isLoading, error } = useSelector((state) => state.attendance);
  
  const [searchDate, setSearchDate] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    dispatch(getAllAttendance());
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (attendance) {
      if (searchDate) {
        const filtered = attendance.filter((record) => {
          return new Date(record.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString();
        });
        setFilteredAttendance(filtered);
      } else {
        setFilteredAttendance(attendance);
      }
    }
  }, [attendance, searchDate]);

  const handleStatusChange = (recordId, currentStatus,date) => {
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    const attendanceData = { status: newStatus, date };

    console.log(recordId)
    dispatch(updateAttendance({ recordId, attendanceData }))
      .unwrap()
      .catch((error) => {
        alert('Failed to update status: ' + error.message);
      });
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  if (isLoading) {
    return <p>Loading attendance data...</p>;
  }

  if (error) {
    return <p>Error fetching attendance data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Attendance Records</h2>
      
      {/* Search Box for Date */}
      <div className="mb-4">
        <label className="mr-2">Search by Date:</label>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchDateChange}
          className="border border-gray-300 px-4 py-2"
        />
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No records found for this date.</td>
            </tr>
          ) : (
            filteredAttendance.map((record) => {
              const status = record.status || 'Absent'; // Default to 'Absent' if no status
              return (
                <tr key={record._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{record.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(record.date).toLocaleTimeString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(record._id, status,record.date)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      {status === 'Present' ? 'Absent' : 'Present'}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAttendanceTable;
