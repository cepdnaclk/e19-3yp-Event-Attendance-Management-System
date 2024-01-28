
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConferenceRooms from "./pages/ConferenceRooms";
import Analytics from "./pages/Analytics";
import Overview from "./pages/Overview ";
import Attendees from "./pages/Attendees";
import LoginPage from "./pages/Login_page";
import RegistrationPage from "./pages/Registration_page";
import Sidebar from "./components/Sidebar";
import ContactUs from "./pages/ContactUs";

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already authenticated on page load
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // Validate the token on the server
            axios.get('http://localhost:5001/api/users/current')
                .then(response => {
                    setUser({ isAuthenticated: true, username: response.data.name });
                })
                .catch(error => {
                    console.error('Token validation failed', error);


              // If the token is expired or invalid, redirect to the login page
              setUser({ isAuthenticated: false });
            });
        }
    }, []);

    const handleLogin = (accessToken) => {
        // Save the JWT token in local storage or cookies
        localStorage.setItem('token', accessToken);
        // Set the user in the state
        setUser({ isAuthenticated: true });
        console.log(user);
    };

    // const handleLogout = () => {
    //     // Remove the JWT token from local storage or cookies
    //     localStorage.removeItem('token');
    //     // Set the user to null
    //     setUser(null);
    // };

    return (
        <Router>
            <div className="App">
                {/* <Sidebar/> */}
                <Routes>
                    {user && user.isAuthenticated ? (
                        <>
                            <Route path="/ConferenceRooms" element={<ConferenceRooms />} />
                            <Route path="/Attendees" element={<Attendees />} />
                            <Route path="/Overview" element={<Overview />} />
                            <Route path="/Analytics" element={<Analytics />} />
                            <Route path="/ContactUs" element={<ContactUs />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <Route path="*" />
                    )}
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}


