"use client";

import React from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getTokenFromServer } from "../lib/getTokenFromServer";

const CreateEventPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log("Create Event from", user);

  const handleCreateBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const createEventData = Object.fromEntries(formData.entries());

    console.log("Create Event Data", createEventData);
    const token = await getTokenFromServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_UTL}/create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ createEventData }),
    });

    const result = await res.json();
    console.log(result);

    if (result) {
      toast.success("Created Event successful");
      router.push("/upcomingEvents");
    }
  };

  return (
    <div className="bg-[#F7FAF8] dark:bg-[#0B1713] py-10 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#123D32] dark:text-white">
            Create an Event
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Bring people together and make a positive impact on your community.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#14251E] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-10">
          <form onSubmit={handleCreateBtn} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter your event title"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-white dark:bg-[#1D3229] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-[#123D32] dark:focus:border-[#C5F2A5] focus:ring-1 focus:ring-[#123D32] dark:focus:ring-[#C5F2A5]"
              />
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                  Event Type
                </label>
                <select
                  name="type"
                  defaultValue=""
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-white dark:bg-[#1D3229] text-gray-700 dark:text-gray-200 focus:border-[#123D32] dark:focus:border-[#C5F2A5]"
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Awareness">Awareness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-white dark:bg-[#1D3229] text-gray-800 dark:text-white focus:border-[#123D32] dark:focus:border-[#C5F2A5]"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Event Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter event location"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-white dark:bg-[#1D3229] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-[#123D32] dark:focus:border-[#C5F2A5] focus:ring-1 focus:ring-[#123D32] dark:focus:ring-[#C5F2A5]"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-white dark:bg-[#1D3229] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-[#123D32] dark:focus:border-[#C5F2A5] focus:ring-1 focus:ring-[#123D32] dark:focus:ring-[#C5F2A5]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Event Description
              </label>
              <textarea
                rows={5}
                placeholder="Describe your event..."
                name="description"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none resize-none bg-white dark:bg-[#1D3229] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-[#123D32] dark:focus:border-[#C5F2A5] focus:ring-1 focus:ring-[#123D32] dark:focus:ring-[#C5F2A5]"
              />
            </div>

            {/* Organizer Email */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Organizer Email
              </label>
              <input
                type="email"
                name="email"
                readOnly
                value={user?.email || ""}
                placeholder="Your logged-in email will appear here"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none bg-gray-100 dark:bg-[#1D3229] text-gray-700 dark:text-gray-300 placeholder:text-gray-400 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Your login email will be automatically associated with this
                event.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#123D32] dark:bg-[#C5F2A5] text-white dark:text-[#123D32] font-semibold py-3.5 rounded-xl hover:bg-[#1B5948] dark:hover:bg-[#A8DE83] transition duration-300 shadow-md"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
