import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "./employeeSlice";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Position</th>
            <th className="border px-2">Department</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border px-2">{emp.name}</td>
              <td className="border px-2">{emp.email}</td>
              <td className="border px-2">{emp.position}</td>
              <td className="border px-2">{emp.department}</td>
              <td className="border px-2">{emp.status}</td>
              <td className="border px-2">
                <button
                  onClick={() => dispatch(deleteEmployee(emp._id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
