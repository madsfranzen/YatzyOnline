"use server";

export async function Login(formData) {

    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Login function called with username:", username, "and password:", password);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    
    if (!res.ok) {
        throw new Error("Failed to login");
    }
    
    const data = await res.json();

    console.log("Login response data:", data);
    return data;
}
