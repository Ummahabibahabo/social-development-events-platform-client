import {
  MdOutlineSearch,
  MdOutlineAddCircleOutline,
  MdOutlineHandshake,
  MdOutlineManageAccounts,
  MdOutlineCalendarMonth,
  MdOutlineVolunteerActivism,
} from "react-icons/md";

const features = [
  {
    icon: MdOutlineSearch,
    title: "Discover Local Events",
    description:
      "Explore upcoming community drives filtered by category—such as Tree Plantation, Cleanups, Winter Clothes Donations, and Education Support.",
    badge: "Browse & Filter",
  },
  {
    icon: MdOutlineAddCircleOutline,
    title: "Host & Create Drives",
    description:
      "Effortlessly organize your own community welfare projects by setting titles, locations, dates, and inviting volunteers to take action.",
    badge: "Easy Creation",
  },
  {
    icon: MdOutlineHandshake,
    title: "One-Click Participation",
    description:
      "Join any social service campaign with a single click. Connect directly with organizers and unite with fellow passionate volunteers.",
    badge: "Instant Join",
  },
  {
    icon: MdOutlineManageAccounts,
    title: "Manage Your Hosted Events",
    description:
      "Keep full control over events you created. Update schedules, edit details, or remove events seamlessly from your dashboard.",
    badge: "Organizer Tools",
  },
  {
    icon: MdOutlineCalendarMonth,
    title: "Track Joined Activities",
    description:
      "Keep track of all the volunteer drives you've committed to attend, view dates chronologically, and never miss a community meeting.",
    badge: "Activity Tracking",
  },
  {
    icon: MdOutlineVolunteerActivism,
    title: "Social Development Impact",
    description:
      "Turn compassion into tangible results. Help bridge community gaps and support underprivileged neighborhoods through direct action.",
    badge: "Real Impact",
  },
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#15A1BF] bg-[#15A1BF]/10 px-3.5 py-1.5 rounded-full">
          Platform Features
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123D32]">
          Everything You Need to Drive Community Change
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Our platform equips organizers and volunteers with simple, modern
          tools to plan, join, and lead social initiatives.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7EE] text-[#123D32] flex items-center justify-center text-2xl group-hover:bg-[#123D32] group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#123D32] transition-colors mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-[#15A1BF] flex items-center gap-1 group-hover:underline">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
