import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UserMenu from "@/components/user-menu";
import { ModeToggle } from "./ModeToggler";
import { NavLink } from "react-router";

const navigationLinks = [
  { to: "/", label: "Home" },
  { to: "ad", label: "Features" },
  { to: "/admin", label: "Pricing" },
  { to: "/mn", label: "About" },
];

export default function Header() {
  return (
    <header className="px-4 md:px-6 bg-black/10 backdrop-blur-2xl">
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
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `py-1.5 px-2 rounded-none font-medium transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
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
                    `py-1.5 px-2 font-medium transition-colors ${
                      isActive ? "text-primary" : "text-white hover:scale-105"
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
