import { Stack, Text, Separator, Field, NativeSelect, Skeleton } from "@chakra-ui/react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { newProductFormData } from "@/schemas";
import { useCategoriesQuery } from "@/services/category/category.hooks";

const Categories = ({
  register,
  errors,
}: {
  register: UseFormRegister<newProductFormData>;
  errors: FieldErrors<newProductFormData>;
}) => {
  const { data, isFetching } = useCategoriesQuery();
  return (
    <Stack
      gap={0}
      border={"1px solid"}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Category
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Field.Root invalid={!!errors.parent}>
          <Field.Label>Select Parent Category</Field.Label>
          <Skeleton loading={isFetching} w={"full"}>
            {data ? (
              <NativeSelect.Root size="sm" w={"full"}>
                <NativeSelect.Field
                  placeholder="Select option"
                  {...register("parent")}
                >
                  {data?.categories.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            ) : (
              <Text>Failed to load categories</Text>
            )}
          </Skeleton>
          <Field.ErrorText>{errors.parent?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </Stack>
  );
};

export default Categories;
