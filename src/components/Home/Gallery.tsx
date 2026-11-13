import Image from "next/image";
import { MdOutlinePhotoCamera, MdLocationOn } from "react-icons/md";

const galleryItems = [
  {
    title: "Green Bangladesh Tree Plantation",
    category: "Plantation",
    location: "Dhanmondi, Dhaka",
    image: "https://images.pexels.com/photos/8543586/pexels-photo-8543586.jpeg",
  },
  {
    title: "Coastal Beach Cleanup Drive",
    category: "Cleanup",
    location: "Patenga Beach, Chattogram",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Winter Clothes & Blanket Relief",
    category: "Donation",
    location: "Mirpur 10, Dhaka",
    image: "https://images.pexels.com/photos/7345397/pexels-photo-7345397.jpeg",
  },
  {
    title: "Youth Literacy & Book Sharing",
    category: "Education",
    location: "Halishahar, Chattogram",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Warm Meal Community Distribution",
    category: "Food Drive",
    location: "New Market, Dhaka",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "City Neighborhood Cleanliness",
    category: "Cleanup",
    location: "Agrabad, Chattogram",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
  },
];

const Gallery = () => {
  return (
    <section className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#15A1BF] bg-[#15A1BF]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <MdOutlinePhotoCamera />
          Moments of Impact
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123D32] dark:text-white">
          Community Service Gallery
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          A glimpse into the real change created by our volunteers,
          changemakers, and compassionate communities across the country.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="group relative h-64 sm:h-72 overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Top Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#123D32] backdrop-blur-xs shadow-xs">
                {item.category}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-xs">
                {item.title}
              </h3>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-200 mt-1">
                <MdLocationOn className="text-[#15A1BF]" />
                {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
