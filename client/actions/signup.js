"use client";

export async function SignUp(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(BACKEND_URL + "/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      // const errorText = await res.text();
      return { error: "Invalid username or password." };
    }

    // const data = await res.json();

    // Store token/cookies if needed here (using cookies().set(...))

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Unexpected error. Please try again." };
  }
}
