"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import { MdEditNote, MdEventAvailable } from "react-icons/md";
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { getTokenFromServer } from "../lib/getTokenFromServer";
interface EditManagementDialogProps {
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
const EditManagementDialogPage = ({ data }: EditManagementDialogProps) => {
  const enentId = data._id;
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log("Create Event from", user);

  const handleEditBtn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createEventData = Object.fromEntries(formData.entries());
    console.log("Create Event Data", createEventData);
    const token = await getTokenFromServer();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upcoming-update/${enentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ createEventData }),
      },
    );

    const data = await res.json();
    console.log(data);

    if (data) {
      toast.success("Created Event successful");
      redirect("/upcomingEvents");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#123D32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b5748]">
            <MdEditNote className="text-xl" />
            Edit
          </button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border-0 bg-gray-50 p-0 shadow-2xl">
          {/* Header */}
          <div className="rounded-t-2xl bg-[#123D32] px-6 py-7 text-white md:px-9">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <MdEventAvailable className="text-3xl" />
            </div>

            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white md:text-3xl">
                Edit Manage Events
              </DialogTitle>

              <DialogDescription className="mt-2 text-sm leading-6 text-gray-200">
                Update your event information and keep your community informed.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form */}
          <div className="px-5 py-7 md:px-9 md:py-8">
            <form onSubmit={handleEditBtn} className="space-y-5">
              {/* Event Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  defaultValue={data.createEventData.title}
                  placeholder="Enter your event title"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                />
              </div>

              {/* Type and Date */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Type
                  </label>

                  <select
                    name="type"
                    defaultValue={data.createEventData.type}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                  >
                    <option value="Cleanup">Cleanup</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Donation">Donation</option>
                    <option value="Community Service">Community Service</option>
                    <option value="Awareness">Awareness</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    defaultValue={data.createEventData.date}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Location
                </label>

                <input
                  type="text"
                  name="location"
                  defaultValue={data.createEventData.location}
                  placeholder="Enter event location"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Thumbnail Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  defaultValue={data.createEventData.image}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  defaultValue={data.createEventData.description}
                  placeholder="Describe your event..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/10"
                />
              </div>

              {/* Organizer Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Organizer Email
                </label>

                <input
                  type="email"
                  name="email"
                  readOnly
                  defaultValue={data.createEventData.email}
                  placeholder="Your logged-in email will appear here"
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Your login email will be automatically associated with this
                  event.
                </p>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-5">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123D32] py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-[#1B5948] hover:shadow-lg"
                >
                  <MdEditNote className="text-xl" />
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditManagementDialogPage;
