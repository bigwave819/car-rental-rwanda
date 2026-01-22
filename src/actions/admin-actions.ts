import { user } from './../lib/db/schema';
import { auth } from "@/lib/auth";
import { db } from '@/lib/db';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';




export async function getAllUser() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user || session.user.role != "admin") {
            redirect('/')
        }

        const users = await db
            .select()
            .from(user)
            .orderBy(user.name);

        return users
        console.log(users);
    } catch (error: any) {
        return [];
    }
}