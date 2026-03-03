import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  NumberInput,
  Portal,
  RatingGroup,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import type { Product } from "@/types";

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const roundToHalf = (rating: number) => {
  return Math.round(rating * 2) / 2;
};

const QuickView = ({ isOpen, onClose, product }: QuickViewProps) => {
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
  const inStock = product.stock > 0;

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="900px">
            <Dialog.Header>
            </Dialog.Header>

            <Dialog.Body>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                <Box borderRadius="md" overflow="hidden">
                  <Image
                    src={product.image!}
                    alt={product.name}
                    w="100%"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  />
                </Box>

                <Stack gap={4}>
                  <Box>
                    <HStack gap={2}>
                      <RatingGroup.Root
                        readOnly
                        count={5}
                        defaultValue={roundToHalf(product.averageRating)}
                        allowHalf
                        size="sm"
                        colorPalette="orange"
                      >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                      <Text fontSize="sm">({product.salesCount} sold)</Text>
                    </HStack>

                    <Heading size="md" mt={2}>
                      {product.name}
                    </Heading>
                  </Box>

                  <Separator />

                  <HStack gap={3}>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                      ${finalPrice.toFixed(2)}
                    </Text>

                    {hasDiscount && (
                      <Text
                        fontSize="md"
                        textDecoration="line-through"
                        color="gray.400"
                      >
                        ${price.toFixed(2)}
                      </Text>
                    )}

                    {product.discountType === "percentage" && (
                      <Badge colorScheme="green">{discount}% OFF</Badge>
                    )}

                    {product.discountType === "fixed" && (
                      <Badge colorScheme="green">${discount} OFF</Badge>
                    )}
                  </HStack>

                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={inStock ? "green.500" : "red.500"}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </Text>

                  <HStack gap={4} pt={2}>
                    <NumberInput.Root
                      defaultValue="1"
                      min={1}
                      max={product.stock}
                      disabled={!inStock}
                      unstyled
                      spinOnPress={false}
                    >
                      <HStack>
                        <NumberInput.DecrementTrigger asChild>
                          <IconButton size="sm" variant="outline">
                            <Minus />
                          </IconButton>
                        </NumberInput.DecrementTrigger>

                        <NumberInput.ValueText minW="3ch" textAlign="center" />

                        <NumberInput.IncrementTrigger asChild>
                          <IconButton size="sm" variant="outline">
                            <Plus />
                          </IconButton>
                        </NumberInput.IncrementTrigger>
                      </HStack>
                    </NumberInput.Root>

                    <Button
                      flex={1}
                      bg="orange.500"
                      color="white"
                      _hover={{ bg: "orange.600" }}
                      disabled={!inStock}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </Button>
                  </HStack>
                </Stack>
              </SimpleGrid>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default QuickView;
