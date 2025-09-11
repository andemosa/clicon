import { useState } from "react";
import {
  Button,
  Field,
  HStack,
  Input,
  InputGroup,
  Separator,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { signupSchema } from "@/schemas";
import { toaster } from "@/components/ui/toaster";
import { useSignup } from "@/services/auth/auth.hooks";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignup({
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: "success",
      });
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
      email: data.email,
      password: data.password,
    });
  });

  return (
    <Stack gap="5" p={4}>
      <Text fontSize="lg" fontWeight="semibold" textAlign={"center"}>
        Create an account
      </Text>

      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
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
          <VStack w="full" gap={4}>
            <Button
              disabled={isPending}
              type="submit"
              size="md"
              w="full"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
            >
              {isPending ? (
                <Spinner size="sm" />
              ) : (
                <>
                  Create Account&nbsp;
                  <ArrowRightIcon />
                </>
              )}
            </Button>

            <HStack w={"full"}>
              <Separator variant="solid" size={"sm"} flex="1" />
              <Text flexShrink="0">Already have an account?</Text>
              <Separator variant="solid" size={"sm"} flex="1" />
            </HStack>
            <Button
              textTransform="uppercase"
              borderColor="orange.500"
              color="orange.500"
              fontWeight={700}
              _hover={{ borderColor: "orange.500", bg: "white" }}
              _active={{ borderColor: "orange.500", bg: "white" }}
              variant={"outline"}
              size="md"
              w="full"
              type="button"
              onClick={switchToLogin}
            >
              Login
            </Button>
          </VStack>
        </Stack>
      </form>
    </Stack>
  );
};

export default SignupForm;
