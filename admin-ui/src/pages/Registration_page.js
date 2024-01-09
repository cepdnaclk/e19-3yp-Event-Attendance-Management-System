import React from 'react';
import "../style.css";
import Footer from "../components/Footer";


export default function Registration_page() {
    return (


        <div className="registration-form">

            <div className="header1">
                <img src="./images/eventflow_color.svg" alt=""/>
            </div>

            <div className="form-container">
                <h2>User Registration</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" autocomplete="off" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" autocomplete="off" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Gmail:</label>
                        <input type="email" id="email" name="email" autocomplete="off" required />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/">Login here</a>
                </div>
            </div>
            <div className="footerpos2">
                <Footer />
            </div>
        </div>
    )
}

