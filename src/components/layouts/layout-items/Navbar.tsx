import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UserMenu from "@/components/user-menu";
import { ModeToggle } from "./ModeToggler";
import { Link, NavLink } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";



export default function Header() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;


  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  if (user) {
    navigationLinks.push({ to: "/dashboard", label: "Dashboard" });

    if (user.role === "RIDER") {
      navigationLinks.push({ to: "/book-ride", label: "Book a Ride" });
    } else if (user.role === "DRIVER") {
      navigationLinks.push({ to: "/start-driving", label: "Start Driving" });
    }
  }
  return (
    <header className="px-4 md:px-6 bg-black/10 backdrop-blur-2xl z-100">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300" />
                  <path d="M4 12H20" className="origin-center transition-all duration-300" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden rounded-none">
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `py-1.5 px-2 rounded-none font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                      } hover:text-primary`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Desktop nav */}
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <div className="hidden md:flex gap-4">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-1.5 px-2 font-medium transition-colors ${isActive ? "text-primary" : "text-white hover:scale-105"
                    } hover:text-primary`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {data?.data?.email && (
            <UserMenu data={data} />
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm rounded-none">
              <Link to="/login">Login</Link>
            </Button>
          )}

        </div>
      </div>
    </header>
  );
}
