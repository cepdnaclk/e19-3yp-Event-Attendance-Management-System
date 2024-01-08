import React, { useState } from "react";
import "../style.css";
import Footer from "../components/Footer";

export default function Login_page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // console.log({ email, password });

      const data = await response.json();

      // Assuming the server sends an access token upon successful login
      if (response.ok) {
        // You can store the token in local storage or a global state management solution
        console.log("Login successful! Access Token:", data.accessToken);
      } else {
        // Handle login failure
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
