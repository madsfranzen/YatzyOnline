export async function SignUp(prevState, formData) {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData passed to SignUp");
    return { success: false, error: "Invalid form data" };
  }

  const username = formData.get("username");
  const password = formData.get("password");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    console.log("Creating a new user with username:", username);
    const res = await fetch(BACKEND_URL + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Error in Creating a User, Username is Taken",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Signup error:", err);
    return { success: false, error: "Unexpected error. Please try again." };
  }
}
