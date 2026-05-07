import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";  // ✅ useNavigate import
import { signInWithEmailAndPassword } from "firebase/auth";   // ✅ NEW: Firebase Auth import
import { auth, db } from "../../firebase";// ✅ NEW: Firebase config import

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const isFormValid = formData.email && formData.password;
  const navigate = useNavigate();   // ✅ Navigate hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
      // ✅ NEW: Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // localStorage.setItem("userName", user.email); // localStorage এ save
      
      alert("Login Successful!");
      navigate("/home");   // ✅ Login করলে Home Page এ যাবে
     } catch (error) {
      alert(error.message);
     }
    }
  };

  return (
    <div
      className="login-container d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: 'url("/login-bg.jpg")',   // ✅ public folder থেকে image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="login-box p-4 rounded shadow text-center">
        {/* Welcome Text */}
        <h2 className="welcome-text">Welcome Back!</h2>
        <p className="sub-text">Health & Nutrition Recommender</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <h5 className="mb-3">Login with Email</h5>
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="remember"
                className="form-check-input"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label">Remember me</label>
            </div>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill login-btn"
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#004080" : "#7aa9d6",
              color: "white",
            }}
          >
            Log In
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center mt-3">OR LOGIN WITH</div>
        <div className="d-flex justify-content-center mt-2">
          <div className="social-btn">
            <img src="/facebook.png" alt="Facebook" />
          </div>
          <div className="social-btn">
            <img src="/google.png" alt="Google" />
          </div>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-3">
          Don't have account? <Link to="/signup" className="signup-link">Signup Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
