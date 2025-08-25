import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Linkedin, MessageCircle, PhoneCall } from "lucide-react";
import { NavLink } from "react-router";



const contactIcons = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ride-sharing-app/",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/61419408349",
  },
  {
    icon: PhoneCall,
    label: "Call",
    href: "tel:+61419408349",
  },
];

export default function Footer() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  if (user) {


    if (user.role === "RIDER") {
      navLinks.push({ to: "/book-ride", label: "Book a Ride" });
      navLinks.push({ to: "/driver-register", label: "Become a Driver" });
    } else if (user.role === "DRIVER") {
      navLinks.push({ to: "/start-driving", label: "Start Driving" });
    }
  }
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Description */}
        <p className="text-gray-300 max-w-xl mx-auto mb-6 text-sm md:text-base">
          RideEasy is your trusted ride-sharing platform. Book rides instantly, track your journey in real-time,
          and enjoy safe and comfortable travel with our verified drivers across the city.
        </p>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm transition hover:text-primary ${isActive ? "text-primary font-semibold" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Contact Icons */}
        <ul className="flex justify-center gap-8 mb-6">
          {contactIcons.map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={label !== "Call" ? "_blank" : undefined}
                rel={label !== "Call" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className=" hover:text-primary transition"
              >
                <Icon className="w-6 h-6" />
              </a>
            </li>
          ))}
        </ul>

        {/* Footer Bottom */}
        <div className="text-sm  border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-orange-600">Cario-Rides Inc.</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
