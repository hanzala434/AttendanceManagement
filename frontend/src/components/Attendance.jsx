import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAttendance } from '../features/attendance/attendanceSlice'; // Adjust the import path as needed
import Leave from './Leave';
import { updateGrade } from '../features/grade/gradeSlice';

const Attendance = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.user?._id);

  const { attendance } = useSelector((state) => state.attendance);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceTime, setAttendanceTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check localStorage for saved attendance status and time
    const savedTime = localStorage.getItem('attendanceTime');
    if (savedTime) {
      const savedDate = new Date(savedTime);
      const now = new Date();
      const diffInHours = (now - savedDate) / (1000 * 60 * 60);

      if (diffInHours ==0) {
        setAttendanceMarked(true);
        setAttendanceTime(savedDate);
      } else {
        localStorage.removeItem('attendanceTime'); // Reset if 12 hours have passed
      }
    }
  }, [user]);

  const handleMarkAttendance = () => {
    if (!user) {
      alert('User not logged in');
      return;
    }

    setIsSubmitting(true);
    
    // Prepare the attendance data
    const attendanceData = {
      user: user._id, // Assuming `user` has an `id` field
      date: new Date().toISOString(),
      status: 'Present', // Or any status you want to set
    };

    // Dispatch the createAttendance action

    dispatch(createAttendance(attendanceData))
      .unwrap() // Unwraps the result for direct handling of success or error
      .then((response) => {
        const now = new Date();
        setAttendanceMarked(true);
        setAttendanceTime(now);
        localStorage.setItem('attendanceTime', now.toISOString()); // Save timestamp
        setIsSubmitting(false);
      })
      .catch((error) => {
        alert('Failed to mark attendance: ' + error.message);
        setIsSubmitting(false);
      });
      dispatch(updateGrade({userId}))

      console.log(userId)
      console.log(attendanceData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 m-4">
      {!attendanceMarked ? (
        <>
        <button
          onClick={handleMarkAttendance}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Mark Attendance'}
        </button>
        </>
      ) : (
        <p
          className="text-green-600 text-xl mt-4 transition-all duration-500 transform"
          style={{ opacity: isSubmitting ? 0 : 1 }}
        >
          Your attendance has been marked for {attendanceTime.toLocaleDateString()} at {attendanceTime.toLocaleTimeString()}.
        </p>
      )}
    </div>
  );
};

export default Attendance;
