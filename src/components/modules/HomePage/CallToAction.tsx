import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ride from "@/assets/images/ride.jpg"; 

export default function CallToAction() {
  return (
    <section
      className="relative py-16 px-6 rounded-lg my-12 text-center max-w-7xl mx-auto overflow-hidden"
      style={{
        backgroundImage: `url(${ride})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 text-white container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
          Ready for Your Next Ride?
        </h2>
        <p className="text-sm md:text-base mb-5">
          Experience hassle-free rides with our cutting-edge ride management platform. Whether commuting daily, heading to work, or planning a weekend trip, we've got you covered with fast, reliable, and safe rides.
          Enjoy features like real-time tracking, professional drivers, instant booking, and 24/7 support. Never wait in uncertainty your journey starts here.
        </p>
        <Link to="/book-ride">
          <Button className="w-auto px-6 py-3 bg-primary rounded-none text-sm sm:text-base font-bold transition-transform duration-300 ease-in-out hover:scale-105">
            Book a Ride
          </Button>
        </Link>
      </div>
    </section>
  );
}
