
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ConferenceRooms from "./pages/ConferenceRooms";
import Analytics from "./pages/Analytics";
import Overview from "./pages/Overview ";
import Settings from "./pages/Settings";
import Attendees from "./pages/Atendees";
import Sidebar from "./components/Sidebar";
import Login_page from "./pages/Login_page";


export default function App() {
    return (
        <Router>
            <div className="App">

                <Sidebar />
                <Routes>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/" element={<Login_page />} />
                    <Route path="/ConferenceRooms" element={<ConferenceRooms />} />
                    <Route path="/Analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/Attendees" element={<Attendees />} />
                    <Route path="/Overview" element={<Overview />} />
                </Routes>
            </div>
        </Router>
    );
}


