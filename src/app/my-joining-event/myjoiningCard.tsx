"use client";

import Image from "next/image";
import {
  MdCalendarMonth,
  MdCancel,
  MdEditNote,
  MdLocationOn,
  MdVisibility,
} from "react-icons/md";
import EmptyMyJoiningEvent from "./emptyMyJoinigEvent";

import Link from "next/link";
import { getTokenFromServer } from "../lib/getTokenFromServer";

import { redirect } from "next/navigation";

interface MyJoiningEventProps {
  myJoinEventData: {
    _id: string;
    data: {
      name: string;
      email: string;
      image: string;

      eventId: string;
      createEventData: {
        title: string;
        type: string;
        date: string;
        location: string;
        image: string;
        description: string;
        email: string;
      };
      joinDescription: {
        description: string;
      };
    };
  }[];
}

const MyJoiningCard = ({ myJoinEventData }: MyJoiningEventProps) => {
  console.log("my joinEvent data", myJoinEventData);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <p className="text-sm font-bold tracking-widest text-[#15A1BF] mb-2">
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
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold text-gray-800">Joined Events</h2>

        <span className="px-4 py-2 bg-[#C5F2A5] text-[#123D32] rounded-full text-sm font-bold">
          {myJoinEventData.length} Events
        </span>
      </div>

      {/* Joined Events List */}
      <div className="space-y-6">
        {myJoinEventData.length > 0 ? (
          myJoinEventData.map((item) => {
            const FormatDate = new Date(
              item.data.createEventData.date,
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            const handleDeleteButton = async () => {
              const token = await getTokenFromServer();

              const res = await fetch(
                `http://localhost:5000/my-join-event/${item._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              const data = await res.json();

              console.log(data);

              if (data) {
                redirect("/my-joining-event");
              }
            };
            return (
              <div
                key={item._id}
                className="group grid grid-cols-1 md:grid-cols-[280px_1fr] items-center gap-6 md:gap-8 p-5 md:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#C5F2A5] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative w-full h-56 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.data.createEventData.image.trim()}
                    alt={item.data.createEventData.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-3 left-3 px-3 py-1.5 text-xs font-bold text-white bg-[#123D32]/90 rounded-full">
                    {item.data.createEventData.type}
                  </span>
                </div>

                {/* Event Information Section */}
                <div className="w-full flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#15A1BF]">
                      Joined Event
                    </p>

                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full">
                      Registered
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-[#123D32] leading-snug">
                    {item.data.createEventData.title}
                  </h2>

                  {/* Date and Location */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MdCalendarMonth className="text-lg text-[#15A1BF]" />
                      {FormatDate}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MdLocationOn className="text-lg text-[#15A1BF] shrink-0" />
                      {item.data.createEventData.location}
                    </span>
                  </div>

                  {/* Join Description */}
                  <div className="bg-[#F7FAF8] border border-gray-100 rounded-xl p-4 mt-1">
                    <p className="flex items-center gap-2 text-sm font-bold text-[#123D32] mb-2">
                      <MdEditNote className="text-xl text-[#15A1BF]" />
                      Why I Want to Join
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.data.joinDescription.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-3 pt-1">
                    <button
                      onClick={handleDeleteButton}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 font-semibold text-sm hover:bg-red-100 transition-colors"
                    >
                      <MdCancel className="text-lg" />
                      Cancel
                    </button>

                    <Link
                      href={` /upcomingEvents/${item.data.eventId}`}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#123D32] text-white font-semibold text-sm hover:bg-[#1b5948] transition-colors"
                    >
                      <MdVisibility className="text-lg" />
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyMyJoiningEvent />
        )}
      </div>
    </div>
  );
};

export default MyJoiningCard;
