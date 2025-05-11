import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [Toggle, ShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwtToken"); // Remove the token when the user logs out
    Cookies.remove("loggedIn");
    Cookies.remove("userData");
    setLoggedIn(false);
    setUsername("");
    console.clear();
    console.log("User logout successful");

    window.location.href = "/home"; // Redirect to home page after logout
  }

  useEffect(() => {
    const isLoggedIn = Cookies.get("loggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
      const userData = Cookies.get("userData");

      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          if (parsedUserData && parsedUserData.username) {
            setUsername(parsedUserData.username);
          } else {
            navigate("/home"); // Fallback if user data is invalid
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          navigate("/home"); // Fallback if parsing fails
        }
      } else {
        navigate("/home"); // Fallback if user data is not found
      }
    }
  }, [navigate]);

  return (
    <header className="header">
      <nav className="nav_container">
        <ul>
          <Link to="/home" className="nav_logo">
            AlgoWars
          </Link>
        </ul>

        <div className={Toggle ? "nav_menu show-menu" : "nav_menu"}>
          <ul className="nav_list grid">
            <li className="nav_item">
              <Link to="/problem" className="nav_link active-link">
                <i className="uil uil-question-circle nav_icon"></i> Problems
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/leaderboard" className="nav_link">
                <i className="uil uil-file-alt nav_icon"></i> Leaderboard
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/profile" className="nav_link">
                <i className="uil uil-user nav_icon"></i> Profile
              </Link>
            </li>

            {/* Add link to Add Problem page */}
            {loggedIn && (
              <li className="nav_item">
                <Link to="/add-problem" className="nav_link">
                  <i className="uil uil-plus nav_icon"></i> Add Problem
                </Link>
              </li>
            )}
          </ul>

          <div className="other-side">
            <ul>
              {loggedIn ? (
                <li>
                  <div
                    className="dropdown"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <span>
                      Hi, {username} <i className="uil uil-angle-down"></i>
                    </span>
                    {showDropdown && (
                      <div className="dropdown-content">
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="nav_link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <i
            className="uil uil-times nav_close"
            onClick={() => ShowMenu(!Toggle)}
          ></i>
        </div>

        <div className="nav_toggle" onClick={() => ShowMenu(!Toggle)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
