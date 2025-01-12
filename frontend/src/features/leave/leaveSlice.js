import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaveService from './leaveService';

// Initial State
const initialState = {
  leaveRequests: [],
  leaveRequest: null,
  leaveRequestsByUser: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create Leave Request
export const createLeave = createAsyncThunk('leave/create', async (leaveData, thunkAPI) => {
  try {
    return await leaveService.createLeaveRequest(leaveData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Leave Requests by User ID
export const getLeaveRequestsByUser = createAsyncThunk('leave/getByUser', async (userId, thunkAPI) => {
  try {
    return await leaveService.getLeaveRequestsByUser(userId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Leave Request Status
export const updateLeaveStatus = createAsyncThunk('leave/update', async ({ id, status }, thunkAPI) => {
  try {
    return await leaveService.updateLeaveRequestStatus(id, status);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Leave Request
export const deleteLeaveRequest = createAsyncThunk('leave/delete', async (id, thunkAPI) => {
  try {
    return await leaveService.deleteLeaveRequest(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Leave Requests (for Admin)
export const getAllLeaveRequests = createAsyncThunk('leave/getAll', async (_, thunkAPI) => {
  try {
    return await leaveService.getAllLeaveRequests();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Thunk to get a single leave request by ID
export const getLeaveRequestById = createAsyncThunk(
  'leave/getLeaveRequestById',
  async (id, thunkAPI) => {
    try {
      return await leaveService.getLeaveRequestById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const leaveSlice = createSlice({
  name: 'leave',
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
      .addCase(createLeave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaveRequests.push(action.payload);
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getLeaveRequestsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaveRequestsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaveRequestsByUser = action.payload;
      })
      .addCase(getLeaveRequestsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateLeaveStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaveRequests = state.leaveRequests.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteLeaveRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLeaveRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaveRequests = state.leaveRequests.filter((item) => item._id !== action.meta.arg);
      })
      .addCase(deleteLeaveRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllLeaveRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLeaveRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaveRequests = action.payload;
      })
      .addCase(getAllLeaveRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getLeaveRequestById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLeaveRequestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaveRequest = action.payload;
      })
      .addCase(getLeaveRequestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = leaveSlice.actions;
export default leaveSlice.reducer;
