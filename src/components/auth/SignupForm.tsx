import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signIn, signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { } from 'lucide-react'
import { Spinner } from '../ui/spinner';
import { FcGoogle } from 'react-icons/fc'

interface SignupFormProps {
  switchToLogin: () => void;
}

const SignupSchema = z.object({
  name: z.string().min(2, 'atleast 2 characters'),
  email: z.string().email("enter the valid email address"),
  password: z.string().min(8, 'enter atleast 8 characters').max(12, 'only allowed 12 characters')
})

type SignupFormValues = z.infer<typeof SignupSchema>

function SignupForm({ switchToLogin }: SignupFormProps) {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onsubmit = async (data: SignupFormValues) => {
    setLoading(true)
    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      })
      if (res.error) {
        alert("Login failed: " + res.error.message);
        return;
      }

      router.push('/')
    } catch (error) {
      console.error(error);
      alert("login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (error) {
      console.error(error);
      alert("Google signup failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
      <h2 className="text-xl font-bold text-black">Create Account</h2>
      <p className="text-gray-400">
        Sign up to start booking your favorite <br /> cars easily.
      </p>

      <div className="space-y-6">
        <input
          placeholder="Full name"
          className="input"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
        <input
          placeholder="Email"
          className="input"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
        <input
          placeholder="Password"
          className="input"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        className="btn w-full"
        disabled={loading}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <p>SIGN UP</p>
          </>
        )}
      </button>

      <hr />
      <button
        onClick={handleGoogleSignup}
        className='w-full border border-black py-2 hover:bg-black hover:text-white ease-in duration-500 cursor-pointer'
      >
        <FcGoogle />
        Login With Google</button>

      <p className="text-gray-500">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="hover:underline text-blue-500 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </form>
  );
}

export default SignupForm;
