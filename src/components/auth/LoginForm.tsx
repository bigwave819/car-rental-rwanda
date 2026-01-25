import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { FcGoogle } from 'react-icons/fc'

interface LoginFormProps {
  switchToSignup: () => void;
}

const loginSchema = z.object({
  email: z.string().email("enter the valid email address"),
  password: z.string().min(8, 'enter atleast 8 characters').max(12, 'only allowed 12 characters')
})

type loginFormValues = z.infer<typeof loginSchema>

function LoginForm({ switchToSignup }: LoginFormProps) {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onsubmit = async (data: loginFormValues) => {
    setLoading(true)
    try {
      const res = await signIn.email({
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
    }finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: "/"
            })
        } catch (error) {
            console.error(error);
            alert('google login failed')
        }
    }
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
      <h2 className="text-xl font-bold text-black">Welcome Back!</h2>
      <p className="text-gray-400">
        Log in to access your account and manage <br /> your bookings easily.
      </p>

      <div className="space-y-6">
        <input
          placeholder="Enter email"
          className="input"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
        <input
          placeholder="Enter password"
          className="input"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <p className="text-gray-500 text-right cursor-pointer">
        Forgot Your Password?
      </p>

      <button 
        className="btn w-full"
        disabled={loading}
      >
        { loading ? (
          <Spinner />
        ) : (
          <>
            <p>Login Here</p>
          </>
        ) }
      </button>

      <hr/>
      <button 
        className='w-full border border-black py-2 hover:bg-black hover:text-white ease-in duration-500 cursor-pointer'
        onClick={handleGoogleLogin}
      >
        <FcGoogle />
        Login With Google</button>

      <p className="text-gray-500">
        Don't have an account?{" "}
        <span
          onClick={switchToSignup}
          className="hover:underline text-blue-500 cursor-pointer"
        >
          Sign up here
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
