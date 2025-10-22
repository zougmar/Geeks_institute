import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions (simulate delay)
export const ageUpAsync = createAsyncThunk(
  'age/ageUpAsync',
  async (_, { rejectWithValue }) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), 1000); // Simulate async delay
    });
  }
);

export const ageDownAsync = createAsyncThunk(
  'age/ageDownAsync',
  async (_, { rejectWithValue }) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(-1), 1000);
    });
  }
);

const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 20,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.age += action.payload;
        state.loading = false;
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.age += action.payload;
        state.loading = false;
      });
  },
});

export default ageSlice.reducer;
