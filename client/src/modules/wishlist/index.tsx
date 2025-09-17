import {
  Box,
  Text,
  Table,
  Button,
  IconButton,
  Image,
  Flex,
  Skeleton,
  chakra,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { CircleX, ArrowRightIcon, ShoppingCart } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

import { useProfileQuery } from "@/services/profile/profile.hooks";

const NavigateLink = chakra(RouterLink);

const WishlistPage = () => {
  const { data, isFetching, isError } = useProfileQuery();

  if (!isFetching && (isError || !data)) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        color={"gray.900"}
      >
        <Stack
          mx={"auto"}
          align={"center"}
          textAlign={"center"}
          w={"full"}
          maxW={"600px"}
          gap={1}
          p={{ base: 4, md: 6 }}
        >
          <Image src="/images/404.webp" alt="404 Illustration" maxW="320px" />
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb={3}
          >
            Not Signed in
          </Heading>
          <Text color="gray.600" maxW="lg" mb={2}>
            Sorry, you need to be signed in to see your wishlist.
          </Text>
          <NavigateLink
            to={"/signin"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              size="md"
              w="max-content"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
            >
              Signin&nbsp;
              <ArrowRightIcon />
            </Button>
          </NavigateLink>
        </Stack>
      </Flex>
    );
  }

  if (isFetching) {
    return (
      <Flex px={6} py={6}>
        <Skeleton height="300px" width="full" />
      </Flex>
    );
  }

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
        <Text
          color={"gray.900"}
          fontSize="lg"
          fontWeight="medium"
          p={{ base: 4 }}
        >
          Wishlist
        </Text>

        <Table.ScrollArea borderWidth="1px" w="full">
          <Table.Root size="sm" variant="outline">
            <Table.Header px={4}>
              <Table.Row>
                <Table.ColumnHeader textTransform={"uppercase"} maxW="400px">
                  Product
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
                  Stock Status
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textTransform={"uppercase"}
                  textAlign="center"
                >
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body px={4}>
              {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
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
                  </Table.Cell>

                  <Table.Cell textAlign="center">
                    <Flex gap={2} justify="center" align="center">
                      {item.oldPrice && (
                        <Text as="s" color="gray.500" fontSize="sm">
                          ${item.oldPrice.toFixed(2)}
                        </Text>
                      )}
                      <Text fontWeight="bold" fontSize="md">
                        ${item.price.toFixed(2)}
                      </Text>
                    </Flex>
                  </Table.Cell>

                  <Table.Cell textAlign="center">
                    <Text
                      fontWeight="semibold"
                      color={item.inStock ? "green.500" : "red.500"}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Text>
                  </Table.Cell>

                  <Table.Cell textAlign="center">
                    <Flex justify="center" gap={2}>
                      <Button
                        size="md"
                        textTransform="uppercase"
                        bg="orange.500"
                        color="white"
                        fontWeight={700}
                        disabled={!item.inStock}
                        _hover={{ bg: "orange.500" }}
                        _active={{ bg: "orange.500" }}
                      >
                        Add to Cart <ShoppingCart />
                      </Button>
                      <IconButton
                        aria-label="Remove item"
                        size="sm"
                        variant="ghost"
                      >
                        <CircleX />
                      </IconButton>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Box>
  );
};

export default WishlistPage;

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
