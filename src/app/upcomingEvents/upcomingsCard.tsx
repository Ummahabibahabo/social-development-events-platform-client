
import { EventTypeData } from "@/components/types";
import Image from "next/image";
import Link from "next/link";
import {
  MdLocationOn,
  MdCalendarMonth,
  MdArrowForward,
  MdCategory,
} from "react-icons/md";

interface UpcomingEventCardProps {
  upcomingData: EventTypeData[];
}

const UpcomingEventCard = ({ upcomingData }: UpcomingEventCardProps) => {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter upcoming events
  const upcomingEvents = upcomingData.filter((item) => {
    const eventDate = new Date(item.createEventData.date);
    return eventDate >= today;
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {upcomingEvents.map((item) => {
        // Format event date
        const date = new Date(
          item.createEventData.date
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div
            key={item._id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Event Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={item.createEventData.image}
                alt={item.createEventData.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Event Details */}
            <div className="flex flex-1 flex-col space-y-4 p-5">
              <h2 className="min-h-14 text-xl font-bold text-gray-800 transition group-hover:text-[#15A1BF]">
                {item.createEventData.title}
              </h2>

              {/* Location */}
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <MdLocationOn className="shrink-0 text-[#15A1BF]" />
                {item.createEventData.location}
              </p>

              {/* Event Type */}
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <MdCategory className="shrink-0 text-[#15A1BF]" />
                {item.createEventData.type}
              </p>

              {/* Event Date */}
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <MdCalendarMonth className="shrink-0 text-[#15A1BF]" />
                {date}
              </p>

              {/* Description */}
              <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-600">
                {item.createEventData.description}
              </p>

              {/* View Event Button */}
             <div className="mt-auto border-t border-gray-100 pt-4">
  <Link
    href={`/upcomingEvents/${item._id}`}
    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#15A1BF] bg-[#15A1BF] px-3 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#11869F] hover:bg-[#11869F] active:scale-95"
  >
    View Event
    <MdArrowForward />
  </Link>
</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingEventCard;
