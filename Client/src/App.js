import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // State for user info

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Assuming you have a way to verify token (e.g., a token validation endpoint)
      // Set the user data based on the token or just set the token as logged in
      setUser({ name: "Token" }); // You can also decode the token if it contains user info
    }
  }, []); // Empty dependency array ensures this runs only on mount (initial load)

  const handleLoginSuccess = (data) => {
    // Handle login success
    setUser({ name: data.name });
    localStorage.setItem("token", data.token); // Store the token
  };

  return (
    <Router>
      <div>
        <Navbar user={user} onLogin={() => {}} /> {/* Your Navbar here */}
        <Routes>
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
