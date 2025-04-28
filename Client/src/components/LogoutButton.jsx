import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For redirecting using React Router
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform the logout request using fetch (GET request to the backend)
      const response = await fetch(BACKEND_URL + '/auth/logout', {
        method: 'GET',
        credentials: 'include', // Make sure cookies (session) are included in the request
      });

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Optionally, remove the token from localStorage or sessionStorage
        localStorage.removeItem('token');

        // Redirect to the login page manually
        navigate('/login');
      } else {
        // Handle any errors from the server
        console.error('Logout failed', await response.json());
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;

