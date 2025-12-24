
import { Card } from "@/components/ui/card";
import { ShieldCheck, BellRing, Briefcase, Lock } from "lucide-react";

const safetyFeatures = [
    {
        icon: ShieldCheck,
        title: "Driver Background Checks",
        desc: "All drivers undergo strict background and identity verification for your safety.",
    },
    {
        icon: BellRing,
        title: "In-app SOS & Emergency",
        desc: "Quickly alert emergency contacts and local authorities from within the app.",
    },
    {
        icon: Briefcase,
        title: "Ride Insurance",
        desc: "Every ride is covered with insurance for both riders and drivers.",
    },
    {
        icon: Lock,
        title: "Data Privacy & Security",
        desc: "Your personal and ride data is encrypted and protected with industry-leading security standards.",
    },
];

export default function SafetySecuritySection() {
    return (
        <section className="px-6 mt-10 md:mt-16">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
                        Safety & Security
                    </h2>
                    <p className="">
                        Your safety is our top priority. We implement multiple layers of protection and support for every ride.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                    {safetyFeatures.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={idx}
                                className="flex flex-col justify-center items-center w-full shadow-md p-7 text-center rounded-none bg-background gap-2"
                            >
                                <span className="w-12 h-12 flex items-center justify-center text-primary mb-2">
                                    <Icon size={40} strokeWidth={1.5} />
                                </span>
                                <h3 className="text-sm md:text-xl font-semibold uppercase">{item.title}</h3>
                                <p className="text-sm md:text-md ">{item.desc}</p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
