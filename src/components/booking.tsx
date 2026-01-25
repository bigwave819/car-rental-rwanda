"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { createBookings } from "@/actions/user-action";
import { Spinner } from "./ui/spinner";

// Zod validation schema
const bookingSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  phone: z
    .string()
    .min(10, "Phone number is invalid")
    .regex(/^0\d{9}$/, "Phone number must start with 0 and have 10 digits"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookCarDialog({
  carId,
  carPricePerDay,
}: {
  carId: string;
  carPricePerDay: number;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const totalPrice = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today || end < today) return 0;
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (days > 5 || days <= 0) return 0;

    return days * carPricePerDay;
  }, [startDate, endDate, carPricePerDay]);
  
  const onSubmit = async (data: BookingFormData) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today || end < today) {
      alert("Dates cannot be in the past");
      return;
    }

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (days > 5) {
      alert("Booking cannot exceed 5 days");
      return;
    }

    try {
      setLoading(true);

      const result = await createBookings({
        carId,
        startDate: start,
        endDate: end,
        phone: data.phone,
        totalPrice,
      });

      if (result.success) {
        alert("Booking successful!");
        reset();
      } else {
        alert("Booking failed: " + result.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Book Now</button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Book This Car</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Start Date */}
          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="input"
              min={new Date().toISOString().split("T")[0]} // prevent past dates
            />
            {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className="input"
              min={new Date().toISOString().split("T")[0]} // prevent past dates
            />
            {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm">Phone Number</label>
            <input
              type="text"
              placeholder="07XXXXXXXX"
              {...register("phone")}
              className="input"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          {/* Total Price */}
          <div>
            <p className="text-sm">
              Total Price:{" "}
              <span className="font-bold text-blue-600">
                {totalPrice > 0 ? `RWF ${totalPrice.toLocaleString()}` : "-"}
              </span>
            </p>
          </div>

          <button type="submit" className="btn w-full">
            {loading ? <Spinner className="text-center" /> : <p>Book Now</p>}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
