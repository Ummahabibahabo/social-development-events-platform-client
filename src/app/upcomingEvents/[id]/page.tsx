
import JointEventPage from "@/app/joinEventCard/page";
import { EventTypeData } from "@/components/types";
import Image from "next/image";
import Link from "next/link";
import {
  MdLocationOn,
  MdCalendarMonth,
  MdCategory,
  MdEmail,
  MdVolunteerActivism,
  MdArrowBack,
  MdGroups,
  MdCheckCircle,
  MdShare,
  MdOutlineEventAvailable,
  MdFavorite,
  MdVerified,
  MdArrowForward,
} from "react-icons/md";

interface UpcomingDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const UpcomingDetailsPage = async ({
  params,
}: UpcomingDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/upcoming-event/${id}`
  );

  const getSingleData: EventTypeData = await res.json();

  const date = new Date(
    getSingleData.createEventData.date
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f3f7f9] pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/upcomingEvents"
          className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:border-[#168fa7] hover:bg-[#edf8fa] hover:text-[#168fa7]"
        >
          <MdArrowBack size={20} />
          Back to Upcoming Events
        </Link>

        {/* Hero Image */}
        <div className="group relative h-[280px] overflow-hidden rounded-3xl bg-slate-200 shadow-lg sm:h-[400px] lg:h-[460px]">
          <Image
            src={getSingleData.createEventData.image}
            alt={getSingleData.createEventData.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-slate-950/20" />

          {/* Upcoming Badge */}
          <div className="absolute left-5 top-5">
            <span className="flex items-center gap-2 rounded-full border border-white/40 bg-white/95 px-4 py-2.5 text-xs font-bold text-[#168fa7] shadow-lg backdrop-blur-md sm:text-sm">
              <MdVerified size={18} />
              Upcoming Event
            </span>
          </div>

          {/* Hero Bottom Content */}
          <div className="absolute bottom-6 left-5 right-5 flex flex-wrap items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#168fa7] px-5 py-2.5 text-sm font-bold text-white shadow-lg">
                <MdCategory size={18} />
                {getSingleData.createEventData.type}
              </span>

              <p className="text-xs font-semibold uppercase tracking-[2px] text-white/80">
                Discover • Participate • Inspire
              </p>
            </div>

            <div className="hidden rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-right text-white backdrop-blur-md sm:block">
              <p className="text-xs font-medium text-white/70">
                Event Date
              </p>
              <p className="mt-1 text-sm font-bold">{date}</p>
            </div>
          </div>
        </div>

        {/* Event Title Section */}
        <div className="mt-7 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="min-w-0">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[2.5px] text-[#168fa7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#168fa7]" />
                Discover • Participate • Make a Difference
              </p>

              <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-slate-800 sm:text-3xl lg:text-4xl">
                {getSingleData.createEventData.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <MdCalendarMonth className="text-[#168fa7]" size={21} />
                  {date}
                </span>

                <span className="flex items-center gap-2">
                  <MdLocationOn className="text-[#168fa7]" size={21} />
                  {getSingleData.createEventData.location}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#dceff2] bg-[#f2fafb] px-5 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff2f5] text-[#168fa7]">
                <MdFavorite size={25} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Make an Impact
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Be part of something good
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-7 lg:col-span-2">

            {/* About Event */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm sm:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f0fafb]" />

              <div className="relative">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f5f7] text-[#168fa7]">
                    <MdOutlineEventAvailable size={27} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[2px] text-[#168fa7]">
                      Event Overview
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold text-slate-800">
                      About This Event
                    </h2>
                  </div>
                </div>

                <div className="h-1 w-14 rounded-full bg-[#168fa7]" />

                <p className="mt-6 text-justify text-[15px] leading-8 text-slate-600">
                  {getSingleData.createEventData.description}
                </p>
              </div>
            </div>

            {/* Why Participate */}
            <div className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm sm:p-9">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[2.5px] text-[#168fa7]">
                  Make It Meaningful
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-slate-800">
                  Why Participate?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Small actions today can create a better tomorrow.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Volunteer */}
                <div className="group rounded-2xl border border-[#dceff2] bg-[#f5fafb] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#acdce4] hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff1f4] text-[#168fa7] transition duration-300 group-hover:bg-[#168fa7] group-hover:text-white">
                    <MdVolunteerActivism size={25} />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Volunteer Opportunity
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Become a volunteer and contribute your time to a good cause.
                  </p>
                </div>

                {/* Community */}
                <div className="group rounded-2xl border border-[#dceff2] bg-[#f5fafb] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#acdce4] hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff1f4] text-[#168fa7] transition duration-300 group-hover:bg-[#168fa7] group-hover:text-white">
                    <MdGroups size={25} />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Community Connection
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Meet new people and build meaningful relationships.
                  </p>
                </div>

                {/* Kindness */}
                <div className="group rounded-2xl border border-[#dceff2] bg-[#f5fafb] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#acdce4] hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff1f4] text-[#168fa7] transition duration-300 group-hover:bg-[#168fa7] group-hover:text-white">
                    <MdFavorite size={25} />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Spread Kindness
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Make someone's day better through your contribution.
                  </p>
                </div>

                {/* Impact */}
                <div className="group rounded-2xl border border-[#dceff2] bg-[#f5fafb] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#acdce4] hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff1f4] text-[#168fa7] transition duration-300 group-hover:bg-[#168fa7] group-hover:text-white">
                    <MdCheckCircle size={25} />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    Real Impact
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Every small effort can create a positive change.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="relative overflow-hidden rounded-3xl border border-[#244b55] bg-[#173e49] p-7 shadow-sm sm:p-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/5" />

              <div className="relative">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#a9e0e8]">
                    <MdCheckCircle size={27} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[2px] text-[#a9e0e8]">
                      Before You Join
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold text-white">
                      Important Information
                    </h2>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    "Please arrive at the event location on the scheduled date.",
                    "Contact the organizer if you need additional information.",
                    "Respect other participants and follow the event guidelines.",
                  ].map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold text-[#b8e7ed]">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm leading-7 text-slate-200">
                        {info}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Event Information */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Quick Overview */}
              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f5f7] text-[#168fa7]">
                    <MdOutlineEventAvailable size={23} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#168fa7]">
                      Quick Overview
                    </p>
                    <h2 className="text-lg font-extrabold text-slate-800">
                      Event Details
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdCalendarMonth className="shrink-0 text-[#168fa7]" size={21} />
                    <div>
                      <p className="text-xs text-slate-400">
                        Event Date
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdLocationOn className="shrink-0 text-[#168fa7]" size={21} />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Location
                      </p>
                      <p className="break-words text-sm font-bold text-slate-700">
                        {getSingleData.createEventData.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdCategory className="shrink-0 text-[#168fa7]" size={21} />
                    <div>
                      <p className="text-xs text-slate-400">
                        Category
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {getSingleData.createEventData.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Organizer */}
              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f5f7] text-[#168fa7]">
                    <MdEmail size={23} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#168fa7]">
                      Get In Touch
                    </p>
                    <h2 className="text-lg font-extrabold text-slate-800">
                      Event Organizer
                    </h2>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e2f0f2] bg-[#f6fafb] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MdVerified className="text-[#168fa7]" size={18} />
                    <p className="text-sm font-bold text-slate-700">
                      Organizer
                    </p>
                  </div>

                  <p className="break-all text-xs leading-6 text-slate-500">
                    {getSingleData.createEventData.email}
                  </p>
                </div>

                <a
                  href={`mailto:${getSingleData.createEventData.email}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#168fa7] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#117b91] active:scale-95"
                >
                  <MdEmail size={19} />
                  Contact Organizer
                  <MdArrowForward size={18} />
                </a>
              </div>

              {/* Share Event */}
              <div className="flex flex-col justify-between rounded-3xl border border-[#d1e8ec] bg-gradient-to-br from-[#eaf7f9] to-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:col-span-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#168fa7] shadow-sm">
                    <MdShare size={24} />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-800">
                      Share This Event
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Invite your friends and encourage them to participate.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="group mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#168fa7] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#117b91] active:scale-95 sm:mt-0"
                >
                  <MdShare size={18} />
                  Share Event
                  <MdArrowForward
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="min-w-0">
            {/* Join Event Card */}
            <JointEventPage
              getSingleData={getSingleData}
              date={date}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpcomingDetailsPage;
