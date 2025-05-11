import React, { useState } from "react";
import "./Registration.css";
import wave from "../../images/wave.png";
import join from "../../images/bg.svg";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";

const Registration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [resp, setResp] = useState("");
  const [debugInfo, setDebugInfo] = useState(""); // For debugging

  // Header for the request
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Function to handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    
    // Ensure isAdmin is a boolean true/false value
    const adminValue = isAdmin === true;
    
    // Prepare data to send in the request
    const requestBody = {
      name,
      username,
      email,
      password,
      isAdmin: adminValue, // Make sure it's a proper boolean
    };

    // Show debug info
    setDebugInfo(`Sending request with isAdmin: ${adminValue}`);
    
    // Log the request body for debugging
    console.log("Sending registration data:", requestBody);

    // Send the data to your API for user registration
    fetch(process.env.REACT_APP_BASE_URL + "/api/auth/signup", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        // Log the raw response for debugging
        console.log("Registration response status:", response.status);
        return response.json();
      })
      .then((value) => {
        console.log("Registration response data:", value);
        setResp(value.message);
        
        // If we got a user object back, show the isAdmin value
        if (value.user) {
          setDebugInfo(`User created with isAdmin: ${value.user.isAdmin}`);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setResp("Something went wrong. Please try again.");
      });
  };

  return (
    <div>
      <Header />
      <img className="wave" src={wave} alt="wave" />
      <div className="container">
        <div className="img">
          <img src={join} alt="join" />
        </div>
        <div className="login-content">
          <div className="form-box">
            <div className="form-value">
              <form>
                {/* Name Input */}
                <div className="inputbox">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>Name</label>
                </div>

                {/* Username Input */}
                <div className="inputbox">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label>UserName</label>
                </div>

                {/* Email Input */}
                <div className="inputbox">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Email</label>
                </div>

                {/* Password Input */}
                <div className="inputbox">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>Password</label>
                </div>

                {/* Admin Registration Checkbox - With explicit boolean handling */}
                <div className="admin-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        console.log("Admin checkbox changed to:", checked);
                        setIsAdmin(checked);
                      }}
                    />
                    Register as Admin
                  </label>
                </div>

                {/* Debug info - will show the current isAdmin state */}
                {isAdmin && (
                  <div className="debug-info">
                    Admin registration is enabled
                  </div>
                )}

                {/* Submit Button */}
                <input
                  type="submit"
                  onClick={handleClick}
                  className="btn"
                  value="Register"
                />

                {/* Link to Login if user already has an account */}
                <div className="login">
                  <p className="one1">
                    Already have an account? <Link to="/Login">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Display response message */}
          <div className="line">
            <h5 className="response-line">{resp}</h5>
            {debugInfo && <p className="debug-info">{debugInfo}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;