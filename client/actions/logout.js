// utils/logout.js
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function logout() {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      // Handle successful logout (you can redirect or reload)
      location.reload();
    } else {
      console.error("Logout failed:", response.statusText);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
}

