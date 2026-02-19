import { Separator, Stack, Field, Input, Text, Box } from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import Editor, {
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnBulletList,
  BtnRedo,
  BtnUndo,
  BtnStrikeThrough,
  BtnLink,
  BtnUnderline,
} from "react-simple-wysiwyg";

import type { newProductFormData } from "@/schemas";

const Info = ({
  register,
  errors,
  control,
}: {
  control: Control<newProductFormData, any, newProductFormData>;
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
          <Box
            w={"full"}
            css={{
              ".rswEditor": {
                width: "100%",
                maxWidth: "100%",
              },
              ".rswToolbar": {
                flexWrap: "wrap",
              },
            }}
          >
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Editor
                  value={value}
                  onChange={onChange}
                >
                  <Toolbar>
                    <BtnRedo /> 
                    <BtnUndo />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnBulletList /> 
                    <BtnStrikeThrough /> 
                    <BtnLink />
                  </Toolbar>
                </Editor>
              )}
              rules={{ required: "Description is required" }}
            />
          </Box>
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </>
  );
};

export default Info;
