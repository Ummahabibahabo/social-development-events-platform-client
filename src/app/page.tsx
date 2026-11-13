import Banner from "@/components/Home/Banner";
import Features from "@/components/Home/Features";
import RecentEvents from "@/components/Home/RecentEvents";
import Gallery from "@/components/Home/Gallery";
import Newsletter from "@/components/Home/Newsletter";
import Footer from "@/components/Footer/Footer";

const Home = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`, {
    cache: "no-store",
  });
  const recentEvents = await res.json();

  return (
    <main className="space-y-6">
      {/* 1. Banner Section */}
      <Banner />

      {/* 2. Feature Section */}
      <Features />

      {/* 3. Recent Upcoming Events Section (Dynamic 6 items from DB) */}
      <RecentEvents events={recentEvents} />

      {/* 4. Gallery Section (Static) */}
      <Gallery />

      {/* 5. Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
