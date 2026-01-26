"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  switchToSignup: () => void;
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not exceed 12 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm({ switchToSignup }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setFormError(null);

    try {
      const res = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setFormError(res.error.message || "Invalid email or password");
        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      setFormError("Google login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-black">Welcome Back</h2>
        <p className="text-gray-500 text-sm">
          Log in to manage your bookings and account.
        </p>
      </div>

      {formError && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
          {formError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="sr-only">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="input"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="sr-only">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-gray-500 hover:underline"
        >
          Forgot your password?
        </button>
      </div>

      <button
        type="submit"
        className="btn w-full flex justify-center"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Login"}
      </button>

      <div className="relative my-4">
        <hr />
        <span className="absolute inset-x-0 -top-2 text-center text-xs text-gray-400 bg-white px-2 w-fit mx-auto">
          OR
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center cursor-pointer justify-center gap-2 border border-black py-2 rounded hover:bg-black hover:text-white transition"
      >
        <FcGoogle size={18} />
        Login with Google
      </button>

      <p className="text-sm text-gray-500 text-center">
        Don&apos;t have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </form>
  );
}
