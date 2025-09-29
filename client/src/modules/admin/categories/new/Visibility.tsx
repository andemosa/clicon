import { Stack, Text, Separator, Switch, Field } from "@chakra-ui/react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

import type { newCategoryFormData } from "@/schemas";

const Visibility = ({
  control,
  errors,
}: {
  control: Control<newCategoryFormData, any, newCategoryFormData>;
  errors: FieldErrors<newCategoryFormData>;
}) => {
  return (
    <Stack
      gap={0}
      border={"1px solid"}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Category Visibility
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <Field.Root invalid={!!errors.active}>
              <Switch.Root
                name={field.name}
                checked={field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
                colorScheme={'orange'}
              >
                <Switch.HiddenInput onBlur={field.onBlur} />
                <Switch.Label>Visible on site</Switch.Label>
                <Switch.Control />
              </Switch.Root>
              <Field.ErrorText>{errors.active?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default Visibility;
