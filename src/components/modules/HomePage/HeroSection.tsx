import Logo from "@/assets/icons/Logo";
import hero from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          alt="background"
          src={hero}
          className="w-full h-full object-cover"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center text-center gap-6 max-w-5xl">
          {/* Logo */}
          <div className="rounded-xl p-4">
            <Logo />
          </div>

          {/* Heading and Description */}
          <div>
            <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug uppercase">
              Drive Your Way to Freedom <br />
              Earn on Your Schedule <br />
              Be Your Own Boss
            </h1>
            <p className="mx-auto max-w-3xl text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Book rides instantly with trusted drivers, track your journey in real-time,
              and enjoy safe and comfortable travel across the city.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
            <Link to="/book-ride">
              <Button className="w-full bg-primary sm:w-auto px-6 py-3 rounded-none text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105">
                Book a Ride
              </Button>
            </Link>
            <Link to="/be-driver">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-white/10 hover:bg-transparent hover:text-primary backdrop-blur-3xl text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105 text-white"
              >
                Become a Driver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
