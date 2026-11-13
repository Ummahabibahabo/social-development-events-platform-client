"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdOutlinePerson,
  MdOutlineEdit,
  MdEventAvailable,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTokenFromServer } from "../lib/getTokenFromServer";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name.trim() || !image.trim()) {
      toast.error("Please fill in both name and profile picture URL");
      return;
    }

    setIsUpdating(true);

    try {
      const token = await getTokenFromServer();

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      if (!user?.email) {
        toast.error("User email not found");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            image: image.trim(),
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Database update failed");
        return;
      }

      if (result.matchedCount === 0) {
        toast.error("User not found in database");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Something went wrong while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-[#123D32]"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-md space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 text-3xl">
          <MdOutlinePerson />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          You are not logged in
        </h2>

        <p className="text-gray-500 text-sm">
          Please log in to your account to view and update your profile details.
        </p>

        <Link
          href="/login"
          className="inline-block bg-[#123D32] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1B5948] transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123D32] dark:text-white">
            My Profile
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
            View and update your personal details
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl p-6 sm:p-10 text-center space-y-6">
          {/* Avatar */}
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32">
            <Avatar className="w-full h-full border-4 border-[#C5F2A5] shadow-lg">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user.image || ""}
                alt={user.name || "User"}
              />

              <AvatarFallback className="bg-emerald-100 text-[#123D32] text-3xl font-extrabold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name & Email */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              {user.email}
            </p>
          </div>

          {/* Edit / View Toggle */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#123D32] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#1B5948] transition shadow-md cursor-pointer"
          >
            <MdOutlineEdit className="text-lg" />
            {isEditing ? "View Profile" : "Update Profile"}
          </button>

          {/* Edit Profile Form */}
          {isEditing && (
            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={user.name || ""}
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-[#15A1BF]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  defaultValue={user.image || ""}
                  placeholder="Enter image URL"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-[#15A1BF]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-[#123D32] text-white py-3 rounded-xl font-semibold hover:bg-[#1B5948] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* Quick Links */}
          <div className="pt-5 border-t border-gray-100 dark:border-gray-800 space-y-2 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Quick Links
            </p>

            <Link
              href="/my-joining-event"
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 hover:text-[#15A1BF] p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <span className="flex items-center gap-2">
                <MdEventAvailable className="text-[#15A1BF] text-lg" />
                My Joining Events
              </span>
              <span>&rarr;</span>
            </Link>

            <Link
              href="/manageEvents"
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 hover:text-[#15A1BF] p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <span className="flex items-center gap-2">
                <MdOutlineCreateNewFolder className="text-[#15A1BF] text-lg" />
                Manage Hosted Events
              </span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
