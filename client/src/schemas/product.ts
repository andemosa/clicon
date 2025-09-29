import { z } from "zod";

export const newProductSchema = z
  .object({
    active: z.boolean(),
    name: z.string().min(1, "name is required"),
    description: z.string(),
    brand: z.string(),
    parent: z.string(),

    price: z.number().min(0, "Price must be at least 0"),
    stock: z.number().min(0, "Stock must be at least 0"),
    discountType: z.enum(["percentage", "fixed"]).optional(),
    discountValue: z.number().optional().or(z.nan()),
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
      message: "Invalid discount value",
      path: ["discountValue"],
    }
  );

export type newProductFormData = z.infer<typeof newProductSchema>;
