import React, { useState } from "react";
import { useNavigate } from 'react-router'; 
import "../style.css";
import Footer from "../components/Footer";

export default function Login_page() {
  const history = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful! Access Token:", data.accessToken);

        // Redirect to the overview page upon successful login
        history('/Overview'); // Update with the correct path

      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="logpage">

      <div className="header1">
        <img src="./images/eventflow_color.svg" alt="EventFlow Logo" />
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email"><b>Email Address</b></label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="psw"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="register-link">Don't have an account? <a href="/register">Register here</a></div>
      </div>

      <div className="footerpos">
        <Footer />
      </div>
    </div>
  );
}
