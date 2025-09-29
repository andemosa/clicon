import {
  Separator,
  Stack,
  Textarea,
  Field,
  Input,
  Text,
} from "@chakra-ui/react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { newProductFormData } from "@/schemas";

const Info = ({
  register,
  errors,
}: {
  register: UseFormRegister<newProductFormData>;
  errors: FieldErrors<newProductFormData>;
}) => {
  return (
    <>
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        information
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input {...register("name")} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.description}>
          <Field.Label>Description</Field.Label>
          <Textarea
            placeholder=""
            variant="outline"
            autoresize
            {...register("description")}
          />
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </>
  );
};

export default Info;
