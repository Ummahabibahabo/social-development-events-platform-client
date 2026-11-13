import { headers } from "next/headers";
import { auth } from "../lib/auth";
import MangeEventCardPage from "./mangeEventCard";
import {
  MdEventAvailable,
  MdDashboard,
  MdEventNote,
  MdCalendarMonth,
  MdArrowForward,
} from "react-icons/md";

const ManageEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const res = await fetch(
    `http://localhost:5000/upcoming-event-by-email/${email}`,
  );

  const manageEventData = await res.json();

  return (
    <div className="min-h-screen bg-[#f5f8f7] px-4 py-10 transition-colors duration-300 dark:bg-[#0b1715] md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#123D32] via-[#175344] to-[#168fa7] p-7 shadow-lg md:p-10">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-28 right-36 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C5F2A5]">
              <MdDashboard className="text-lg" />
              Event Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Manage Your Events
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              Keep track of the events you have created. Manage your event
              details and keep your community activities organized.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#C5F2A5]">
              <MdCalendarMonth className="text-lg" />
              Your Event Management Space
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-11 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Total Events */}
          <div className="group flex items-center gap-5 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#28453d] dark:bg-[#14251f]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e7f4ef] transition-transform duration-300 group-hover:scale-110 dark:bg-[#C5F2A5]/10">
              <MdEventAvailable className="text-4xl text-[#123D32] dark:text-[#C5F2A5]" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Created Events
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#123D32] dark:text-white">
                {manageEventData.length}
              </h2>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Events created by you
              </p>
            </div>
          </div>

          {/* Event Management */}
          <div className="group flex items-center gap-5 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#28453d] dark:bg-[#14251f]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5f5f8] transition-transform duration-300 group-hover:scale-110 dark:bg-[#15A1BF]/10">
              <MdEventNote className="text-4xl text-[#168fa7] dark:text-[#48c7df]" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Event Management
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#123D32] dark:text-white">
                My Events
              </h2>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Manage your activities
              </p>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#168fa7] dark:text-[#48c7df]">
              <MdEventNote className="text-lg" />
              Event Collection
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#123D32] dark:text-white md:text-3xl">
              Your Created Events
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Here are all the events you have created.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#d5e9e1] bg-[#e7f4ef] px-4 py-2.5 text-sm font-semibold text-[#123D32] dark:border-[#315548] dark:bg-[#19382e] dark:text-[#C5F2A5]">
            <MdEventAvailable className="text-lg" />
            {manageEventData.length} Events
          </div>
        </div>

        {/* Divider */}
        <div className="mb-7 h-px bg-gradient-to-r from-[#168fa7]/40 via-gray-200 to-transparent dark:via-[#28453d]" />

        {/* Event Cards */}
        {manageEventData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manageEventData.map((data: any) => (
              <MangeEventCardPage key={data._id} data={data} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center shadow-sm dark:border-[#315548] dark:bg-[#14251f]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e7f4ef] dark:bg-[#C5F2A5]/10">
              <MdEventNote className="text-5xl text-[#168fa7] dark:text-[#48c7df]" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#123D32] dark:text-white md:text-2xl">
              No Events Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              You haven't created any events yet. Your created events will
              appear here once you start organizing activities.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e7f4ef] px-5 py-2.5 text-sm font-semibold text-[#123D32] dark:bg-[#C5F2A5]/10 dark:text-[#C5F2A5]">
              Start Creating Events
              <MdArrowForward className="text-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventPage;
