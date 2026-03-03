import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Badge,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import { ArrowRightIcon } from "@/components/icons/GeneralIcons";

import type { Product } from "@/types";

const Link = chakra(RouterLink);

const calculatePrice = (item: Product) => {
  const price = Number(item.price);
  const discount = Number(item.discountValue);

  if (item.discountType === "percentage") {
    return price - (price * discount) / 100;
  }

  if (item.discountType === "fixed") {
    return price - discount;
  }

  return price;
};

const getDiscountLabel = (item: Product) => {
  if (!item.discountType) return null;

  if (item.discountType === "percentage") {
    return `${item.discountValue}% OFF`;
  }

  if (item.discountType === "fixed") {
    const percent = (Number(item.discountValue) / Number(item.price)) * 100;
    return `${Math.round(percent)}% OFF`;
  }
};

export const CarouselItem = ({ item }: { item: Product }) => {
  const [imgError, setImgError] = useState(false);

  const finalPrice = calculatePrice(item);

  return (
    <Box key={item.id}>
      <Flex
        p={{ base: 6, md: 10 }}
        align="center"
        justify="space-between"
        gap={{ base: 6, md: 10 }}
        direction={{ base: "column", md: "row" }}
        minH={{ base: "auto", md: "380px" }}
      >
        <VStack align="start" gap={4} maxW={{ md: "56%" }}>
          <Text fontSize="sm" color="blue.500" fontWeight="semibold">
            BEST DEAL
          </Text>

          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
            {item.name}
          </Text>

          <Text color="gray.600" lineClamp={2}>
            {item.description}
          </Text>

          <Link
            to={`/products/${item.slug}`}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              w="full"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
              size="md"
              alignSelf="start"
            >
              Shop Now
              <ArrowRightIcon />
            </Button>
          </Link>
        </VStack>

        <Box position="relative" w={"full"}>
          <Box
            w="full"
            h={{ base: "240px", md: "280px" }}
            bg={!item.image || imgError ? "gray.200" : "transparent"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {item.image && !imgError ? (
              <Image
                src={item.image ?? ""}
                alt={item.name}
                objectFit="cover"
                w="100%"
                h="100%"
                onError={() => setImgError(true)}
              />
            ) : (
              <Flex w={"full"} h={"full"} alignItems={"center"} justifyContent={"center"}>
                <Text color="gray.500" fontSize="sm">
                  No Image
                </Text>
              </Flex>
            )}
          </Box>

          <Badge
            position="absolute"
            top="-2"
            right="-3"
            rounded="full"
            px="4"
            py="3"
            fontSize="lg"
            bg="blue.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "blue.500" }}
            _active={{ bg: "blue.500" }}
          >
            ${finalPrice.toFixed(0)}
          </Badge>
        </Box>
      </Flex>
    </Box>
  );
};

export const FirstItem = ({ item }: { item: Product }) => {
  return (
    <Flex
      bg="black"
      color="white"
      p={{ base: 4, md: 6 }}
      rounded="xs"
      w="full"
      justify="space-between"
      align="center"
      flex={1}
      gap={1}
    >
      <VStack align="start" gap={2}>
        <Text fontSize="sm" color="yellow.400" fontWeight="semibold">
          BEST DEALS
        </Text>
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          {item.name}
        </Text>
        <Link to={`/products/${item.slug}`} _hover={{ textDecoration: "none" }}>
          <Button
            w="full"
            textTransform="uppercase"
            bg="orange.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "orange.500" }}
            _active={{ bg: "orange.500" }}
            size="md"
            alignSelf="start"
          >
            Shop Now
            <ArrowRightIcon />
          </Button>
        </Link>
      </VStack>
      <Box position="relative">
        <Image src={item.image ?? ""} alt={item.name} boxSize="120px" />

        {getDiscountLabel(item) && (
          <Badge
            bg="yellow.400"
            color="black"
            position="absolute"
            top="0"
            left="-3"
            rounded="md"
            px="2"
          >
            {getDiscountLabel(item)}
          </Badge>
        )}
      </Box>
    </Flex>
  );
};

export const SecondItem = ({ item }: { item: Product }) => {
  return (
    <Flex
      bg="gray.50"
      p={{ base: 4, md: 6 }}
      rounded="xs"
      w="full"
      justify="space-between"
      align="center"
      flex={1}
      gap={1}
    >
      <Image src={item.image ?? ""} alt={item.name} boxSize="120px" />
      <VStack align="start" gap={2}>
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          {item.name}
        </Text>
        <Text color="blue.500" fontWeight="semibold">
          ${item.price} USD
        </Text>
        <Link to={`/products/${item.slug}`} _hover={{ textDecoration: "none" }}>
          <Button
            w="full"
            textTransform="uppercase"
            bg="orange.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "orange.500" }}
            _active={{ bg: "orange.500" }}
            size="md"
            alignSelf="start"
          >
            Shop Now
            <ArrowRightIcon />
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};
