import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employees/employeeSlice";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    status: "Active"
  });
  const dispatch = useDispatch();

  const handleChange = e => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!employee.name || !employee.email) return;
    dispatch(addEmployee(employee));
    setEmployee({ name: "", email: "", position: "", department: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="email" placeholder="Email" value={employee.email} onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="position" placeholder="Position" value={employee.position} onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="department" placeholder="Department" value={employee.department} onChange={handleChange} className="border p-2 rounded w-full" />
        <select name="status" value={employee.status} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
