"use server";
import { cookies } from "next/headers"; // if needed for auth

export async function Login(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      }
    );

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

