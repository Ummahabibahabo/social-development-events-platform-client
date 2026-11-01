
"use client"
import React from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const CreateEventPage = () => {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("Create Event from", user)
  
  const handleCreateBtn =async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createEventData = Object.fromEntries(formData.entries());
    console.log("Create Event Data", createEventData)
    const res = await fetch("http://localhost:5000/create-event", {
       method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ createEventData }),
    })
    const data = await res.json();
    console.log(data)
    if (data) {
      toast.success("Created Event successful");
      redirect("/upcomingEvents") 
    }
  }
  return (
    <div className=" bg-[#F7FAF8] py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#123D32]">
            Create an Event
          </h1>
          <p className="text-gray-500 mt-3">
            Bring people together and make a positive impact on your community.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">

          <form onSubmit={handleCreateBtn} className="space-y-6">

            {/* Event Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter your event title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32] focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Event Type
                </label>
                <select
                  name="type"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white text-gray-500 focus:border-[#123D32]"
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
                <label className="block text-gray-700 font-semibold mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32] focus:ring-1 focus:ring-[#123D32]"
                />
              </div>

            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Event Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter event location"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32] focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#123D32] focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Event Description
              </label>
              <textarea
                rows={5}
                placeholder="Describe your event..."
                name="description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#123D32] focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            {/* Organizer Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Organizer Email
              </label>
              <input
                type="email"
                name="email"
                readOnly
                value={user?.email}
                placeholder="Your logged-in email will appear here"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              
              <p className="text-xs text-gray-400 mt-2">
                Your login email will be automatically associated with this event.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#123D32] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1B5948] transition duration-300 shadow-md"
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
