"use client";

import { useState } from "react";
import {
  MdOutlineMail,
  MdOutlineSend,
  MdOutlineCheckCircle,
  MdGroups,
  MdVolunteerActivism,
  MdFavorite,
} from "react-icons/md";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#e5f5f8] border border-[#cce9ed] p-8 sm:p-12 lg:p-16 shadow-lg">
        {/* Decorative Icons */}
        <div className="absolute top-8 right-8 sm:right-16 text-[#168fa7]/10 rotate-12 pointer-events-none">
          <MdGroups size={130} />
        </div>

        <div className="absolute bottom-6 left-6 sm:left-12 text-[#123D32]/10 -rotate-12 pointer-events-none">
          <MdVolunteerActivism size={140} />
        </div>

        <div className="absolute bottom-12 right-12 text-[#15A1BF]/10 pointer-events-none">
          <MdFavorite size={65} />
        </div>

        {/* Main Content */}
        <div className="relative max-w-2xl mx-auto text-center space-y-6">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-white text-[#168fa7] border border-[#bde3e9] shadow-sm">
            <MdOutlineMail className="text-lg" />
            Stay Connected
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-[#123D32]">
            Subscribe to Our Community Newsletter
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Get the latest updates on upcoming volunteer drives, community
            welfare stories, and impactful social initiatives directly in your
            inbox.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-3"
          >
            <div className="relative w-full">
              <MdOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#168fa7] text-xl pointer-events-none" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#c5dfe4] text-gray-800 placeholder-gray-400 outline-none focus:border-[#168fa7] focus:ring-2 focus:ring-[#168fa7]/15 transition text-sm sm:text-base shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#123D32] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#168fa7] transition duration-300 whitespace-nowrap cursor-pointer shadow-md"
            >
              Subscribe
              <MdOutlineSend className="text-base" />
            </button>
          </form>

          {/* Success Message */}
          {subscribed && (
            <p className="inline-flex items-center gap-2 text-sm text-[#168fa7] font-semibold">
              <MdOutlineCheckCircle className="text-lg" />
              Thank you for subscribing!
            </p>
          )}

          {/* Privacy Text */}
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <MdOutlineCheckCircle className="text-[#168fa7]" />
            We respect your privacy. No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
