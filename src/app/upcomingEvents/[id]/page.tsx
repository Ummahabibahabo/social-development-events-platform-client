
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
  MdAccessTime,
  MdCheckCircle,
  MdShare,
  MdOutlineEventAvailable,
  MdFavorite,
  MdVerified,
  MdPeopleAlt,
  MdArrowForward,
  MdAutoAwesome,
} from "react-icons/md";

interface UpcomingDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface EventDataType {
  _id: string;
  createEventData: {
    title: string;
    type: string;
    date: string;
    location: string;
    image: string;
    description: string;
    email: string;
  };
}

const UpcomingDetailsPage = async ({
  params,
}: UpcomingDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/upcoming-event/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  const getSingleData: EventDataType = await res.json();

  const event = getSingleData.createEventData;

  const formattedDate = new Date(
    event.date + "T00:00:00"
  ).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/upcomingEvents"
          className="mb-7 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-500 transition hover:text-[#15A1BF]"
        >
          <MdArrowBack size={20} />
          Back to Upcoming Events
        </Link>

        {/* Event Image */}
        <div className="relative h-[260px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[380px] lg:h-[440px]">

          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-top"
          />

          <div className="absolute left-5 top-5">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#15A1BF] shadow-md">
              <MdVerified size={18} />
              Upcoming Event
            </span>
          </div>

          <div className="absolute bottom-5 left-5">
            <span className="rounded-full bg-[#15A1BF] px-4 py-2 text-sm font-semibold text-white shadow-md">
              {event.type}
            </span>
          </div>

        </div>

        {/* Event Title Section */}
        <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#15A1BF]">
              Discover • Participate • Make a Difference
            </p>

            <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1.5">
                <MdCalendarMonth className="text-[#15A1BF]" size={20} />
                {formattedDate}
              </span>

              <span className="flex items-center gap-1.5">
                <MdLocationOn className="text-[#15A1BF]" size={20} />
                {event.location}
              </span>

            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-[#15A1BF]">
              <MdFavorite size={20} />
              Make an Impact
            </span>
          </div>

        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-7 lg:col-span-2">

            {/* About Event */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                  <MdOutlineEventAvailable size={25} />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  About This Event
                </h2>
              </div>

              <p className="text-justify text-[15px] leading-8 text-gray-600">
                {event.description}
              </p>

            </div>

            {/* Event Highlights */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="mb-6 text-xl font-bold text-gray-800">
                Why Participate?
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdVolunteerActivism size={26} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Volunteer Opportunity
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Become a volunteer and contribute your time to a good cause.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdGroups size={26} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Community Connection
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Meet new people and build meaningful relationships.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdFavorite size={26} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Spread Kindness
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Make someone's day better through your contribution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-fit rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdCheckCircle size={26} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      Real Impact
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Every small effort can create a positive change.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Important Information */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="mb-5 text-xl font-bold text-gray-800">
                Important Information
              </h2>

              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <MdCheckCircle className="mt-1 shrink-0 text-[#15A1BF]" size={20} />
                  <p className="text-sm leading-7 text-gray-600">
                    Please arrive at the event location on the scheduled date.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MdCheckCircle className="mt-1 shrink-0 text-[#15A1BF]" size={20} />
                  <p className="text-sm leading-7 text-gray-600">
                    Contact the organizer if you need additional information.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MdCheckCircle className="mt-1 shrink-0 text-[#15A1BF]" size={20} />
                  <p className="text-sm leading-7 text-gray-600">
                    Respect other participants and follow the event guidelines.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Join Event Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

              <div className="bg-[#15A1BF] p-6 text-white">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <MdVolunteerActivism size={28} />
                </div>

                <h2 className="text-xl font-bold">
                  Be Part of This Event!
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Your participation can make a meaningful difference.
                </p>

              </div>

              <div className="p-6">

                <div className="mb-5 flex items-center gap-3">
                  <MdGroups className="text-[#15A1BF]" size={24} />

                  <div>
                    <p className="font-semibold text-gray-800">
                      Join Our Community
                    </p>
                    <p className="text-xs text-gray-500">
                      Participate and make a difference
                    </p>
                  </div>
                </div>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15A1BF] px-5 py-3.5 font-bold text-white shadow-md transition duration-300 hover:bg-[#1089A3] hover:shadow-lg active:scale-95"
                >
                  <MdVolunteerActivism size={22} />
                  Join This Event
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  We would love to have you with us!
                </p>

              </div>
            </div>

            {/* Event Information */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-lg font-bold text-gray-800">
                Event Details
              </h2>

              <div className="space-y-6">

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdCalendarMonth size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      EVENT DATE
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdLocationOn size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      LOCATION
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-800">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-3 text-[#15A1BF]">
                    <MdCategory size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      CATEGORY
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {event.type}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Organizer Information */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-lg font-bold text-gray-800">
                Event Organizer
              </h2>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[#15A1BF]">
                  <MdEmail size={25} />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-gray-800">
                    Organizer
                  </p>
                  <p className="break-all text-sm text-gray-500">
                    {event.email}
                  </p>
                </div>

              </div>

              <a
                href={`mailto:${event.email}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#15A1BF] px-4 py-3 text-sm font-bold text-[#15A1BF] transition hover:bg-[#15A1BF] hover:text-white"
              >
                <MdEmail size={20} />
                Contact Organizer
              </a>

            </div>

            {/* Share Button */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-[#15A1BF] px-4 py-3.5 font-semibold text-white transition hover:border-[#15A1BF] hover:text-[#15A1BF]"
            >
              <MdShare size={20} />
              Share This Event
            </button>

          </div>
        </div>

        

      </div>
    </div>
  );
};

export default UpcomingDetailsPage;
