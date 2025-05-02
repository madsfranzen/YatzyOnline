import bcrypt from "bcryptjs";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function checkLogin() {
  const response = await fetch(BACKEND_URL + "/auth/login", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  if (response.status != 200) {
    return false;
  }
  const player = await response.json();
  return player;
}

// Function to handle user signup
export async function signUp(username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const response = await fetch(`${BACKEND_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: hashedPassword }),
    });

    if (response.ok) {
      return { success: true, message: "User saved successfully" };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Function to handle user login
export async function login(username, password) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
