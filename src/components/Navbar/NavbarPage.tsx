
"use client";

import LogoImg from "@/app/images/inclusion_recolored.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import {
  MdOutlineCreateNewFolder,
  MdOutlineEventNote,
} from "react-icons/md";
import NavLinkPage from "./NavLinkPage";
import { authClient } from "@/app/lib/auth-client";


export const NavbarPage = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuBtn = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
 const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <nav className="flex justify-between items-center gap-3 relative w-full">

      {/* Mobile Menu Button and Logo */}
      <div className="flex items-center gap-2">

        <button
          className="text-2xl md:hidden"
          onClick={handleMenuBtn}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <IoClose /> : <IoMenuSharp />}
        </button>

        <Link href="/" onClick={closeMenu}>
          <div className="flex items-center gap-2">
            <span className="bg-cyan-600 w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] flex justify-center items-center rounded-xl">
              <Image
                src={LogoImg}
                alt="Kindroa Logo"
                width={30}
                height={30}
              />
            </span>

            <p className="text-black text-[18px] sm:text-[20px] font-bold">
              Kindroa
            </p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3 lg:gap-5">

        <Link
          href="/upcomingEvents"
          className={`flex items-center gap-1.5 text-sm lg:text-[16px] ${
            pathname === "/upcomingEvents"
              ? "text-[#15A1BF] underline underline-offset-8"
              : "text-black"
          }`}
        >
          <MdOutlineEventNote />
          <p>Upcoming Events</p>
        </Link>

        {user&&(<Link
          href="/createEvent"
          className={`flex items-center gap-1.5 text-sm lg:text-[16px] ${
            pathname === "/createEvent"
              ? "text-[#15A1BF] underline underline-offset-8"
              : "text-black"
          }`}
        >
          <MdOutlineCreateNewFolder />
          <p>Create Event</p>
        </Link>)}

      </div>

      {/* Login and Theme Button */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Theme Button */}
        <button className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-[#C5F2A5] hover:scale-110">
          <LuMoon
            size={20}
            color="black"
            fill="white"
            strokeWidth={2.5}
          />
        </button>

        <div className="hidden md:flex">
           <NavLinkPage></NavLinkPage>
    </div>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-3 w-full sm:w-64 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 md:hidden z-50">
          <NavLinkPage></NavLinkPage>
<Link
            href="/profile"
            onClick={closeMenu}
            className={`flex items-center gap-2 text-[16px] md:hidden ${
              pathname === "/profile"
                ? "text-[#15A1BF]"
                : "text-gray-500"
            }`}
          >
            <FaRegUser />
            <p>Profile</p>
          </Link>
          <Link
            href="/upcomingEvents"
            onClick={closeMenu}
            className={`flex items-center gap-2 text-[16px] ${
              pathname === "/upcomingEvents"
                ? "text-[#15A1BF]"
                : "text-gray-500"
            }`}
          >
            <MdOutlineEventNote />
            <p>Upcoming Events</p>
          </Link>

         {user&&(<Link
            href="/createEvent"
            onClick={closeMenu}
            className={`flex items-center gap-2 text-[16px] ${
              pathname === "/createEvent"
                ? "text-[#15A1BF]"
                : "text-gray-500"
            }`}
          >
            <MdOutlineCreateNewFolder />
            <p>Create Event</p>
          </Link>)} 

          

        </div>
      )}

    </nav>
  );
};
