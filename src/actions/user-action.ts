'use server'
import { eq } from 'drizzle-orm';
import { db } from "@/lib/db";
import { bookings, cars, user } from "@/lib/db/schema";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


export async function createBookings(data: { carId: string; startDate: Date; endDate: Date; phone: string; totalPrice: number }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user || session.user.role == "admin") {
            redirect('/')
        }

        await db.insert(bookings).values({
            carId: data.carId,
            startDate: data.startDate,
            endDate: data.endDate,
            phone: data.phone,
            totalPrice: data.totalPrice,
            userId: session.user.id,
        });

        revalidatePath("/bookings")

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

export async function getCarDetails(id: string) {
    try {
        const car = await db.select().from(cars).where(eq(cars.id, id)).limit(1)
        return car
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getAllUserBookings() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      redirect("/");
    }

    const bookingDetails = await db
      .select({
        bookingId: bookings.id,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        phone: bookings.phone,
        status: bookings.status,
        totalPrice: bookings.totalPrice,
        userName: user.name,
        userEmail: user.email,
        carName: cars.name,
        carBrand: cars.brand,
      })
      .from(bookings)
      .leftJoin(user, eq(bookings.userId, user.id))
      .leftJoin(cars, eq(bookings.carId, cars.id))
      .orderBy(bookings.createdAt);

    return bookingDetails;
  } catch (error) {
    console.log(error);
    return [];
  }
}