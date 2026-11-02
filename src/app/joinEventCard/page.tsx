
"use client";

import { EventTypeData } from "@/components/types";
import {
  MdArrowForward,
  MdCalendarMonth,
  MdCheckCircle,
  MdVolunteerActivism,
  MdPerson,
  MdEmail,
  MdPhone,
  MdEditNote,
} from "react-icons/md";

import { authClient } from "../lib/auth-client";

interface JointEventPageProps {
  getSingleData: EventTypeData;
  date:string
  
}

const JointEventPage = ({
  getSingleData,date
}: JointEventPageProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleJoinEvent = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentUser = Object.fromEntries(formData.entries())
    const joiningDate = new Date();
    const joinEventData = {
  ...currentUser,joiningDate,getSingleData
    }
    console.log(joinEventData)
    const res = await fetch("http://localhost:5000/join-event", {
      method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ joinEventData }),
    })
    const joinData = await res.json();
    console.log(joinData)
 }

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Join Event Form */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">

        {/* Form Header */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#f5fafb] to-[#eaf5f7] p-6 sm:p-8">

          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[20px] border-[#168fa7]/5" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e0f1f4] text-[#168fa7]">
                <MdVolunteerActivism size={27} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#168fa7]">
                  Volunteer Registration
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">
                  Join Event Form
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Please provide your information to become a part of this
              event. Your participation can make a meaningful difference.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleJoinEvent} className="space-y-5 p-6 sm:p-8">

          {/* Full Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdPerson className="text-[#168fa7]" size={19} />
              Full Name
            </label>

            <input
              type="text"
              name="userName"
              defaultValue={user?.name || ""}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#168fa7] focus:bg-white focus:ring-4 focus:ring-[#168fa7]/10"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdEmail className="text-[#168fa7]" size={19} />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#168fa7] focus:bg-white focus:ring-4 focus:ring-[#168fa7]/10"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdPhone className="text-[#168fa7]" size={19} />
              Phone Number
            </label>

            <input
              type="tel"
              name="number"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#168fa7] focus:bg-white focus:ring-4 focus:ring-[#168fa7]/10"
            />
          </div>

          Event Name
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdVolunteerActivism className="text-[#168fa7]" size={19} />
              Event Name
            </label>

            <input
              type="text"
              name="title"
              value={getSingleData.createEventData.title}
              readOnly
              placeholder="Event name"
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-600 outline-none"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdCalendarMonth className="text-[#168fa7]" size={19} />
              Event Date
            </label>

            <input
              type="text"
              name="evenDate"
              value={date}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-600 outline-none"
            />
          </div>

          {/* Why Do You Want to Join */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
              <MdEditNote className="text-[#168fa7]" size={21} />
              Why Do You Want to Join?
            </label>

            <textarea
              rows={4}
              name="description"
              placeholder="Tell us why you are interested in joining this event..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#168fa7] focus:bg-white focus:ring-4 focus:ring-[#168fa7]/10"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#168fa7] to-[#087d95] px-5 py-4 font-bold text-white shadow-md shadow-[#168fa7]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#168fa7]/25 active:scale-[0.98]"
          >
            <MdCheckCircle size={21} />

           Join Event

            <MdArrowForward
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Footer Note */}
          <div className="flex items-start gap-2 rounded-xl border border-[#dceff2] bg-[#f3fafb] p-4">
            <MdCheckCircle
              size={19}
              className="mt-0.5 shrink-0 text-[#168fa7]"
            />

            <p className="text-xs leading-6 text-slate-500">
              Thank you for your interest! Your participation can make
              a meaningful difference in the community.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default JointEventPage;


