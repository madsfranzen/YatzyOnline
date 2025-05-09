"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "@/actions/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const initialState = { error: null };

function Page() {
  const [state, formAction] = useActionState(SignUp, initialState);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (state?.success) {
      if (password !== passwordCheck) {
        setPasswordError("Passwords do not match");
      } else {
        router.push("/");
      }
    }
  }, [state, password, passwordCheck, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    // Wrap formAction in startTransition
    React.startTransition(() => {
      formAction(formData);
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
