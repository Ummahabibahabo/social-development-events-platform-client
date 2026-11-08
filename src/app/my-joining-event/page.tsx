
import { headers } from "next/headers";
import { auth } from "../lib/auth";
import Image from "next/image";

import {
  MdCalendarMonth,
  MdCancel,
  MdVisibility,
  MdLocationOn,
  MdEditNote,
} from "react-icons/md";

const MyJoiningEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const res = await fetch(
    `http://localhost:5000/join-event/${encodeURIComponent(email || "")}`,
    {
      cache: "no-store",
    }
  );

  const myJoinEventData = await res.json();

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#15A1BF] mb-2">
            YOUR ACTIVITIES
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#123D32]">
            My Joined Events
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and view all the events you have joined.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Joined Events
          </h2>

          <span className="px-4 py-1.5 bg-[#C5F2A5] text-[#123D32] rounded-full text-sm font-bold">
            {myJoinEventData.length} Events
          </span>
        </div>

        {/* Joined Events List */}
        <div className="space-y-5">

          {myJoinEventData.length > 0 ? (
            myJoinEventData.map((item: any) => (

              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >

                {/* 1. Image Section */}
                <div className="relative w-full md:w-60 h-56 md:h-52 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                  <Image
                    src={item.data.createEventData.image}
                    alt={item.data.createEventData.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="object-contain rounded-xl"
                  />

                </div>

                {/* 2. Event Information Section */}
                <div className="flex-1 w-full flex flex-col justify-center items-center text-center space-y-3">

                  <p className="text-sm font-semibold text-[#15A1BF]">
                    Joined Event
                  </p>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {item.data.createEventData.title}
                  </h2>

                  {/* Status and Date */}
                  <div className="flex flex-wrap items-center justify-center gap-3">

                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Registered
                    </span>

                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MdCalendarMonth className="text-lg" />
                      {item.data.createEventData.date}
                    </span>

                  </div>

                  {/* Location */}
                  <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
                    <MdLocationOn className="text-lg shrink-0" />
                    {item.data.createEventData.location}
                  </p>

                  {/* Join Description */}
                  <div className="w-full bg-gray-50 rounded-lg p-4">

                    <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                      <MdEditNote className="text-lg text-[#15A1BF]" />
                      Why I Want to Join
                    </p>

                    <p className="text-sm text-gray-500 leading-relaxed text-center">
                      {item.data.joinDescription.description}
                    </p>

                  </div>

                </div>

                {/* 3. Action Buttons Section */}
                <div className="flex w-full md:w-auto md:flex-col justify-center items-center gap-3 shrink-0">

                  <button className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition">
                    <MdCancel className="text-lg" />
                    Cancel
                  </button>

                  <button className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#123D32] text-white font-semibold hover:bg-[#1b5948] transition">
                    <MdVisibility className="text-lg" />
                    View Event
                  </button>

                </div>

              </div>

            ))
          ) : (

            /* Empty State */
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">

              <div className="text-5xl mb-4">
                📅
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                No Joined Events Yet!
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't joined any events yet.
              </p>

            </div>

          )}

        </div>
      </div>
    </section>
  );
};

export default MyJoiningEvent;
