import { useEffect, useState } from "react";
import VideoIntro from "./components/VideoIntro";
import MainSection from "./components/MainSection";

// Main App component
function App() {
  // State to track whether the tag is scanned
  const [isScanned, setIsScanned] = useState(false);

  // useEffect to simulate a delay (10 seconds) and update isScanned
  useEffect(() => {
    // Simulate a delay using setTimeout
    setTimeout(() => {
      // Set isScanned to true after the delay
      setIsScanned(true);
    }, 1000); // 1 seconds delay
  }, [isScanned]); // useEffect will re-run when isScanned changes

  // Conditional rendering based on the isScanned state
  // If scanned, render the MainSection component, otherwise render VideoIntro
  return isScanned ? <MainSection /> : <VideoIntro />;
  // Alternatively, you can unconditionally render MainSection if that's your intent
  // return <MainSection />;
}

// Export the App component as the default export
export default App;
