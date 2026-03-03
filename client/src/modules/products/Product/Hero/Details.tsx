import {
  Badge,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  IconButton,
  NumberInput,
  RatingGroup,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  Facebook,
  Twitter,
  ShieldCheck,
  Copy,
  Heart,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";

import type { Product } from "@/types";

interface DetailsProps {
  product: Product;
}

const roundToHalf = (rating: number) => {
  return Math.round(rating * 2) / 2;
};

const Details = ({ product }: DetailsProps) => {
  const hasDiscount = !!product.discountType;

  const discountedPrice =
    product.discountType === "percentage"
      ? product.price - (product.price * product.discountValue!) / 100
      : product.price;

  const inStock = product.stock > 0;

  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <Box>
          <Flex align={"center"} gap={2}>
            <RatingGroup.Root
              readOnly
              count={5}
              defaultValue={roundToHalf(product.averageRating)}
              allowHalf
              colorPalette={"orange"}
              size="sm"
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            <Flex align={"center"} gap={1}>
              <Text>{product.averageRating} Star Rating</Text>
              <Text>({product.salesCount} sold)</Text>
            </Flex>
          </Flex>
          <Heading mt={1}>{product.name}</Heading>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 2 }}>
          <Flex align={"center"} gap={1}>
            <Text>Availability:</Text>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={inStock ? "green.500" : "red.500"}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </Flex>

          <Flex align={"center"} gap={1}>
            <Text>Category:</Text>
            <Text fontWeight="semibold">{product.category.name}</Text>
          </Flex>
        </SimpleGrid>
      </Stack>

      <Separator />

      <HStack gap={4} align="center">
        <Text fontSize="3xl" fontWeight="bold" color="orange.500">
          ${discountedPrice.toFixed(2)}
        </Text>

        {hasDiscount && (
          <Text fontSize="lg" textDecoration="line-through" color="gray.400">
            ${product.price.toFixed(2)}
          </Text>
        )}

        {product.discountType === "percentage" && (
          <Badge colorScheme="green" fontSize="0.9em" px={2}>
            {product.discountValue}% OFF
          </Badge>
        )}
      </HStack>
      <SimpleGrid columns={{ base: 1, sm:4 }} gap={{ base: 2 }}>
        <GridItem colSpan={{ base: 1 }}>
          <NumberInput.Root
            defaultValue="1"
            unstyled
            spinOnPress={false}
            min={0}
            disabled={!inStock}
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
        </GridItem>
        <GridItem colSpan={{ base: 2 }}>
          <Button
            size="md"
            w="full"
            textTransform="uppercase"
            bg="orange.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "orange.500" }}
            _active={{ bg: "orange.500" }}
            disabled={!inStock}
          >
            {inStock ? (
              <>
                Add to Cart <ShoppingCart />
              </>
            ) : (
              "Out of Stock"
            )}
          </Button>
        </GridItem>
        <GridItem colSpan={{ base: 1 }}>
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
          >
            View Cart
          </Button>
        </GridItem>
      </SimpleGrid>
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={"center"}
        justify={"space-between"}
        gap={4}
      >
        <Flex align={"center"} gap={4}>
          <Flex align={"center"} gap={1}>
            <IconButton size="sm" variant={"ghost"}>
              <Heart />
            </IconButton>
            <Text>Add to wishlist</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <IconButton size="sm" variant={"ghost"}>
              <RefreshCcw />
            </IconButton>
            <Text>Add to Compare</Text>
          </Flex>
        </Flex>
        <Flex align={"center"} gap={1}>
          <Text>Share product:</Text>
          <HStack gap={1}>
            <IconButton
              aria-label="Share to Facebook"
              size="sm"
              variant={"ghost"}
            >
              <Facebook />
            </IconButton>
            <IconButton
              aria-label="Share to Twitter"
              size="sm"
              variant={"ghost"}
            >
              <Twitter />
            </IconButton>
            <IconButton size="sm" variant={"ghost"}>
              <Copy />
            </IconButton>
          </HStack>
        </Flex>
      </Flex>

      <Separator />

      <Box
        w="full"
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        bg="gray.50"
      >
        <HStack gap={2} mb={2}>
          <ShieldCheck size={18} />
          <Text fontSize="sm" fontWeight="semibold">
            100% Guarantee Safe Checkout
          </Text>
        </HStack>

        <HStack gap={3} fontSize="xs" color="gray.500">
          <Text>Visa</Text>
          <Text>Mastercard</Text>
          <Text>PayPal</Text>
          <Text>Stripe</Text>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Details;
