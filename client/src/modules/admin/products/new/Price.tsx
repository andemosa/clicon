import {
  Stack,
  Field,
  Input,
  Text,
  SimpleGrid,
  NativeSelect,
} from "@chakra-ui/react";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

import type { newProductFormData } from "@/schemas";

const Price = ({
  register,
  errors,
  watch,
}: {
  register: UseFormRegister<newProductFormData>;
  errors: FieldErrors<newProductFormData>;
  watch: UseFormWatch<newProductFormData>;
}) => {
  const discountType = watch("discountType");
  return (
    <>
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        price
      </Text>
      <Stack h={"max-content"} p={4} gap={4}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          <Field.Root invalid={!!errors.price}>
            <Field.Label>Price</Field.Label>
            <Input type="number" {...register("price")} min={0.0} />
            <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.stock}>
            <Field.Label>Stock</Field.Label>
            <Input type="number" {...register("stock")} min={0.0} />
            <Field.ErrorText>{errors.stock?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          <Field.Root>
            <Field.Label>Discount Type</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field {...register("discountType")}>
                <option value="">None</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          {discountType && (
            <Field.Root invalid={!!errors.discountValue}>
              <Field.Label>
                {discountType === "percentage"
                  ? "Discount Percentage (%)"
                  : "Discount Amount (new price)"}
              </Field.Label>
              <Input type="number" {...register("discountValue")} />
              <Field.ErrorText>{errors.discountValue?.message}</Field.ErrorText>
            </Field.Root>
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Price;
