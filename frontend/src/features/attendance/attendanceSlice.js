import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from './attendanceService';

// Initial State
const initialState = {
  attendance: [],
  attendanceByUser: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create Attendance Record
export const createAttendance = createAsyncThunk('attendance/create', async (attendanceData, thunkAPI) => {
  try {
    return await attendanceService.createAttendance(attendanceData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Attendance by User ID
export const getAttendanceByUser = createAsyncThunk('attendance/getByUser', async (userId, thunkAPI) => {
  try {
    return await attendanceService.getAttendanceByUser(userId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Attendance Record
export const updateAttendance = createAsyncThunk('attendance/update', async ({ recordId, attendanceData }, thunkAPI) => {
  try {
    return await attendanceService.updateAttendance(recordId, attendanceData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Attendance Record
export const deleteAttendance = createAsyncThunk('attendance/delete', async (id, thunkAPI) => {
  try {
    return await attendanceService.deleteAttendance(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Attendance Records (for Admin)
export const getAllAttendance = createAsyncThunk('attendance/getAll', async (_, thunkAPI) => {
  try {
    return await attendanceService.getAllAttendance();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendance.push(action.payload);
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAttendanceByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceByUser = action.payload;
      })
      .addCase(getAttendanceByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendance = state.attendance.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendance = state.attendance.filter((item) => item._id !== action.meta.arg);
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendance = action.payload;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;
