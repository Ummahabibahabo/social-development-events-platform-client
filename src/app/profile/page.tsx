"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdOutlinePerson,
  MdOutlineMail,
  MdOutlinePhotoCamera,
  MdOutlineEdit,
  MdEventAvailable,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name.trim() || !image.trim()) {
      toast.error("Please fill in both name and profile picture URL");
      return;
    }

    // 1. Update Better-Auth user
    const { data, error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim(),
    });

    // 2. Update Express server database
    if (user?.email) {
      await fetch(`http://localhost:5000/update-profile/${user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          image: image.trim(),
        }),
      });
    }

    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
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
      <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-md space-y-4">
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
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123D32]">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          View and update your personal details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 text-center space-y-5">
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
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            </div>

            {/* Edit / View Toggle Button */}
            <div>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#123D32] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#1B5948] transition shadow-md cursor-pointer"
              >
                <MdOutlineEdit className="text-lg" />
                {isEditing ? "View Profile" : "Update Profile"}
              </button>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Quick Links
              </p>
              <Link
                href="/my-joining-event"
                className="flex items-center justify-between text-sm text-gray-700 hover:text-[#15A1BF] p-2 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-2">
                  <MdEventAvailable className="text-[#15A1BF]" />
                  My Joining Events
                </span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/manageEvents"
                className="flex items-center justify-between text-sm text-gray-700 hover:text-[#15A1BF] p-2 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-2">
                  <MdOutlineCreateNewFolder className="text-[#15A1BF]" />
                  Manage Hosted Events
                </span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: View or Update Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8">
            {!isEditing ? (
              /* VIEW PROFILE */
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#123D32]">
                    Profile Information
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm font-semibold text-[#15A1BF] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#123D32] shadow-xs">
                      <MdOutlinePerson className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase">
                        Full Name
                      </p>
                      <p className="text-base font-bold text-gray-800">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#15A1BF] shadow-xs">
                      <MdOutlineMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase">
                        Email Address
                      </p>
                      <p className="text-base font-bold text-gray-800">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile Image URL */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-xs">
                      <MdOutlinePhotoCamera className="text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase">
                        Profile Picture URL
                      </p>
                      <p className="text-xs font-mono text-gray-600 truncate mt-1">
                        {user.image || "No picture URL"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* UPDATE PROFILE FORM */
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-[#123D32]">
                    Update Profile
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    Update your name and profile picture
                  </p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name || ""}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32]"
                  />
                </div>

                {/* Photo URL Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={user.image || ""}
                    placeholder="Enter image URL"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32]"
                  />
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={user.email || ""}
                    className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-xl px-4 py-3 outline-none cursor-not-allowed"
                  />
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#123D32] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1B5948] transition cursor-pointer"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 text-gray-700 font-semibold py-3 px-5 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
