"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCarSchema, CarsFormValues } from "./schema";
import { createCars } from "@/actions/admin-actions";

type CloudinarySignature = {
    signature: string;
    timestamp: number;
    apiKey: string;
};

function Addcars() {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CarsFormValues>({
        resolver: zodResolver(createCarSchema),
    });

    async function getCloudinarySignature(): Promise<CloudinarySignature> {
        const timestamp = Math.round(Date.now() / 1000);

        const res = await fetch("/api/cloudinary/signature", {
            method: "POST",
            body: JSON.stringify({ timestamp }),
        });

        if (!res.ok) throw new Error("Failed to get signature");

        return res.json();
    }

    const onSubmit = async (data: CarsFormValues) => {
        try {
            setIsUploading(true);

            const { signature, timestamp, apiKey } =
                await getCloudinarySignature();

            const file = data.fileUrl[0];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", "car-rental-rwanda");

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadData = await uploadRes.json();

            await createCars({
                ...data,
                fileUrl: uploadData.secure_url,
            });

            reset();
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="btn">+ add car</button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>List Your Car</DialogTitle>
                    <DialogDescription>
                        Add your vehicle details and make it available for rent.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Car Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Car Name</label>
                        <input
                            className="input"
                            placeholder="e.g. Toyota Corolla"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Brand */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Brand</label>
                        <input
                            className="input"
                            placeholder="e.g. Toyota"
                            {...register("brand")}
                        />
                        {errors.brand && (
                            <p className="text-sm text-red-500">{errors.brand.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Category</label>
                        <select className="input" {...register("category")}>
                            <option value="">Select category</option>
                            <option value="economy">Economy</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="minibus">Mini Bus</option>
                        </select>
                        {errors.category && (
                            <p className="text-sm text-red-500">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Fuel Type */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Fuel Type</label>
                        <select className="input" {...register("fueltype")}>
                            <option value="">Select fuel type</option>
                            <option value="fuel">Fuel</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                        {errors.fueltype && (
                            <p className="text-sm text-red-500">{errors.fueltype.message}</p>
                        )}
                    </div>

                    {/* Transmission */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Transmission</label>
                        <select className="input" {...register("transimission")}>
                            <option value="">Select transmission</option>
                            <option value="automatic">Automatic</option>
                            <option value="manual">Manual</option>
                        </select>
                        {errors.transimission && (
                            <p className="text-sm text-red-500">
                                {errors.transimission.message}
                            </p>
                        )}
                    </div>

                    {/* Seats */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Seats</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 5"
                            {...register("seats")}
                        />
                        {errors.seats && (
                            <p className="text-sm text-red-500">{errors.seats.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Price per day (RWF)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 30000"
                            {...register("pricePerDay", { valueAsNumber: true })}
                        />
                        {errors.pricePerDay && (
                            <p className="text-sm text-red-500">
                                {errors.pricePerDay.message}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Car Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                            {...register("fileUrl")}
                        />
                        {errors.fileUrl && (
                            <p className="text-sm text-red-500">
                                {errors.fileUrl.message as string}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button className="btn w-full text-center" disabled={isUploading}>
                        {isUploading ? <Spinner /> : "Add Car"}
                    </button>

                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Addcars;
