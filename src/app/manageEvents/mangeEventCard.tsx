"use client";
import { redirect } from "next/navigation";
import {
  MdCalendarMonth,
  MdLocationOn,
  MdEditNote,
  MdDeleteOutline,
} from "react-icons/md";
import { toast } from "react-toastify";
import EditManagementDialogPage from "./EditManagementDialog";
import { getTokenFromServer } from "../lib/getTokenFromServer";

interface MangeEventCardProps {
  data: {
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
  };
}

const MangeEventCardPage = ({ data }: MangeEventCardProps) => {
  console.log("manageEvent", data);
  const event = data.createEventData;
  const handleDeleteButton = async () => {
    const token = await getTokenFromServer();
    const res = await fetch(
      `http://localhost:5000/upcoming-event-by-delete/${data._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const DeleteData = await res.json();
    console.log("manageEvent ", DeleteData);
    if (DeleteData) {
      toast.success("Successfully Delete manage event!");
      redirect("/manageEvents");
    }
  };
  const formatDate = new Date(data.createEventData.date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#123D32] shadow-sm">
          {event.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="mb-4 text-xl font-bold text-[#123D32]">{event.title}</h2>

        <div className="mb-4 space-y-3 text-sm text-gray-500">
          <p className="flex items-center gap-2">
            <MdCalendarMonth className="text-lg text-[#168fa7]" />
            {formatDate}
          </p>

          <p className="flex items-center gap-2">
            <MdLocationOn className="text-lg text-[#168fa7]" />
            {event.location}
          </p>
        </div>

        <p className="mb-5 text-sm leading-6 text-gray-600">
          {event.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
          <EditManagementDialogPage data={data}></EditManagementDialogPage>

          <button
            onClick={handleDeleteButton}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <MdDeleteOutline className="text-xl" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangeEventCardPage;
