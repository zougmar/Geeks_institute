import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

// Async actions
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const res = await axios.post(API_URL, employee);
    return res.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }) => {
    const res = await axios.put(`${API_URL}/${id}`, employee);
    return res.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: { employees: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        );
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
