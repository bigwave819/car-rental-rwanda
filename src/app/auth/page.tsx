import AuthLayout from "@/components/auth/AuthLayout";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Auth Page",
  description: "You need to create new account or log into existing one",
};


function AuthPage() {
    return <AuthLayout />
}

export default AuthPage;