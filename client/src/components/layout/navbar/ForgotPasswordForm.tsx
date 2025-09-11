import {
  Button,
  Field,
  HStack,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";

import { forgotPasswordSchema } from "@/schemas";

interface FormValues {
  email: string;
}

const ForgotPasswordForm = ({
  switchToLogin,
}: {
  switchToLogin: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Stack gap="5" p={4}>
      <Text fontSize="lg" fontWeight="semibold" textAlign={"center"}>
        Enter your email address to reset your password
      </Text>

      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
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
              Reset Password&nbsp;
              <ArrowRightIcon />
            </Button>
            <HStack w={"full"}>
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
              Back to Login
            </Button>
          </VStack>
        </Stack>
      </form>
    </Stack>
  );
};

export default ForgotPasswordForm;
