import { z } from "zod";

export const newCategorySchema = z.object({
  active: z.boolean(),
  name: z.string().min(1, "name is required"),
  description: z.string(),
  parent: z.string(),
});

export type newCategoryFormData = z.infer<typeof newCategorySchema>;
