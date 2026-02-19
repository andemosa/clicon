import { z } from "zod";

export const newProductSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    parent: z.string().min(1, "Category is required"),

    price: z.coerce.number().min(1, "Price must be at least 1"),
    stock: z.coerce.number().min(1, "Stock must be at least 1"),
    discountType: z
      .union([z.enum(["percentage", "fixed"]), z.literal("")])
      .optional(),

    discountValue: z.coerce.number().optional().or(z.nan()),
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage") {
        return (
          data.discountValue !== undefined &&
          data.discountValue > 0 &&
          data.discountValue <= 100
        );
      }
      if (data.discountType === "fixed") {
        return (
          data.discountValue !== undefined &&
          data.discountValue > 0 &&
          data.discountValue < data.price
        );
      }
      return true;
    },
    {
      message: "Invalid discount value, discount can not be greater than price or less than zero",
      path: ["discountValue"],
    },
  );

export type newProductFormData = z.input<typeof newProductSchema>;
// type FormInput = z.input<typeof newProductSchema>;
// type FormOutput = z.output<typeof newProductSchema>;
