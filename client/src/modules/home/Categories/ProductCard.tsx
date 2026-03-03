import { useState } from "react";
import {
  Image,
  Text,
  Stack,
  HStack,
  Badge,
  chakra,
  VStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import type { Product } from "@/types";

const Link = chakra(RouterLink);

const ProductCard = ({ product }: { product: Partial<Product> }) => {
  const [imgError, setImgError] = useState(false);

  const price = Number(product.price);
  const discount = Number(product.discountValue ?? 0);

  let finalPrice = price;

  if (product.discountType === "percentage") {
    finalPrice = price - (price * discount) / 100;
  }

  if (product.discountType === "fixed") {
    finalPrice = price - discount;
  }

  const hasDiscount = product.discountType && discount > 0;

  const getBadgeText = () => {
    if (!hasDiscount) return null;

    if (product.discountType === "percentage") {
      return `${discount}% OFF`;
    }

    if (product.discountType === "fixed") {
      return `$${discount} OFF`;
    }

    return null;
  };

  return (
    <>
      <VStack
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        p={3}
        position="relative"
        role="group"
        transition="all 0.2s ease-in-out"
      >
        <VStack position="relative" role="group" flex={1} w={"full"}>
          <Box
            w="100%"
            h="200px"
            bg={!product.image || imgError ? "gray.200" : "transparent"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {product.image && !imgError ? (
              <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                w="100%"
                h="100%"
                onError={() => setImgError(true)}
              />
            ) : (
              <Flex
                w={"full"}
                h={"full"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text color="gray.500" fontSize="sm">
                  No Image
                </Text>
              </Flex>
            )}
          </Box>

          {getBadgeText() && (
            <Badge
              position="absolute"
              top={2}
              left={2}
              colorScheme="green"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
              bg={"blue.500"}
              color={"white"}
            >
              {getBadgeText()}
            </Badge>
          )}
        </VStack>

        {/* Product details */}
        <Link
          to={`/products/${product.slug}`}
          _hover={{ textDecoration: "none" }}
          w={"full"}
          mt={"auto"}
        >
          <Stack gap={1} w={"full"}>
            <Text fontSize="sm" lineClamp={1}>
              {product.name}
            </Text>
            <HStack gap={2}>
              {hasDiscount ? (
                <>
                  <Text fontSize="md" color="blue.500" fontWeight="semibold">
                    ${finalPrice.toFixed(2)}
                  </Text>
                  <Text
                    as="s"
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="medium"
                  >
                    ${price.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text fontSize="md" color="blue.500" fontWeight="semibold">
                  ${price.toFixed(2)}
                </Text>
              )}
            </HStack>
          </Stack>
        </Link>
      </VStack>
    </>
  );
};

export default ProductCard;
