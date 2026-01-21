"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthLayout() {
  const [isSignup, setIsSignup] = useState(false);

  return ( 
    <div className="w-full min-h-screen flex flex-col md:flex-row">

      {/* LEFT */}
      <div className="bg-white w-full md:w-1/2 flex justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          {isSignup ? (
            <SignupForm switchToLogin={() => setIsSignup(false)} />
          ) : (
            <LoginForm switchToSignup={() => setIsSignup(true)} />
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-black w-full md:w-1/2 flex flex-col justify-center items-center text-center px-8 py-12">

        {!isSignup ? (
          <>
            <h2 className="text-3xl font-bold text-white">
              Good to See You Again 👋
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Sign in and continue your journey with us.  
              <br/> Fast bookings. Trusted cars. Stress-free travel.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white">
              Join Us Today 🚀
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Create your account and enjoy  
              easy bookings, trusted <br/> cars & exclusive deals.
            </p>
          </>
        )}

      </div>

    </div>
  );
}

export default AuthLayout;
