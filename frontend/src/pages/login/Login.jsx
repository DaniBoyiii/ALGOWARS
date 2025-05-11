import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import wave from "../../images/wave.png";
import join from "../../images/bg.svg";
import "./Login.css";
import Header from "../../components/header/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleLogin = (e, isAdmin) => {
    e.preventDefault();
    const loginUrl = process.env.REACT_APP_BASE_URL + "/api/auth/signin";
    const requestData = isAdmin
      ? { username: adminUsername, password: adminPassword }
      : { username, password };

    fetch(loginUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestData),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((value) => {
        if (value.success) {
          const token = value.token;
          localStorage.setItem("jwtToken", token);
          Cookies.set("tokennew", token);
          Cookies.set("loggedIn", "true");

          const userData = {
            username: isAdmin ? adminUsername : username,
          };
          Cookies.set("userData", JSON.stringify(userData), { expires: 7 }); // 7 days expiry

          setTimeout(() => {
            navigate(isAdmin ? "/home" : "/home");
          }, 1000);
        } else {
          alert(value.message);
        }
      })
      .catch((error) => {
        console.error("Login Error: ", error);
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
              <form onSubmit={(e) => handleLogin(e, isAdminLogin)}>
                <h2 className="title">{isAdminLogin ? "Admin Login" : "User Login"}</h2>

                <div className="inputbox">
                  <input
                    type="text"
                    value={isAdminLogin ? adminUsername : username}
                    onChange={(e) => (isAdminLogin ? setAdminUsername(e.target.value) : setUsername(e.target.value))}
                    required
                  />
                  <label>{isAdminLogin ? "Admin Username" : "Username"}</label>
                </div>

                <div className="inputbox">
                  <input
                    type="password"
                    value={isAdminLogin ? adminPassword : password}
                    onChange={(e) => (isAdminLogin ? setAdminPassword(e.target.value) : setPassword(e.target.value))}
                    required
                  />
                  <label>{isAdminLogin ? "Admin Password" : "Password"}</label>
                </div>

                <input type="submit" className="btn" value={isAdminLogin ? "Login as Admin" : "Login"} />

                <div className="register">
                  {isAdminLogin ? (
                    <p className="one1">
                      Not an admin?{" "}
                      <span className="admin-toggle" onClick={() => setIsAdminLogin(false)}>
                        Go to User Login
                      </span>
                    </p>
                  ) : (
                    <p className="one1">
                      Are you an admin?{" "}
                      <span className="admin-toggle" onClick={() => setIsAdminLogin(true)}>
                        Login as Admin
                      </span>
                    </p>
                  )}
                  <p className="one1">
                    Don't have an account? <Link to="/">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
