
"use client";

import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length === 0) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back!
          </h1>
          <p className="mt-2 text-gray-500">
            Sign in to make a difference in your community.
          </p>
        </div>

        {/* Login Form */}
        <form>
          <fieldset className="fieldset bg-white shadow-xl border border-gray-200 rounded-2xl p-6 sm:p-8">

            {/* Email */}
            <label className="label font-bold text-gray-700 text-sm">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="input w-full bg-gray-50 border-gray-300 focus:outline-cyan-500 rounded-lg"
              placeholder="Enter your email"
              required
            />

            {emailError && (
              <p className="text-xs text-red-500 mt-1">
                {emailError}
              </p>
            )}

            {/* Password */}
            <label className="label font-bold text-gray-700 text-sm mt-3">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="input w-full bg-gray-50 border-gray-300 focus:outline-cyan-500 rounded-lg"
              placeholder="Enter your password"
              required
            />

            {passwordError && (
              <p className="text-xs text-red-500 mt-1">
                {passwordError}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={!email || !password || !!emailError || !!passwordError}
              className="btn w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white border-none rounded-lg text-base"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm text-gray-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="btn w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.2 13.22l7.98 6.19C13.08 13.72 18.1 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.44-4.1 7.14-10.15 7.14-17.56z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.18 28.59A14.4 14.4 0 0 1 10.4 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 3.18 10.78l7.99-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-5.9 0-10.92-4.22-12.82-9.87l-7.99 6.19C6.51 43.62 14.62 48 24 48z"
                />
              </svg>

              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-cyan-600 hover:text-cyan-700 hover:underline"
              >
                Register
              </Link>
            </p>

          </fieldset>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
