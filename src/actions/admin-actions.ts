'use server'

import { bookings, cars, user } from '@/lib/db/schema';
import { auth } from "@/lib/auth";
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';


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
    } catch (error: any) {
        return [];
    }
}

export async function createCars(data: {
    name: string;
    brand: string;
    category: string;
    fueltype: string;
    transimission: string;
    seats: string;
    pricePerDay: number;
    fileUrl: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user || session.user.role != "admin") {
            redirect('/')
        }

        await db.insert(cars).values({
            ...data,
        });

        revalidatePath("/admin/cars")

        return {
            success: true,
            message: 'successfully add the menu'
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'faild to store the user assets'
        }
    }
}

export async function getAllCars() {
    try {
        const car = await db.select().from(cars).orderBy(cars.createdAt);
        return car
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getAllBookings() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user || session.user.role != "admin") {
            redirect('/')
        }
        const booking = await db.select().from(bookings).orderBy(bookings.createdAt);
        return booking
    } catch (error) {
        console.log(error);
        return []
    }
}
