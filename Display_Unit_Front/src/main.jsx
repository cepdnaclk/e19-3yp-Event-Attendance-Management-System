// Import React and ReactDOM from the necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component and the associated CSS file
import App from './App.jsx';
import './index.css';

// Use createRoot to create a root React rendering container
// and render the App component inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  // Use React.StrictMode to enable additional runtime checks for potential issues
  <React.StrictMode>
    {/* Render the main App component */}
    <App />
  </React.StrictMode>,
);
