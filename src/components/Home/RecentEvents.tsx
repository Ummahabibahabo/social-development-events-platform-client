import { EventTypeData } from "@/components/types";
import Image from "next/image";
import Link from "next/link";
import {
  MdLocationOn,
  MdCalendarMonth,
  MdArrowForward,
  MdCategory,
} from "react-icons/md";

interface RecentEventsProps {
  events: EventTypeData[];
}

const RecentEvents = ({ events }: RecentEventsProps) => {
  return (
    <section className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#15A1BF] bg-[#15A1BF]/10 px-3.5 py-1.5 rounded-full">
            Recent Upcoming Drives
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123D32]">
            Recent Upcoming Events
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl">
            Explore the latest community service events added to our platform.
            Join a cause near you and make a direct difference.
          </p>
        </div>

        <Link
          href="/upcomingEvents"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#123D32] hover:text-[#15A1BF] transition group whitespace-nowrap self-start md:self-end"
        >
          View All Events
          <MdArrowForward className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 2 or 3 column Grid Layout */}
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((item) => {
            const formattedDate = new Date(
              item.createEventData?.date,
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={
                      item.createEventData?.image ||
                      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.createEventData?.title || "Community Event"}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#123D32] shadow-sm backdrop-blur-xs">
                      <MdCategory className="text-[#15A1BF]" />
                      {item.createEventData?.type || "Community"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#123D32] transition line-clamp-1">
                    {item.createEventData?.title}
                  </h3>

                  <div className="space-y-1.5 text-xs sm:text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <MdCalendarMonth className="text-base text-[#15A1BF] shrink-0" />
                      <span>{formattedDate}</span>
                    </p>
                    <p className="flex items-center gap-2 line-clamp-1">
                      <MdLocationOn className="text-base text-[#15A1BF] shrink-0" />
                      <span className="truncate">
                        {item.createEventData?.location}
                      </span>
                    </p>
                  </div>

                  <p className="line-clamp-2 text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                    {item.createEventData?.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 truncate max-w-[150px]">
                      By{" "}
                      {item.createEventData?.email?.split("@")[0] ||
                        "Organizer"}
                    </span>

                    <Link
                      href={`/upcomingEvents/${item._id}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-[#123D32] text-white px-4 py-2 rounded-xl transition hover:bg-[#1B5948]"
                    >
                      View Details
                      <MdArrowForward className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-gray-500 font-medium">No upcoming events found.</p>
          <Link
            href="/createEvent"
            className="inline-block mt-4 bg-[#123D32] text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            Create the first event
          </Link>
        </div>
      )}
    </section>
  );
};

export default RecentEvents;
