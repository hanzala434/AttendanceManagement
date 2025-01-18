import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import attendanceReducer from '../features/attendance/attendanceSlice'
import leaveReducer from '../features/leave/leaveSlice'
import gradeReducer from '../features/grade/gradeSlice'

export const store = configureStore({
    reducer: {
       auth:authReducer,
       attendance:attendanceReducer,
       leave:leaveReducer,
       grade:gradeReducer

    },
  })