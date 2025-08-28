import register from "@/assets/images/login.webp";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { RegisterForm } from '@/components/modules/Auth/RegisterForm';

export default function Register() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${register})` }}
    >

      <div className="absolute inset-0 bg-black/40 sm:bg-black/30 lg:bg-black/60" />

      <div
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                   rounded-none bg-black/20 p-6 sm:p-8 shadow-lg backdrop-blur-3xl border"
      >
        <div className="flex justify-center mb-2">
          <Link to="/" className="flex items-center gap-2 font-medium text-white text-lg sm:text-xl">
            <Logo />
          </Link>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
