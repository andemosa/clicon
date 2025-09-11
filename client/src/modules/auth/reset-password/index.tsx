import {
  Stack,
  Field,
  Input,
  Flex,
  Button,
  Text,
  VStack,
  Box,
  Heading,
  InputGroup,
} from "@chakra-ui/react";
import { ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { resetPasswordSchema } from "@/schemas";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
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
              Reset Password
            </Heading>
            <Text color={"gray.600"}>Enter your new password.</Text>
          </Stack>
          <Stack
            gap="4"
            align="flex-start"
            maxW="sm"
            as={"form"}
            my={4}
            onSubmit={onSubmit}
          >
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

            <VStack w="full" gap={4} mt={2}>
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
                Reset Password&nbsp;
                <ArrowRightIcon />
              </Button>
            </VStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPasswordPage;
