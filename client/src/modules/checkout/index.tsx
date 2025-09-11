import {
  Box,
  Button,
  Flex,
  GridItem,
  chakra,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  defineStyle,
  Field,
  Input,
  NativeSelect,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const CheckoutPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
      color={"gray.900"}
    >
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 6 }}>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Stack gap={3}>
            <Text color={"gray.900"} fontSize="lg" fontWeight="medium">
              Billing Information
            </Text>
            <Stack gap={2}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4 }}>
                <GridItem>
                  <Text fontSize={"sm"} mb={2}>
                    Username
                  </Text>
                  <SimpleGrid columns={{ base: 2 }} gap={{ base: 4 }}>
                    <Field.Root>
                      <Box pos="relative" w="full">
                        <Input className="peer" placeholder="" />
                        <Field.Label css={floatingStyles}>
                          First Name
                        </Field.Label>
                      </Box>
                    </Field.Root>
                    <Field.Root>
                      <Box pos="relative" w="full">
                        <Input className="peer" placeholder="" />
                        <Field.Label css={floatingStyles}>
                          Last Name
                        </Field.Label>
                      </Box>
                    </Field.Root>
                  </SimpleGrid>
                </GridItem>
                <GridItem>
                  <Text fontSize={"sm"} mb={2}>
                    Company Name (Optional)
                  </Text>
                  <Field.Root>
                    <Input />
                    <Field.ErrorText></Field.ErrorText>
                  </Field.Root>
                </GridItem>
              </SimpleGrid>
              <Box>
                <Text fontSize={"sm"} mb={2}>
                  Address
                </Text>
                <Field.Root>
                  <Input />
                  <Field.ErrorText></Field.ErrorText>
                </Field.Root>
              </Box>
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4 }}>
                <GridItem>
                  <SimpleGrid columns={{ base: 2 }} gap={{ base: 4 }}>
                    <Box>
                      <Text fontSize={"sm"} mb={2}>
                        Country
                      </Text>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field placeholder="Select option">
                          <option value="react">React</option>
                          <option value="vue">Vue</option>
                          <option value="angular">Angular</option>
                          <option value="svelte">Svelte</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Box>
                    <Box>
                      <Text fontSize={"sm"} mb={2}>
                        Region/State
                      </Text>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field placeholder="Select option">
                          <option value="react">React</option>
                          <option value="vue">Vue</option>
                          <option value="angular">Angular</option>
                          <option value="svelte">Svelte</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Box>
                  </SimpleGrid>
                </GridItem>
                <GridItem>
                  <SimpleGrid columns={{ base: 2 }} gap={{ base: 4 }}>
                    <Box>
                      <Text fontSize={"sm"} mb={2}>
                        City
                      </Text>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field placeholder="Select option">
                          <option value="react">React</option>
                          <option value="vue">Vue</option>
                          <option value="angular">Angular</option>
                          <option value="svelte">Svelte</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Box>
                    <Box>
                      <Text fontSize={"sm"} mb={2}>
                        Zip Code
                      </Text>
                      <Field.Root>
                        <Input />
                        <Field.ErrorText></Field.ErrorText>
                      </Field.Root>
                    </Box>
                  </SimpleGrid>
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4 }}>
                <GridItem>
                  <Box>
                    <Text fontSize={"sm"} mb={2}>
                      Email
                    </Text>
                    <Field.Root>
                      <Input />
                      <Field.ErrorText></Field.ErrorText>
                    </Field.Root>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box>
                    <Text fontSize={"sm"} mb={2}>
                      Phone Number
                    </Text>
                    <Field.Root>
                      <Input />
                      <Field.ErrorText></Field.ErrorText>
                    </Field.Root>
                  </Box>
                </GridItem>
              </SimpleGrid>
            </Stack>
          </Stack>
          <Stack gap={3}>
            <Text color={"gray.900"} fontSize="lg" fontWeight="medium">
              Additional Information
            </Text>
            <HStack gap="10" width="full">
              <Field.Root required>
                <Field.Label>
                  Order Notes{" "}
                  <Text as={"span"} fontSize={"xs"} color={"gray.400"}>
                    (Optional)
                  </Text>
                </Field.Label>
                <Textarea
                  color={"gray.400"}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  variant="outline"
                  autoresize
                />
              </Field.Root>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1 }}>
          <Box
            border={"1px solid"}
            borderColor={"gray.100"}
            rounded="md"
            p={{ base: 2, sm: 4 }}
          >
            <Text
              color={"gray.900"}
              fontSize="lg"
              fontWeight="medium"
              pb={4}
            >
              Order Summary
            </Text>
            <Stack gap={2} color={"gray.600"} w={"full"}>
              <Flex w={"full"} align={"center"} justify={"space-between"}>
                <Text>Sub-total</Text>
                <Text color={"gray.900"} fontWeight={500}>
                  $100
                </Text>
              </Flex>
              <Flex w={"full"} align={"center"} justify={"space-between"}>
                <Text>Shipping</Text>
                <Text color={"gray.900"} fontWeight={500}>
                  $100
                </Text>
              </Flex>
              <Flex w={"full"} align={"center"} justify={"space-between"}>
                <Text>Discount</Text>
                <Text color={"gray.900"} fontWeight={500}>
                  $100
                </Text>
              </Flex>
              <Flex w={"full"} align={"center"} justify={"space-between"}>
                <Text>Tax</Text>
                <Text color={"gray.900"} fontWeight={500}>
                  $100
                </Text>
              </Flex>
            </Stack>
            <Separator w={"full"} my={2} />
            <Flex
              color={"gray.900"}
              w={"full"}
              align={"center"}
              justify={"space-between"}
            >
              <Text>Total</Text>
              <Text fontWeight={600}>$100</Text>
            </Flex>
            <Link
              to={"/checkout"}
              _hover={{ textDecoration: "none" }}
              w={"full"}
            >
              <Button
                size="md"
                w="full"
                textTransform="uppercase"
                bg="orange.500"
                color="white"
                fontWeight={700}
                _hover={{ bg: "orange.500" }}
                _active={{ bg: "orange.500" }}
                mt={2}
              >
                Place order&nbsp;
                <ArrowRightIcon />
              </Button>
            </Link>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default CheckoutPage;

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  fontSize: "xs",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
