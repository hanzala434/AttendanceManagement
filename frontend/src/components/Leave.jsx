import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leave = () => {
      const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate=useNavigate()
    
      const handleMarkAttendance = () => {
            navigate('/leave-form')
      }
  return (
    <>
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 m-4">
        <button
          onClick={handleMarkAttendance}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Mark Leave'}
        </button>
        </div>
    </>
  )
}

export default Leave
