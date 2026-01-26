"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { FcGoogle } from "react-icons/fc";

interface SignupFormProps {
  switchToLogin: () => void;
}

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not exceed 12 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm({ switchToLogin }: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setFormError(null);

    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setFormError(res.error.message || "Signup failed");
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

  const handleGoogleSignup = async () => {
    if (loading) return;

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      setFormError("Google signup failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-black">Create Account</h2>
        <p className="text-gray-500 text-sm">
          Sign up to start booking your favorite cars easily.
        </p>
      </div>

      {formError && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
          {formError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="sr-only">Full Name</label>
          <input
            placeholder="Enter your name"
            className="input"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="sr-only">Email</label>
          <input
            type="email"
            placeholder="Enter Email address"
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
            placeholder="Create a password"
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

      <button
        type="submit"
        className="btn w-full flex justify-center"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Sign Up"}
      </button>

      <div className="relative my-4">
        <hr />
        <span className="absolute inset-x-0 -top-2 text-center text-xs text-gray-400 bg-white px-2 w-fit mx-auto">
          OR
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 border border-black py-2 rounded hover:bg-black hover:text-white transition"
      >
        <FcGoogle size={18} />
        Sign up with Google
      </button>

      <p className="text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login here
        </span>
      </p>
    </form>
  );
}
