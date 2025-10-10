import React from "react";

const EmployeeCard = ({ employee, onToggleStatus, onDelete }) => {
  return (
    <div className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{employee.name}</h3>
        <p>{employee.position} - {employee.department}</p>
        <p>Status: <span className={employee.status === "Active" ? "text-green-600" : "text-red-600"}>{employee.status}</span></p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onToggleStatus(employee._id, employee)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Toggle</button>
        <button onClick={() => onDelete(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
