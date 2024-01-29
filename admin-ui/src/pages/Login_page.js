import React, { useState } from "react";
import { useNavigate } from 'react-router';
import "../style.css";
import Footer from "../components/Footer";
import axios from "axios";

// 3.110.135.90

export default function Login_page({ onLogin }) {
  // const history = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Send a request to your authentication endpoint using Axios
    axios
      .post("http://localhost:5001/api/users/login", { email, password })
      .then((response) => {
        // console.log(onLogin);
        if (onLogin) {
          onLogin(response.data.accessToken);
          // Pass email to the Profile page
          navigate('/Profile', { state: { email } });
          
          navigate('/ConferenceRooms');
        }
      })
      .catch((error) => {
        // Handle authentication error
        // console.error("Authentication failed", error);
      });
  };

  return (
    <>
      <div className="logpage">
        <div className="header1">
          <img src="./images/eventflow_color.svg" alt="" />
        </div>

        <div className="login-container">
          <h2>Login </h2>
          <div className="input-group">
            <label htmlFor="email">
              <b>Email Address</b>
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              name="email"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="pl"
              type="password"
              value={password}
              placeholder="Enter Password"
              name="psw"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="register-link">
            Don't have an account? <a href="/register">Register here</a>
          </div>
        </div>

        <div className="footerpos">
          <Footer />
        </div>
      </div>
    </>
  );
}
