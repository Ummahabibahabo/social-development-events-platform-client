"use client";

import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { TbLogin2 } from "react-icons/tb";
import { LogOut, UserRound } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavLinkPage = () => {
  const pathname = usePathname();
  

  const { data: session } = authClient.useSession();
  const user = session?.user;

    const handleLogoutBtn = async() => {
      await authClient.signOut()
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {user ? (
        <Popover>
          <PopoverTrigger >
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
              <Avatar className="h-10 w-10 border-2 border-cyan-500 shadow-md cursor-pointer">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user.image || ""}
                />
                <AvatarFallback className="bg-cyan-100 text-cyan-700 font-bold">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-72 rounded-2xl p-0 shadow-xl border border-gray-100"
          >
            <PopoverHeader className="flex flex-col items-center text-center p-5">
              {/* Profile Image */}
              <Avatar className="h-20 w-20 border-4 border-cyan-100 shadow-md">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user.image || ""}
                />
                <AvatarFallback className="bg-cyan-100 text-cyan-700 text-2xl font-bold">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              {/* User Information */}
              <PopoverTitle className="mt-3 text-lg font-bold text-gray-800">
                {user.name}
              </PopoverTitle>

              <PopoverDescription className="text-sm text-gray-500">
                {user.email}
              </PopoverDescription>
            </PopoverHeader>

            <div className="px-4 pb-4 space-y-2">
              <Link
                href="/profile"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  pathname === "/profile"
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UserRound size={18} />
                <span className="font-medium">My Profile</span>
              </Link>

              <button
               onClick={handleLogoutBtn}
                className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-600 font-semibold transition hover:bg-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/login">
          <button className="flex justify-center items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 py-2 rounded-xl bg-cyan-600 text-white text-sm sm:text-base font-semibold hover:bg-cyan-700 transition">
            <TbLogin2 />
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavLinkPage;