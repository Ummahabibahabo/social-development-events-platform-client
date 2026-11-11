import { headers } from "next/headers";
import { auth } from "../lib/auth";
import MangeEventCardPage from "./mangeEventCard";
import { MdEventAvailable, MdDashboard, MdEventNote } from "react-icons/md";

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
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#168fa7]">
            <MdDashboard className="text-xl" />
            Event Dashboard
          </div>

          <h1 className="text-3xl font-bold text-[#123D32] md:text-4xl">
            Manage Your Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Manage all the events you have created. You can edit your event
            details or delete an event whenever you need.
          </p>
        </div>

        {/* Total Events */}
        <div className="mb-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f4ef]">
              <MdEventAvailable className="text-3xl text-[#123D32]" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Created Events
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#123D32]">
                {manageEventData.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e5f5f8]">
              <MdEventNote className="text-3xl text-[#168fa7]" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Event Management
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#123D32]">
                My Events
              </h2>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#123D32]">
              Your Created Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Here are all your created events.
            </p>
          </div>

          <span className="rounded-full bg-[#e7f4ef] px-4 py-2 text-sm font-semibold text-[#123D32]">
            {manageEventData.length} Events
          </span>
        </div>

        {/* Event Cards */}
        {manageEventData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manageEventData.map((data) => (
              <MangeEventCardPage key={data._id} data={data} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <MdEventNote className="mx-auto text-6xl text-gray-300" />

            <h3 className="mt-4 text-xl font-bold text-[#123D32]">
              No Events Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              You haven't created any events yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventPage;
