import {
  Box,
  Image,
  Text,
  Stack,
  IconButton,
  HStack,
  Badge,
  SimpleGrid,
  Flex,
  Heading,
  useDisclosure,
  chakra,
  Skeleton,
  Alert,
  VStack,
} from "@chakra-ui/react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

import QuickView from "./QuickView";

import { useHomePageQuery } from "@/services/product/product.hooks";
import type { Product } from "@/types";

const Link = chakra(RouterLink);

const ProductCardSkeleton = () => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={3}>
      <Skeleton height="200px" borderRadius="md" />
      <Stack mt={3} gap={2}>
        <Skeleton height="14px" width="80%" />
        <Skeleton height="16px" width="40%" />
      </Stack>
    </Box>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();

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
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
            flex={1}
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

          {hovered ? (
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bg="blackAlpha.500" // dim effect
            />
          ) : null}

          {hovered ? (
            <HStack
              gap={2}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <IconButton aria-label="Add to wishlist">
                <Heart size={18} />
              </IconButton>
              <IconButton aria-label="Quick view" onClick={onOpen}>
                <Eye size={18} />
              </IconButton>
              <IconButton aria-label="Add to cart">
                <ShoppingCart size={18} />
              </IconButton>
            </HStack>
          ) : null}
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
      {open ? (
        <QuickView isOpen={open} onClose={onClose} product={product} />
      ) : null}
    </>
  );
};

const BestDeals = () => {
  const { data, isLoading, isError } = useHomePageQuery();

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6} mt={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  if (isError) {
    return (
      <Box px={{ base: 6, lg: 12 }} py={{ base: 6, lg: 12 }}>
        <Alert.Root status="error" mt={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error occurred</Alert.Title>
            <Alert.Description>Failed to fetch products</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    );
  }

  const products = data?.bestSellers ?? [];

  if (!products.length) {
    return (
      <Box px={6} py={12} textAlign="center">
        <Text>No deals available at the moment.</Text>
      </Box>
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
      <Flex w="full" align={"center"} justify={"space-between"} gap={2}>
        <Flex
          align={{ base: "start", sm: "center" }}
          gap={{ base: 0, sm: 4 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Heading fontSize={{ base: "md", sm: "lg" }}>Best Sellers</Heading>
        </Flex>
        <Link href={"/shop"} _focus={{ boxShadow: "none", outline: "none" }}>
          <Text fontSize={{ base: "xs", sm: "sm" }} color={"blue.500"}>
            Browse All Product
          </Text>
        </Link>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6} mt={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BestDeals;
