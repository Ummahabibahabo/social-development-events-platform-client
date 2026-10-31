
"use client";

import LogoImg from "@/app/images/inclusion_recolored.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import {
  MdOutlineCreateNewFolder,
  MdOutlineEventNote,
} from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";

export const NavbarPage = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuBtn = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <nav className="flex justify-between items-center gap-3 relative">

      {/* Mobile Menu Button and Logo */}
      <div className="flex items-center gap-3">

        <button
          className="text-2xl md:hidden"
          onClick={handleMenuBtn}
        >
          {menuOpen ? <IoClose /> : <IoMenuSharp />}
        </button>

        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <span className="bg-cyan-600 w-[50px] h-[50px] flex justify-center items-center rounded-xl">
              <Image
                src={LogoImg}
                alt="Kindroa Logo"
                width={30}
                height={30}
              />
            </span>

            <p className="text-black text-[20px] font-bold">
              Kindroa
            </p>
          </div>
        </Link>

      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-5">

        <Link
          className={`flex items-center gap-1.5 text-[16px] ${
            pathname === "/upcomingEvents"
              ? "text-[#15A1BF] underline underline-offset-8"
              : "text-gray-500"
          }`}
          href={"/upcomingEvents"}
        >
          <MdOutlineEventNote />
          <p>Upcoming Events</p>
        </Link>

        <Link
          className={`flex items-center gap-1.5 text-[16px] ${
            pathname === "/createEvent"
              ? "text-[#15A1BF] underline underline-offset-8"
              : "text-gray-500"
          }`}
          href={"/createEvent"}
        >
          <MdOutlineCreateNewFolder />
          <p>Create Event</p>
        </Link>

      </div>

      {/* Login and Theme Button */}
      <div className="flex items-center gap-2">

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-[#C5F2A5] hover:scale-110">
          <LuMoon
            size={20}
            color="black"
            fill="white"
            strokeWidth={2.5}
          />
        </button>

        <Link href={"/login"}>
         <button className="flex justify-center items-center gap-2.5 px-3 py-2 rounded-xl bg-cyan-600 text-white font-semibold">
          <TbLogin2 />
          Login
        </button>
        </Link>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-3 w-52 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 md:hidden z-50">

          <Link
            href={"/upcomingEvents"}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 text-[16px] ${
              pathname === "/upcomingEvents"
                ? "text-[#15A1BF]"
                : "text-gray-500"
            }`}
          >
            <MdOutlineEventNote />
            <p>Upcoming Events</p>
          </Link>

          <Link
            href={"/createEvent"}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 text-[16px] ${
              pathname === "/createEvent"
                ? "text-[#15A1BF]"
                : "text-gray-500"
            }`}
          >
            <MdOutlineCreateNewFolder />
            <p>Create Event</p>
          </Link>

        </div>
      )}

    </nav>
  );
};