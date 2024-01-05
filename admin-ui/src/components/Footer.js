import React from "react";
import "../style.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2024 EVENTFLOW. All rights reserved.</p>
      <a href="/privacy-policy">Privacy Policy</a> |{" "}
      <a href="/terms-of-use">Terms of Use</a>
      <p>
        Contact us:{" "}
        <a href="mailto:e19004@eng.pdn.ac.lk">e19004@eng.pdn.ac.lk"</a>
      </p>
    </div>
  );
}
