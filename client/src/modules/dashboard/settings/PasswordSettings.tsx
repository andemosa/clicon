import {
  Button,
  Stack,
  Field,
  Input,
  Text,
  Separator,
  InputGroup,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const PasswordSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Stack
      border={"1px solid"}
      gap={0}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Change Password
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack gap={2} as={"form"} onSubmit={onSubmit} p={4}>
        <Field.Root invalid={!!errors.oldPassword}>
          <Field.Label>Current Password</Field.Label>
          <InputGroup
            endElement={
              showOldPassword ? (
                <EyeOff onClick={() => setShowOldPassword(false)} />
              ) : (
                <Eye onClick={() => setShowOldPassword(true)} />
              )
            }
          >
            <Input
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword")}
            />
          </InputGroup>
          <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>New Password</Field.Label>
          <InputGroup
            endElement={
              showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )
            }
          >
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
          </InputGroup>
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Confirm Password</Field.Label>
          <InputGroup
            endElement={
              showConfirmPassword ? (
                <EyeOff onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye onClick={() => setShowConfirmPassword(true)} />
              )
            }
          >
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
          </InputGroup>
          <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          size="md"
          w="max-content"
          textTransform="uppercase"
          bg="orange.500"
          color="white"
          fontWeight={700}
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.500" }}
          mt={2}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
};

export default PasswordSettings;
