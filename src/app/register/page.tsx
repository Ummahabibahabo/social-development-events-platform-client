
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const RegisterPage = () => {


  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassWord] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    image: "",
  });

  const handleTroggleBtn = () => {
    setShowPassWord(!showPassword);
  };

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

  const handleRegisterBtn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };
console.log(user)
    const newErrors = {
      name: user.name.trim() ? "" : "Name is required",
      email: user.email.trim() ? "" : "Email is required",
      image: user.image.trim() ? "" : "Photo URL is required",
    };

    setErrors(newErrors);

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.image.trim() ||
      !password
    ) {
      toast.error("Please fill up all fields");
      return;
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

      if (data) {
        console.log(data)
      toast.success("Successful Your Register");
     redirect("/")
    }

    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <form onSubmit={handleRegisterBtn} className="w-full max-w-md">
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
            name="name"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}

          {/* Email */}
          <label className="label font-medium mt-3">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}

          {/* Photo URL */}
          <label className="label font-medium mt-3">Photo URL</label>
          <input
            type="url"
            name="image"
            className="input input-bordered w-full"
            placeholder="Enter your photo URL"
          />
          {errors.image && (
            <p className="text-xs text-red-500 mt-1">{errors.image}</p>
          )}

          {/* Password */}
          <label className="label font-medium mt-3">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />

            <button
              type="button"
              onClick={handleTroggleBtn}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <FaEye className="text-2xl" />
              ) : (
                <FaEyeSlash className="text-2xl" />
              )}
            </button>
          </div>

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
