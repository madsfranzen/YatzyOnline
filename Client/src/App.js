import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import "./App.css";

function App() {

  const handleLoginSuccess = (data) => {
		// TODO: Implement
  };

  const handleLogout = () => {
		// TODO: Implement
  };

  return (
    <Router>
      <div>
        <Navbar onLogout={handleLogout} />{" "}
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
