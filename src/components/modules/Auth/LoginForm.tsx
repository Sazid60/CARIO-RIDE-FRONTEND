/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const fromQuery = queryParams.get("redirect");
  const fromState = (location.state as any)?.from?.pathname;
  const from = fromQuery || fromState || "/";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      if (err.data?.message === "Password does not match") toast.error("Invalid credentials");
      if (err.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      }
    }
  };

  // Google login handler
  const handleGoogleLogin = () => {
    window.location.href = `${config.baseUrl}/auth/google?redirect=${encodeURIComponent(from)}`;
  };

  return (
    <div className={cn("flex flex-col gap-6 text-white", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-white">Login to your account</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none text-white placeholder:text-gray-300"
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none text-white placeholder:text-gray-300"
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-none">
              Login
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-white">
          <h1>Or continue with</h1>
        </div>

        <Button
          onClick={handleGoogleLogin}
          type="button"
          variant="outline"
          className="w-full cursor-pointer rounded-none text-white border-white bg-transparent hover:bg-transparent hover:text-primary"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4 text-white">
          Register
        </Link>
      </div>
    </div>
  );
}
