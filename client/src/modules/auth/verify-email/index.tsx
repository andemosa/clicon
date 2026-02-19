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
} from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useTimer } from "@/hooks/useTimer";

interface FormValues {
  code: string;
}

const VerifyEmailPage = () => {
  const { time, resetTime, timeInMins } = useTimer({ start: 60 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      z.object({
        code: z.string(),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const handleResend = () => {
    if (time > 0) return;
    resetTime();
  };

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
              Verify Your Email Address
            </Heading>
            <Text color={"gray.600"}>
              Enter the verification code sent to your mail.
            </Text>
          </Stack>
          <Stack
            gap="4"
            align="flex-start"
            maxW="sm"
            as={"form"}
            my={6}
            onSubmit={onSubmit}
          >
            <Field.Root invalid={!!errors.code}>
              <Field.Label w={"full"}>
                <Flex justify="space-between" align="center" mb="1" w={"full"}>
                  <Text fontSize="sm" color="gray.600" mb="0">
                    Verification Code
                  </Text>
                  <Text
                    fontSize="sm"
                    color={time > 0 ? "gray.400" : "blue.500"}
                    cursor={time > 0 ? "not-allowed" : "pointer"}
                    onClick={handleResend}
                  >
                    {time > 0 ? `Resend in ${timeInMins}` : "Resend Code"}
                  </Text>
                </Flex>
              </Field.Label>
              <Input {...register("code")} />
              <Field.ErrorText>{errors.code?.message}</Field.ErrorText>
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
                Verify me&nbsp;
                <ArrowRightIcon />
              </Button>
            </VStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default VerifyEmailPage;
