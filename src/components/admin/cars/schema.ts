import { z } from "zod";

export const createCarSchema = z.object({
  name: z.string().min(2),
  brand: z.string().min(2),
  category: z.string().min(2),
  fueltype: z.string().min(2),
  transimission: z.string().min(2),
  seats: z.string().regex(/^\d+$/, "Seats must be a number"),

  pricePerDay: z.number().positive("Price must be greater than 0"),
  fileUrl: z
    .any()
    .refine((file) => file?.length === 1, "Image is required"),
});

export type CarsFormValues = z.infer<typeof createCarSchema>;
