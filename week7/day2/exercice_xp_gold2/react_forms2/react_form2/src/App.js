import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      /^\d+$/.test(formData.phone) &&
      /\S+@\S+\.\S+/.test(formData.email)
    ) {
      setSubmitted(true);
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    });
    setSubmitted(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 text-center shadow" style={{ backgroundColor: "#d3d3d3", borderRadius: "40px" }}>
        {!submitted ? (
          <>
            <h1 className="fw-bold mb-4" style={{ color: "#234" }}>Welcome!</h1>
            <p className="mb-4">Please provide your information below.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <h5>{`${formData.lastName}, ${formData.firstName}`}</h5>
            <p>
              {formData.phone} | {formData.email}
            </p>
            <button className="btn btn-outline-dark" onClick={handleReset}>
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
