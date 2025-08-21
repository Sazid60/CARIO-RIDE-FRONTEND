import Marquee from "react-fast-marquee";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomerFeedback() {
  const reviews = [
    "This ride management platform is incredibly efficient and user-friendly. Highly recommended!",
    "Excellent service! The rides are always on time and the drivers are professional.",
    "I love the real-time tracking feature. Makes traveling stress-free and reliable.",
    "Seamless booking experience and exceptional support. Makes commuting so much easier.",
    "The best ride service I've used so far. Consistently safe and fast rides.",
  ];

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <section className="mt-10 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
          Customer Feedback
        </h2>
        <p className="text-sm sm:text-base md:text-md text-gray-300">
          What our customers are saying about our ride management services.
        </p>
      </div>

      <Marquee
        pauseOnHover={true}
        gradient={false}
        speed={40}
        className="pl-6"
      >
        <div className="flex gap-4 pl-6 sm:gap-6">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="flex-shrink-0 w-[80vw] sm:w-80 md:w-80 bg-background p-6 text-center border rounded-none shadow-md"
            >
              <CardContent className="p-0">
                <p className="text-sm md:text-md leading-relaxed">
                  <span className="text-4xl text-orange-500 align-top mr-1">“</span><br />
                  {truncateText(review, 20)} <br />
                  <span className="text-4xl text-orange-500 align-top ml-1">”</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
