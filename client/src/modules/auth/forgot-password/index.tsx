import {
  Stack,
  Field,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  Box,
  chakra,
  Heading,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "@tanstack/react-router";

import { forgotPasswordSchema } from "@/schemas";

interface FormValues {
  email: string;
}

const NavigateLink = chakra(RouterLink);

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        color={"gray.900"}
      >
        <Box
          mx={"auto"}
          shadow={"lg"}
          w={"full"}
          maxW={"400px"}
          p={{ base: 4, md: 6 }}
        >
          <Stack gap={1} align={"center"} textAlign={"center"}>
            <Heading fontWeight={600} fontSize={"md"}>
              Forget Password
            </Heading>
            <Text color={"gray.600"}>
              Enter the email address associated with your Clicon account.
            </Text>
          </Stack>
          <Stack
            gap="4"
            align="flex-start"
            maxW="sm"
            as={"form"}
            mt={4}
            mb={6}
            onSubmit={onSubmit}
          >
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <VStack w="full" gap={4}>
              <Button
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
                Send Code&nbsp;
                <ArrowRightIcon />
              </Button>
            </VStack>
          </Stack>
          <Stack gap={1} color={"gray.600"}>
            <Flex align={"center"} gap={1}>
              <Text>Already have an account?</Text>
              <NavigateLink
                to={"/signin"}
                _hover={{
                  textDecoration: "underline",
                  color: "blue.500",
                }}
              >
                <Text color="blue.500" cursor={"pointer"}>
                  Sign in
                </Text>
              </NavigateLink>
            </Flex>
            <Flex align={"center"} gap={1}>
              <Text>Don’t have an account?</Text>
              <NavigateLink
                to={"/signup"}
                _hover={{
                  textDecoration: "underline",
                  color: "blue.500",
                }}
              >
                <Text color="blue.500" cursor={"pointer"}>
                  Sign up
                </Text>
              </NavigateLink>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgotPasswordPage;
