import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // State for user info

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Simulating a logged-in user, you can also decode the token if it contains user info
      setUser({ name: "Token" });
    }
  }, []); // Empty dependency array ensures this runs only on mount (initial load)

  const handleLoginSuccess = (data) => {
    // Handle login success
    setUser({ name: data.name });
    localStorage.setItem("token", data.token); // Store the token
  };

  const handleLogout = () => {
    // Clear user data from state and remove token from localStorage
    setUser(null);
    localStorage.removeItem("token");

    // Optionally, you can redirect to login page after logout
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <Navbar user={user} onLogout={handleLogout} />{" "}
        {/* Pass handleLogout to Navbar */}
        <Routes>
          <Route path="/play" element={<GamePage />} />
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
