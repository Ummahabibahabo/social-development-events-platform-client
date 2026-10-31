
"use client";

import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setPassword(value);

    if (!/[A-Z]/.test(value)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(value)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <form className="w-full max-w-md">
        <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">

          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-black">
              Create Account
            </h1>
            <p className=" text-[16px] text-gray-500 mt-2">
              Register to get started with us!
            </p>
          </div>

          {/* Name */}
          <label className="label font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />

          {/* Email */}
          <label className="label font-medium mt-3">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />

          {/* Photo URL */}
          <label className="label font-medium mt-3">Photo URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter your photo URL"
          />

          {/* Password */}
          <label className="label font-medium mt-3">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          {/* Password Warning */}
          {passwordError && (
            <p className="text-xs text-red-500 mt-2">
              {passwordError}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={password.length === 0 || passwordError !== ""}
            className="btn bg-cyan-600 w-full mt-6 text-white font-bold"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#15A1BF] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
