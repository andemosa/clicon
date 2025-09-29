import {
  Button,
  Stack,
  Field,
  Input,
  Text,
  Separator,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toaster } from "@/components/ui/toaster";

import { updatePasswordSchema } from "@/schemas";
import { useUpdatePassword } from "@/services/profile/profile.hooks";

type FormValues = z.infer<typeof updatePasswordSchema>;

const PasswordSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate, isPending } = useUpdatePassword({
    onSuccess: () => {
      toaster.create({
        title: "Password updated successfully",
        type: "success",
      });
      reset()
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      confirmPassword: data.confirmPassword,
      currentPassword: data.oldPassword,
      newPassword: data.password,
    });
  });

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
          type="submit"
          disabled={isPending}
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
          {isPending ? <Spinner size="sm" /> : <>Save Changes</>}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PasswordSettings;
