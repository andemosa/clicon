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
  Icon,
  Box,
  Link,
  Tabs,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { EyeOff, Eye, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { GoogleIcon } from "@/components/icons/GeneralIcons";
import { toaster } from "@/components/ui/toaster";
import { useSignup } from "@/services/auth/auth.hooks";
import { signupSchema } from "@/schemas";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  terms?: boolean;
}

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const { mutate, isPending } = useSignup({
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: "success",
      });
      navigate({
        to: "/signin",
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
    if (!data.terms) {
      toaster.create({
        title: `You must accept terms before proceeding`,
        type: "warning",
      });
      return;
    }

    mutate({
      email: data.email,
      password: data.password,
    });
  });

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Flex align={"center"} justify={"center"} direction={"column"}>
        <Box mx={"auto"} shadow={"lg"} w={"full"} maxW={"400px"}>
          <Tabs.Root
            defaultValue="signup"
            colorPalette="orange"
            navigate={({ value }) => navigate({ to: `/${value}` })}
          >
            <Tabs.List>
              <Tabs.Trigger value="signin" asChild>
                <Link
                  unstyled
                  href="/signin"
                  flex={1}
                  w={"full"}
                  display={"block"}
                  textAlign={"center"}
                  fontWeight={600}
                  fontSize={"md"}
                  mt={2}
                >
                  Sign In
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="signup" asChild>
                <Link
                  unstyled
                  href="/signup"
                  flex={1}
                  w={"full"}
                  display={"block"}
                  textAlign={"center"}
                  fontWeight={600}
                  fontSize={"md"}
                  mt={2}
                >
                  Sign Up
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              value="signin"
              p={{ base: 4, md: 6 }}
              w={"full"}
            ></Tabs.Content>
            <Tabs.Content value="signup" p={{ base: 4, md: 6 }} w={"full"}>
              <Stack
                gap="4"
                align="flex-start"
                maxW="sm"
                as={"form"}
                onSubmit={onSubmit}
                color={"gray.900"}
              >
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
                  <Field.ErrorText>
                    {errors.confirmPassword?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Controller
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <Field.Root
                      {...field}
                      invalid={!!errors.terms}
                      disabled={field.disabled}
                    >
                      <Checkbox.Root
                        checked={field.value}
                        onCheckedChange={({ checked }) =>
                          field.onChange(checked)
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          I agree to Clicon Terms of Condition and Privacy
                          Policy.
                        </Checkbox.Label>
                      </Checkbox.Root>
                      <Field.ErrorText>{errors.terms?.message}</Field.ErrorText>
                    </Field.Root>
                  )}
                />
                <VStack w="full" gap={4} mt={2}>
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
                        Sign up&nbsp;
                        <ArrowRightIcon />
                      </>
                    )}
                  </Button>
                  <HStack w={"full"}>
                    <Separator
                      variant="solid"
                      size={"sm"}
                      flex="1"
                      w={"full"}
                    />
                    <Text flexShrink="0">OR</Text>
                    <Separator
                      variant="solid"
                      size={"sm"}
                      flex="1"
                      w={"full"}
                    />
                  </HStack>
                  <Button
                    size="md"
                    w="full"
                    bg="white"
                    borderColor={"orange.500"}
                    color="orange.500"
                    _hover={{ bg: "white" }}
                    _active={{ bg: "white" }}
                  >
                    <Icon boxSize={4} marginRight={"auto"}>
                      <GoogleIcon />
                    </Icon>
                    <Text flex={1} textAlign={"center"} color={"gray.700"}>
                      Sign up with Google
                    </Text>
                  </Button>
                </VStack>
              </Stack>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignupPage;
