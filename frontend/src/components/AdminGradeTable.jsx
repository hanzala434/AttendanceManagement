import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGrades, reset } from '../features/grade/gradeSlice';

const AdminGradeTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { grades, isLoading, error } = useSelector((state) => state.grade);

  useEffect(() => {
    dispatch(getAllGrades());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading grade data...</p>;
  }

  if (error) {
    return <p>Error fetching grade data: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Grades Records</h2>
      
      {/* Responsive Table (Cards for small screens) */}
      <div className="w-full overflow-x-auto">
        {grades.length === 0 ? (
          <p className="text-center py-4 text-gray-600">No grade records found.</p>
        ) : (
          grades.map((record) => (
            <div
              key={record._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50"
            >
              <div className="flex-1">
                <strong className="text-gray-800">Name:</strong> {record.userName}
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">Percentage:</strong> {record.attendancePercentage}%
              </div>
              <div className="flex-1">
                <strong className="text-gray-800">Grade:</strong> {record.grade}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminGradeTable;
