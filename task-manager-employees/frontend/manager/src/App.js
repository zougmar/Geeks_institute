import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "./features/employees/employeeSlice";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./features/employees/EmployeeList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}

export default App;
