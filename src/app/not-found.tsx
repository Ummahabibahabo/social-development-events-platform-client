import Link from "next/link";
import { MdHome, MdOutlineEventNote } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-md mx-auto space-y-5">
        {/* 404 Headline */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-extrabold text-[#123D32]/10 select-none">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-[#123D32]">
            Page Not Found
          </p>
        </div>

        {/* Message */}
        <p className="text-gray-500 text-sm sm:text-base">
          Sorry, the page you are looking for could not be found or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#123D32] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1B5948] transition shadow-md"
          >
            <MdHome className="text-lg" />
            Back to Home
          </Link>

          <Link
            href="/upcomingEvents"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
          >
            <MdOutlineEventNote className="text-lg" />
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
