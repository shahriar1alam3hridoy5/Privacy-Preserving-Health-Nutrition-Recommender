import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate import
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // ✅ navigate hook

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userName"); // ✅ userName clear হবে
    alert("You have been logged out!");   // ✅ message দেখাবে
    navigate("/");                        // ✅ Login page এ redirect হবে
  };

  return (
    <div className="navbar-container">
      {/* First Row: Project Logo + Name + Logout */}
      <div className="navbar-top d-flex justify-content-between align-items-center px-4">
        <div className="d-flex align-items-center">
          <img
            src="/logos/main-logo.png"   // ✅ Project Logo → public/logos/main-logo.png
            alt="Logo"
            width="50"
            height="50"
            className="me-2"
          />
          <span className="project-name">Health & Nutrition Recommender</span>
        </div>
        {/* ✅ এখানে Logout button এ handleLogout ব্যবহার করতে হবে */}
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Second Row: Navigation Links */}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <img src="/logos/home.png" alt="Home" width="25" className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/diet">
                <img src="/logos/diet.png" alt="Diet Plan" width="25" className="me-2" /> Diet Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exercise">
                <img src="/logos/exercise.png" alt="Exercise Plan" width="25" className="me-2" /> Exercise Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatbot">
                <img src="/logos/chatbot.png" alt="Chatbot" width="25" className="me-2" /> Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <img src="/logos/profile.png" alt="Profile" width="25" className="me-2" /> Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
