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
  Box,
  Link,
  Tabs,
  Icon,
  chakra,
  Spinner,
} from "@chakra-ui/react";
import { EyeOff, Eye, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Link as RouterLink } from "@tanstack/react-router";

import { GoogleIcon } from "@/components/icons/GeneralIcons";
import { toaster } from "@/components/ui/toaster";

import { signinSchema } from "@/schemas";
import { useSignin } from "@/services/auth/auth.hooks";

interface FormValues {
  email: string;
  password: string;
}

const NavigateLink = chakra(RouterLink);

const SigninPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      navigate({
        to: "/",
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
            defaultValue="signin"
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
            <Tabs.Content value="signin" p={{ base: 4, md: 6 }} w={"full"}>
              <Stack
                gap="4"
                align="flex-start"
                maxW="sm"
                as={"form"}
                onSubmit={onSubmit}
              >
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input {...register("email")} />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label w={"full"}>
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="1"
                      w={"full"}
                    >
                      <Text fontSize="sm" color="gray.600" mb="0">
                        Password
                      </Text>
                      <NavigateLink
                        to={"/forgot-password"}
                        _hover={{
                          textDecoration: "underline",
                          color: "blue.500",
                        }}
                      >
                        <Text fontSize="sm" color="blue.500" cursor={"pointer"}>
                          Forgot Password
                        </Text>
                      </NavigateLink>
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
                        Sign in&nbsp;
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
                      Sign in with Google
                    </Text>
                  </Button>
                </VStack>
              </Stack>
            </Tabs.Content>
            <Tabs.Content
              value="signup"
              p={{ base: 4, md: 6 }}
              w={"full"}
            ></Tabs.Content>
          </Tabs.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default SigninPage;
