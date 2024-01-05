import React from "react";
import "../style.css";
import Footer from "../components/Footer";


export default function Login_page() {
  return (
    <div className="logpage">

      <div className="header1">
        <img src="./images/eventflow_color.svg" />
      </div>

      <div className="login-container">
        <h2>Login </h2>
        <div className="input-group">
          <label htmlFor="email"><b>Email Address</b></label>
          <input type="email" placeholder="Enter Email" name="email" autocomplete="off" required />
        </div>
        <div className="input-group">
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" autocomplete="off" required />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <div className="register-link">Don't have an account? <a href="/register">Register here</a></div>
      </div>

      <div className="footerpos">
        <Footer />
      </div>
    </div>
  );
}
