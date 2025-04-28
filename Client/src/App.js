import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // State for user info

  const handleLoginSuccess = (data) => {
    // Handle login success
    setUser({ name: data.name });
    localStorage.setItem("token", data.token); // Store the token if needed
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
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
