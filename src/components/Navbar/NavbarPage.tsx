
import LogoImg from "@/app/images/inclusion_recolored.png"
import Image from "next/image"
import Link from "next/link"

import { LuMoon } from "react-icons/lu"
import { MdOutlineEventNote } from "react-icons/md"
import { TbLogin2 } from "react-icons/tb"
export const NavbarPage = () => {
  return (
    
          <div className="flex justify-between">
      <Link href={"/"}>
      
      <div className="flex items-center gap-2">
              <span className="bg-[#123D32] w-[50] h-[50] flex justify-center items-center rounded-xl">
                  <Image className="text-[#C5F2A5]" src={LogoImg} alt="" width={30} height={30}></Image>
               </span>
              <p className=" text-black text-[20px] font-bold">Kindroa</p>
             </div>
      </Link>
              <Link className="flex items-center gap-2" href={"/upcomingEvents"}>
              <MdOutlineEventNote />
              <p className="text-gray-500 text-[16px]">Upcoming Events</p>
              </Link>
          <div className="flex items-center gap-2">
             

<button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-[#C5F2A5] hover:scale-110">
  <LuMoon size={20} color="black" fill="white" strokeWidth={2.5} />
</button>
              <button className="flex justify-center items-center gap-2.5 px-3 py-1 rounded-xl bg-[#123D32] text-white font-semibold">
                  <TbLogin2 />
                Login  
              </button>
              </div>
          </div>
  
  )
}
