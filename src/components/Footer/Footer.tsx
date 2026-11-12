import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/app/images/inclusion_recolored.png";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white pt-12 pb-8 text-gray-600 rounded-3xl p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-600 w-10 h-10 flex justify-center items-center rounded-xl">
              <Image src={LogoImg} alt="Kindroa Logo" width={24} height={24} />
            </span>
            <span className="text-xl font-bold text-gray-900">Kindroa</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            A social development and community service platform bringing
            changemakers together to create positive, lasting impact.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/umma.habiba.615977"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#123D32] hover:text-white transition"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="https://www.linkedin.com/in/ummahabibahabo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#123D32] hover:text-white transition"
            >
              <FaLinkedinIn size={14} />
            </a>

            <a
              href="https://github.com/Ummahabibahabo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#123D32] hover:text-white transition"
            >
              <FaGithub size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#123D32] transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/upcomingEvents"
                className="hover:text-[#123D32] transition"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                href="/createEvent"
                className="hover:text-[#123D32] transition"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/my-joining-event"
                className="hover:text-[#123D32] transition"
              >
                My Joining Events
              </Link>
            </li>
            <li>
              <Link
                href="/manageEvents"
                className="hover:text-[#123D32] transition"
              >
                Manage Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
            Event Types
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#123D32] transition">Tree Plantation</li>
            <li className="hover:text-[#123D32] transition">
              Community Cleanups
            </li>
            <li className="hover:text-[#123D32] transition">Donation Drives</li>
            <li className="hover:text-[#123D32] transition">
              Free Education Camps
            </li>
            <li className="hover:text-[#123D32] transition">
              Social Awareness
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-[#15A1BF] shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineMail className="text-[#15A1BF] shrink-0" />
              <span>support@kindroa.org</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlinePhone className="text-[#15A1BF] shrink-0" />
              <span>+880 1700-000000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Kindroa Social Development Platform.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
