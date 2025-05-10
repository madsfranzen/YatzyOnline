"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "@/actions/signup";
import { Login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const initialState = { error: null, success: false };

function Page() {
  const [state, formAction] = useActionState(SignUp, initialState);
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState(null); // Move this inside the component

  useEffect(() => {
    const doLogin = async () => {
      if (state?.success && formData) {
        console.log(formData);
        const loginResult = await Login(formData); // pass formData to login
        if (loginResult?.success) {
          router.push("/"); // or wherever you want to redirect
        }
      }
    };

    doLogin();
  }, [state, formData, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setSignupError(null); // Clear any previous signup error

    // Get FormData from the form element
    const formData = new FormData(e.target);

    // Debug the formData object
    console.log("FormData entries:", Array.from(formData.entries()));

    React.startTransition(async () => {
      try {
        // Call SignUp
        const result = await SignUp(null, formData);
        console.log("Signup Result:", result);

        if (result?.success) {
          // Create a new FormData for Login
          const loginFormData = new FormData();
          loginFormData.append("username", formData.get("username"));
          loginFormData.append("password", formData.get("password"));

          // Call Login
          const loginResult = await Login(null, loginFormData);
          console.log("Login Result:", loginResult);

          if (loginResult?.success) {
            router.push("/"); // Redirect to dashboard or desired page
          } else {
            console.log("Login failed:", loginResult?.error || "Unknown error");
          }
        } else {
          console.log("Signup failed:", result?.error || "Unknown error");
          setSignupError(result?.error || "Unknown error"); // Set the error message
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setSignupError("An unexpected error occurred. Please try again."); // Handle unexpected errors
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div>
            <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>

          {state.error && (
            <div className="text-red-600 text-sm text-center">
              {state.error}
            </div>
          )}

          {passwordError && (
            <div className="text-red-600 text-sm text-center">
              {passwordError}
            </div>
          )}

          {signupError && (
            <div className="text-red-600 text-sm text-center">
              {signupError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordCheck">Confirm Password</Label>
              <Input
                id="passwordCheck"
                name="passwordCheck"
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-900"
              disabled={state.pending}
            >
              {state.pending ? "Creating account..." : "Sign up"}
            </Button>
            <Button
              type="button"
              className="w-full"
              disabled={state.pending}
              onClick={() => router.push("/login")}
            >
              {state.pending ? "Back to log in..." : "Back to Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
