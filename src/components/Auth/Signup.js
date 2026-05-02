import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.agree;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Account Created Successfully!");
      // Firebase Auth integration হবে পরে
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="signup-box p-4 rounded shadow">
        <h2 className="text-center mb-4">Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="agree"
              className="form-check-input"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label className="form-check-label">
              I agree to the Terms & Condition
            </label>
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill"
            style={{
              backgroundColor: isFormValid ? "orange" : "#ffcc99",
              color: "white",
            }}
            disabled={!isFormValid}
          >
            Create An Account
          </button>
        </form>

        <div className="text-center mt-3">Or signup with</div>
        <div className="d-flex justify-content-center mt-2">
          <div className="social-btn">
            <img src="/facebook.png" alt="Facebook" />
          </div>
          <div className="social-btn">
            <img src="/google.png" alt="Google" />
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
