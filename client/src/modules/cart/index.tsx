import { Tooltip } from "@/components/ui/tooltip";
import {
  Box,
  Text,
  Table,
  Image,
  Flex,
  SimpleGrid,
  GridItem,
  HStack,
  IconButton,
  NumberInput,
  Stack,
  Separator,
  chakra,
  Button,
  Field,
  Input,
  defineStyle,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, CircleX, Minus, Plus } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const CartPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 6 }}>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
            <Text
              color={"gray.900"}
              fontSize="lg"
              fontWeight="medium"
              p={{ base: 4 }}
            >
              Shopping Cart
            </Text>

            <Table.ScrollArea borderWidth="1px" w="full">
              <Table.Root size="sm" variant="outline">
                <Table.Header px={4}>
                  <Table.Row>
                    <Table.ColumnHeader
                      textTransform={"uppercase"}
                      maxW="400px"
                    >
                      Products
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textTransform={"uppercase"}
                      textAlign="center"
                    >
                      Price
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textTransform={"uppercase"}
                      textAlign="center"
                    >
                      Quantity
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textTransform={"uppercase"}
                      textAlign="center"
                    >
                      Sub-total
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body px={4}>
                  {items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>
                        <Flex align="center" gap={2}>
                          <Tooltip
                            content="Remove from cart"
                            openDelay={500}
                            closeDelay={100}
                          >
                            <IconButton
                              aria-label="Remove item"
                              size="sm"
                              variant="ghost"
                            >
                              <CircleX />
                            </IconButton>
                          </Tooltip>
                          <Flex align="center" gap={4}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              boxSize="50px"
                              objectFit="contain"
                            />
                            <Text
                              fontSize="sm"
                              maxW="380px"
                              whiteSpace="normal"
                              wordBreak="break-word"
                            >
                              {item.name}
                            </Text>
                          </Flex>
                        </Flex>
                      </Table.Cell>

                      <Table.Cell textAlign="center">
                        <Flex gap={2} justify="center" align="center">
                          {item.oldPrice && (
                            <Text as="s" color="gray.500" fontSize="xs">
                              ${item.oldPrice.toFixed(2)}
                            </Text>
                          )}
                          <Text fontSize="sm">${item.price.toFixed(2)}</Text>
                        </Flex>
                      </Table.Cell>

                      <Table.Cell textAlign="center">
                        <NumberInput.Root
                          defaultValue="3"
                          unstyled
                          spinOnPress={false}
                          min={0}
                          size={"xs"}
                        >
                          <HStack gap="2">
                            <NumberInput.DecrementTrigger asChild>
                              <IconButton variant="outline" size="sm">
                                <Minus />
                              </IconButton>
                            </NumberInput.DecrementTrigger>
                            <NumberInput.ValueText
                              textAlign="center"
                              fontSize="lg"
                              minW="3ch"
                            />
                            <NumberInput.IncrementTrigger asChild>
                              <IconButton variant="outline" size="sm">
                                <Plus />
                              </IconButton>
                            </NumberInput.IncrementTrigger>
                          </HStack>
                        </NumberInput.Root>
                      </Table.Cell>

                      <Table.Cell textAlign="center">
                        <Text fontSize="sm">${item.price.toFixed(2)}</Text>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>

            <Flex p={4}>
              <Link to={"/shop"} _hover={{ textDecoration: "none" }}>
                <Button
                  size="md"
                  w="full"
                  textTransform="uppercase"
                  borderColor="orange.500"
                  bg={'white'}
                  color="orange.500"
                  fontWeight={700}
                  _hover={{ borderColor: "orange.500", bg: "white" }}
                  _active={{ borderColor: "orange.500", bg: "white" }}
                  mt={2}
                >
                  <ArrowLeftIcon />
                  &nbsp;Continue Shopping
                </Button>
              </Link>
            </Flex>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack gap={4}>
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
                py={{ base: 4 }}
              >
                Cart Totals
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
                  Proceed to Checkout&nbsp;
                  <ArrowRightIcon />
                </Button>
              </Link>
            </Box>
            <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
              <Text
                color={"gray.900"}
                fontSize="lg"
                fontWeight="medium"
                p={{ base: 4 }}
              >
                Coupon Code
              </Text>
              <Separator w={"full"} />
              <Stack p={{ base: 2, sm: 4, lg: 6 }} gap={4}>
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input className="peer" placeholder="" />
                    <Field.Label css={floatingStyles}>Coupon Code</Field.Label>
                  </Box>
                </Field.Root>
                <Button
                  size="md"
                  w={'max-content'}
                  textTransform="uppercase"
                  bg="blue.500"
                  color="white"
                  fontWeight={700}
                  _hover={{ bg: "blue.500" }}
                  _active={{ bg: "blue.500" }}
                >
                  Apply Coupon
                  <ArrowRightIcon />
                </Button>
              </Stack>
            </Box>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default CartPage;

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
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

const items = [
  {
    id: 1,
    name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
    price: 999,
    oldPrice: 1299,
    image: "/images/earbuds.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    price: 2300,
    image: "/images/pad.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM",
    price: 70,
    image: "/images/earbuds.png",
    inStock: true,
  },
  {
    id: 4,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones with Wireless Charging Case",
    price: 220,
    oldPrice: 250,
    image: "/images/ps5.png",
    inStock: false,
  },
  {
    id: 5,
    name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Camera",
    price: 1499.99,
    image: "/images/earbuds.png",
    inStock: true,
  },
];
