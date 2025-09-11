import { Box, Button, Field, Heading, HStack, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { Info, ArrowRightIcon } from "lucide-react";

const TrackOrderPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Stack w={{base: "full", sm: "90%", md: "80%", lg: "70%", xl: "60%"}} gap={4}>
        <Heading>Track Order</Heading>
        <Text>
          To track your order please enter your order ID in the input field
          below and press the “Track Order” button. this was given to you on
          your receipt and in the confirmation email you should have received.
        </Text>
        <Stack gap={2}>
          <HStack gap="10" width="full">
            <Field.Root required>
              <Field.Label>
                Order ID <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="ID..." variant="outline" />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Billing Email Address <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="me@example.com" variant="outline" />
            </Field.Root>
          </HStack>
          <HStack>
            <IconButton size="sm" variant={"ghost"}>
              <Info />
            </IconButton>
            <Text>Order ID that we sended to your in your email address.</Text>
          </HStack>
        </Stack>
        <Button
          type="submit"
          size="md"
          w="max-content"
          textTransform="uppercase"
          bg="orange.500"
          color="white"
          fontWeight={700}
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.500" }}
        >
          Track Order&nbsp;
          <ArrowRightIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default TrackOrderPage;
