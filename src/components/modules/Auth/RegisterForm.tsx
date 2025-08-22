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
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useLoginMutation, useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState, useEffect } from "react";


const registerSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }).max(50),
  email: z.email({ message: "Invalid email" }),
  phone: z.string().min(10, { message: "Phone number is too short" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  password: z.string().min(8, { message: "Password is too short" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      location: { type: "Point", coordinates: [0, 0] },
    },
  });

  // Get geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLocation({ lat, lng });
          form.setValue("location", { type: "Point", coordinates: [lng, lat] });
        },
        (err) => {
          toast.error("Please enable location access");
          console.error(err);
        }
      );
    } else {
      toast.error("Geolocation is not supported in your browser");
    }
  }, [form]);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    if (!image) return toast.error("Profile image is required");

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...data,
        location: {
          type: data.location.type,
          coordinates: data.location.coordinates.map(Number),
        },
      })
    );
    formData.append("file", image);

    const loginData = {
      email: data.email,
      password: data.password
    }

    try {
      await register(formData).unwrap();
      toast.success("User created successfully");
      await login(loginData).unwrap();
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Register your account</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email..." {...field} className="rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801xxxxxxxxx" {...field} className="rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} className="rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Profile Image */}
            <FormItem className="mt-4 space-y-4">
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <SingleImageUploader onChange={setImage} />
              </FormControl>
            </FormItem>

            {location && (
              <div className="text-sm text-gray-500">
                Location Captured: {location.lat}, {location.lng}
              </div>
            )}

            <Button type="submit" className="w-full rounded-none">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
