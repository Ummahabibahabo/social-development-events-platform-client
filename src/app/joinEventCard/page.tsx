"use client";

import { EventTypeData } from "@/components/types";
import { authClient } from "../lib/auth-client";
import {
  MdArrowForward,
  MdCalendarMonth,
  MdCheckCircle,
  MdEditNote,
  MdEmail,
  MdPerson,
  MdPhone,
  MdVolunteerActivism,
} from "react-icons/md";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
interface JoinEventCardPageProps {
  getSingleData: EventTypeData;
  date?: string;
}

const JoinEventCardPage = ({ getSingleData }: JoinEventCardPageProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!getSingleData?.createEventData) {
    return null;
  }

  const date = new Date(getSingleData.createEventData.date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
  const handleJoinbutton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const joinDescription = Object.fromEntries(formData.entries());
    const data = {
      ...user,
      eventId: getSingleData._id,
      createEventData: getSingleData.createEventData,
      joinDescription,
    };
    console.log("Join Event Card", data);
    const res = await fetch("http://localhost:5000/join-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const joinData = await res.json();
    console.log(joinData);

    if (res.ok) {
      toast.success("Successfully joined the event!");
      redirect("/my-joining-event");
    } else {
      toast.warning("You have already joined this event!");
    }
    redirect("/my-joining-event");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#f5fafb] to-[#eaf5f7] p-6">
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

                <h2 className="mt-1 text-xl font-extrabold text-slate-800">
                  Join This Event
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Become a part of this event and make a meaningful difference in
              your community.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* User Information */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#168fa7]">
              Your Information
            </p>

            {/* Name */}
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MdPerson className="text-[#168fa7]" size={19} />
                Full Name
              </div>

              <p className="rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700">
                {user?.name || "User Name"}
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MdEmail className="text-[#168fa7]" size={19} />
                Email Address
              </div>

              <p className="break-all rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm text-slate-700">
                {user?.email || "User Email"}
              </p>
            </div>
          </div>

          {/* Event Information */}
          <div className="border-t border-slate-100 pt-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#168fa7]">
              Event Information
            </p>

            {/* Event Name */}
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MdVolunteerActivism className="text-[#168fa7]" size={19} />
                Event Name
              </div>

              <p className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-600">
                {getSingleData.createEventData.title}
              </p>
            </div>

            {/* Event Date */}
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MdCalendarMonth className="text-[#168fa7]" size={19} />
                Event Date
              </div>

              <p className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-600">
                {date}
              </p>
            </div>
          </div>

          {/* Join Reason */}

          <form onSubmit={handleJoinbutton}>
            <div>
              <label
                htmlFor="description"
                className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
              >
                <MdEditNote className="text-[#168fa7]" size={21} />
                Why Do You Want to Join?
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Tell us why you are interested in joining this event."
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafcfd] px-4 py-3.5 text-sm leading-7 text-slate-600 outline-none transition focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
              />
            </div>

            {/* Join Button */}
            <button
              type="submit"
              className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#168fa7] to-[#087d95] px-5 py-4 font-bold text-white shadow-md shadow-[#168fa7]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#168fa7]/25 active:scale-[0.98]"
            >
              <MdCheckCircle size={21} />
              Join Event
              <MdArrowForward
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Footer */}
          <div className="flex items-start gap-2 rounded-xl border border-[#dceff2] bg-[#f3fafb] p-4">
            <MdCheckCircle
              size={19}
              className="mt-0.5 shrink-0 text-[#168fa7]"
            />

            <p className="text-xs leading-6 text-slate-500">
              Thank you for your interest! Your participation can make a
              meaningful difference in the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinEventCardPage;
