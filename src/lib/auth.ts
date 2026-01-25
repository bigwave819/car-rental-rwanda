import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const adminRole = "admin";
const userRole = "user";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },
    session: {
        expiresIn: 604800,
        updateAge: 86400,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5
        },
        disableSessionRefresh: true,
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production'
    },
    baseURL: process.env.BASE_URL,
    secret: process.env.BETTER_AUTH_SECRET!,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            mapProfileToUser: (profile) => {
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: userRole
                }
            }
        },
    },
    plugins: [
        admin({
            adminRoles: [adminRole],
            defaultRoles: [userRole]
        }),
        nextCookies()
    ]
});