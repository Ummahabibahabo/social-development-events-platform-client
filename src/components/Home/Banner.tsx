import Image from "next/image";
import Link from "next/link";
import {
  MdArrowForward,
  MdOutlineAddCircleOutline,
  MdVolunteerActivism,
} from "react-icons/md";
import { FaHandsHelping, FaTree } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EAF7EE] via-[#F3FAF5] to-[#E2F1EC] p-6 sm:p-10 lg:p-14 border border-emerald-100/60 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#123D32]/20 shadow-xs">
            <MdVolunteerActivism className="text-[#15A1BF] text-lg" />
            <span className="text-xs sm:text-sm font-semibold text-[#123D32] tracking-wide">
              Social Development & Community Action
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123D32] leading-tight">
            Empower Communities, <br />
            <span className="text-[#15A1BF]">Inspire Real Change</span> Together
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
            Join thousands of passionate changemakers and volunteers. Discover
            meaningful local initiatives—from tree plantations and donation
            drives to neighborhood cleanups and education support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/upcomingEvents"
              className="inline-flex items-center gap-2 bg-[#123D32] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1B5948] transition shadow-md hover:shadow-lg"
            >
              Explore Events
              <MdArrowForward className="text-lg" />
            </Link>

            <Link
              href="/createEvent"
              className="inline-flex items-center gap-2 border-2 border-[#123D32] text-[#123D32] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#123D32] hover:text-white transition"
            >
              <MdOutlineAddCircleOutline className="text-lg" />
              Create an Event
            </Link>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-900/10 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#123D32]">
                5,000+
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Volunteers
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#15A1BF]">
                120+
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Events Hosted
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#123D32]">
                25+
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Cities Active
              </p>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80"
              alt="Community Volunteers Joining Hands"
              fill
              unoptimized
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block bg-[#15A1BF] text-xs font-semibold px-3 py-1 rounded-full mb-1">
                Grassroots Impact
              </span>
              <p className="text-sm font-medium text-white/90">
                Together we create sustainable change for generations to come.
              </p>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div className="hidden sm:flex absolute -top-5 -right-3 bg-white rounded-2xl p-3.5 shadow-lg border border-gray-100 items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center text-[#15A1BF]">
              <FaHandsHelping className="text-xl" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Community</p>
              <p className="text-sm font-bold text-[#123D32]">
                100% Free & Open
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
