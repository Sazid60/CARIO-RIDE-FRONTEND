import { User, MapPin, Car } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="mt-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-4">
          How It Works
        </h2>
        <p className="text-sm md:text-md lg:text-lg">
          Follow these simple steps to get your ride quickly and conveniently
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Card */}
        <div className="lg:flex-1 flex flex-col items-center justify-center text-center border  p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-blue-100">
            <User size={56} className="text-blue-500" />
          </div>
          <h3 className="text-md md:text-xl font-semibold mb-3 uppercase">
            Sign Up or Login
          </h3>
          <p className="text-sm md:text-md ">
            Create your account or login to start enjoying seamless rides
          </p>
        </div>

        <div className="lg:flex-1 flex flex-col gap-6">
          {/* Top Right Card */}
          <div className="flex-1 flex flex-col items-center justify-center text-center border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-green-100">
              <MapPin size={56} className="text-green-500" />
            </div>
            <h3 className="text-md md:text-xl font-semibold mb-3 uppercase">
              Set Pickup & Destination
            </h3>
            <p className="text-sm md:text-md ">
              Choose your starting point and destination for an optimized route
            </p>
          </div>

          {/* Bottom Right Card */}
          <div className="flex-1 flex flex-col items-center justify-center text-center border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-yellow-100">
              <Car size={56} className="text-yellow-500" />
            </div>
            <h3 className="text-md md:text-xl font-semibold mb-3 uppercase">
              Start Your Ride
            </h3>
            <p className="text-sm md:text-md ">
              Confirm your ride and enjoy a safe, fast, and reliable journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
