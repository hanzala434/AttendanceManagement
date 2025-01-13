import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gradeService from './gradeService';

// Initial State
const initialState = {
  grades: [],
  gradeByUser: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create or Update Grade Record
export const updateGrade = createAsyncThunk('grades/update', async ({userId}, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token
    return await gradeService.updateGrade({userId},token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Grade by User ID
export const getGradeByUser = createAsyncThunk('grades/getByUser', async (userId, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token

    return await gradeService.getGradeByUser(userId,token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Grades (Admin Only)
export const getAllGrades = createAsyncThunk('grades/getAll', async (_, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token

    return await gradeService.getAllGrades(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const gradeSlice = createSlice({
  name: 'grades',
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
      .addCase(updateGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.grades.findIndex((grade) => grade.userId === action.payload.userId);
        if (index !== -1) {
          state.grades[index] = action.payload;
        } else {
          state.grades.push(action.payload);
        }
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getGradeByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGradeByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gradeByUser = action.payload;
      })
      .addCase(getGradeByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grades = action.payload;
      })
      .addCase(getAllGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = gradeSlice.actions;
export default gradeSlice.reducer;
