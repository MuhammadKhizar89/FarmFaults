import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addErrorApiCall, getAllErrorApiCall } from '../../apis/error.api';

export const addError = createAsyncThunk('error/addError', async (body, { rejectWithValue }) => {
  try {
    const response = await addErrorApiCall(body);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAllErrors = createAsyncThunk('error/getAllErrors', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllErrorApiCall();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    errors: [],
    isLoading: false,
    errorMessage: '',
    addErrorResponse: null,
  },
  reducers: {
    clearAddErrorResponse(state) {
      state.addErrorResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addError.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addError.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addErrorResponse = action.payload;
      })
      .addCase(addError.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getAllErrors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllErrors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.data || [];
      })
      .addCase(getAllErrors.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearAddErrorResponse } = errorSlice.actions;
export default errorSlice.reducer;
