
import { Mail, Phone } from "lucide-react";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import careerImg from "@/assets/images/faq.webp";

const openPositions = [
    {
        title: "Frontend Developer",
        type: "Remote | Full-time",
        desc: "Build beautiful, performant UIs with React, TypeScript, and Tailwind CSS.",
    },
    {
        title: "Backend Developer",
        type: "Remote | Full-time",
        desc: "Design scalable APIs and services using Node.js and modern databases.",
    },
    {
        title: "UI/UX Designer",
        type: "Remote | Contract",
        desc: "Craft intuitive and visually stunning user experiences for web and mobile.",
    },
    {
        title: "Marketing Specialist",
        type: "Remote | Part-time",
        desc: "Grow our brand and reach through creative campaigns and community engagement.",
    },
];

const Career = () => {
    return (
        <>
            <Breadcrumb
                title="Careers at Cario Ride"
                description="Join our team and help shape the future of ride sharing."
                backgroundImage={careerImg}
            />
            <section className="flex items-center justify-center pt-10 md:pt-16 px-4 bg-background text-foreground">
                <div className="max-w-7xl w-full mx-auto">

                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-primary mb-8 text-center">Current Openings</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {openPositions.map((pos, idx) => (
                                <div key={pos.title} className="border border-border p-6 shadow flex flex-col gap-2 bg-card">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-lg font-bold text-primary">{String(idx + 1).padStart(2, "0")}</span>
                                        <span className="font-semibold text-card-foreground text-lg">{pos.title}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground mb-1">{pos.type}</span>
                                    <span className="text-sm text-muted-foreground">{pos.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col items-center justify-center">
                        <div className="relative bg-card  shadow-2xl p-10 flex flex-col items-center min-w-[280px] max-w-lg w-full border-2 border-dashed border-primary">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary  w-16 h-16 flex items-center justify-center shadow-lg border-4 border-background">
                                <Mail className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-primary mb-4 mt-8 tracking-tight">Contact for Careers</h2>
                            <div className="flex flex-col gap-4 w-full items-center mt-2">
                                <div className="flex items-center gap-3 text-base text-card-foreground bg-muted px-5 py-3  w-full max-w-xs">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Phone:</span>
                                    <a href="tel:+8801234567890" className="text-primary hover:underline font-semibold ml-1">+880 1234-567890</a>
                                </div>
                                <div className="flex items-center gap-3 text-base text-card-foreground bg-muted px-5 py-3 w-full max-w-xs">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Email:</span>
                                    <a href="mailto:careers@carioride.com" className="text-primary hover:underline font-semibold ml-1">careers@carioride.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Career;