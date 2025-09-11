import {
  Stack,
  Field,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  InputGroup,
  HStack,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { EyeOff, Eye, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";

import { signinSchema } from "@/schemas";
import { useSignin } from "@/services/auth/auth.hooks";
import { queryKeys } from "@/services/queryKeys";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = ({
  switchToSignup,
  switchToForgotPassword,
}: {
  switchToSignup: () => void;
  switchToForgotPassword: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signinSchema),
  });

  const { mutate, isPending } = useSignin({
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getProfile,
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
        Sign in to your account
      </Text>

      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label w={"full"}>
              <Flex justify="space-between" align="center" mb="1" w={"full"}>
                <Text fontSize="sm" color="gray.600" mb="0">
                  Password
                </Text>
                <Text
                  fontSize="sm"
                  color="blue.500"
                  onClick={switchToForgotPassword}
                  cursor={"pointer"}
                >
                  Forgot Password
                </Text>
              </Flex>
            </Field.Label>
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
                  Login&nbsp;
                  <ArrowRightIcon />
                </>
              )}
            </Button>

            <HStack w={"full"}>
              <Separator variant="solid" size={"sm"} flex="1" />
              <Text flexShrink="0">Don’t have an account?</Text>
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
              onClick={switchToSignup}
            >
              Create Account
            </Button>
          </VStack>
        </Stack>
      </form>
    </Stack>
  );
};

export default LoginForm;
