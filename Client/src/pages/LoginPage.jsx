import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Container, Box, TextField, Button, Alert } from "@mui/material";
import { login } from "../services/authService"; // Import the login function

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // // FOR TESTING
    // onLoginSuccess({name: 'Mads'})

    const handleLogin = async () => {
      const result = await login(username, password); // Use the login function from authService

      if (result.success) {
        onLoginSuccess(result.data); // Pass the user data to the parent (App.js)
        console.log(result.data);
      } else {
        setError(result.message); // Display error message
      }
    };

    //     try {
    //       const response = await fetch(BACKEND_URL + "/auth/login", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ username, password }),
    //       });

    //       if (response.ok) {
    //         const data = await response.json();
    //         onLoginSuccess(data); // Pass the user data to the parent (App.js)
    //         console.log(data);
    //       } else {
    //         setError("Invalid credentials");
    //       }
    //     } catch (err) {
    //       setError("Error logging in");
    //     }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "65vh", // Center vertically
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
        width="100%"
        maxWidth="400px" // Ensure the Box doesn't stretch beyond 400px
        m={2}
        p={3}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          LOG IN
        </Typography>

        {/* Display error message if any */}
        {error && <Alert severity="error">{error}</Alert>}

        <passwordEncrypt />

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
