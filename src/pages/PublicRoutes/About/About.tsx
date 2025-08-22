
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/layouts/Breadcrumb"
import aboutImg from "@/assets/images/about.webp"
import aboutUs from "@/assets/images/about-us.webp"

export default function About() {
  const [activeTab, setActiveTab] = useState("mission")

  return (
    <section>
      <Breadcrumb
        title="About Us"
        description="Learn more about our vision, mission, and the story behind our ride-sharing platform."
        backgroundImage={aboutImg}
      />

      {/* ✅ About Section */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[560px] overflow-hidden shadow-md">
              <img
                src={aboutUs}
                alt="Ride sharing app illustration"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-md sm:text-3xl font-bold uppercase mb-4">
                  About Our Ride-Sharing App
                </h2>
                <p className="text-sm md:text-md mb-6">
                  Our platform connects riders and drivers seamlessly, offering a safe, affordable, 
                  and reliable transportation option for everyone. With real-time tracking, 
                  transparent pricing, and advanced security features, we aim to redefine urban mobility.
                </p>
                <p className="text-sm md:text-md">
                  Founded with the mission to make commuting easier and smarter, 
                  our app empowers both riders and drivers with innovative technology. 
                  Whether it’s daily commutes, urgent rides, or long-distance trips, 
                  we provide a trusted platform that prioritizes safety, convenience, and user satisfaction.
                </p>
              </div>

              {/* Mission/Vision Buttons */}
              <div className="flex mb-6">
                <Button
                  onClick={() => setActiveTab("mission")}
                  className={`px-6 py-2 text-xs font-semibold transition-colors border-r-0 rounded-none ${
                    activeTab === "mission"
                      ? "bg-primary text-white hover:bg-orange-700"
                      : "bg-transparent border border-gray-300 hover:border-primary"
                  }`}
                  variant={activeTab === "mission" ? "default" : "outline"}
                >
                  Our Mission
                </Button>
                <Button
                  onClick={() => setActiveTab("vision")}
                  className={`px-6 py-2 text-xs font-semibold transition-colors rounded-none ${
                    activeTab === "vision"
                      ? "bg-primary text-white hover:bg-orange-700"
                      : "bg-transparent border border-gray-300 hover:border-primary"
                  }`}
                  variant={activeTab === "vision" ? "default" : "outline"}
                >
                  Our Vision
                </Button>
              </div>

              {/* Mission/Vision Content */}
              <Card className="rounded-none">
                <CardContent className="p-4 sm:p-6">
                  <div>
                    {activeTab === "mission" ? (
                      <p className="text-sm md:text-md leading-relaxed">
                        Our mission is to make transportation accessible, safe, and efficient for 
                        everyone. We strive to bridge the gap between riders and drivers with 
                        technology-driven solutions ensuring affordability, convenience, and 
                        security at every step of the journey.
                      </p>
                    ) : (
                      <p className="text-sm md:text-md leading-relaxed">
                        Our vision is to become the most trusted ride-sharing platform, 
                        leading innovation in smart mobility. We aspire to build greener, 
                        safer, and more connected cities by empowering communities with 
                        sustainable transport solutions and cutting-edge technology.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
