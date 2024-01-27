import React from "react";
import "../style.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2024 EVENT FLOW. All rights reserved.</p>
      <a href="/privacy-policy">Privacy Policy</a> |{" "}
      <a href="/terms-of-use">Terms of Use</a>
      <p>
        Contact us:{" "}
        <a href="mailto:eventflow6@gmail.com">eventflow6@gmail.com</a>
      </p>
    </div>
  );
}
