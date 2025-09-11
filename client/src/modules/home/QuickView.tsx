/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  CloseButton,
  Dialog,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useState } from "react";

const images = [
  "/images/macbook-1.png",
  "/images/macbook-2.png",
  "/images/macbook-3.png",
  "/images/macbook-4.png",
  "/images/macbook-5.png",
];

const QuickView = ({ isOpen, onClose }: {isOpen: any, onClose: any}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
      
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
            {/* Left: Image gallery */}
            <Box position="relative">
              <Image
                src={images[activeIndex]}
                alt="Product"
                w="full"
                borderRadius="md"
              />

              <IconButton
                aria-label="Prev"
                icon={<ChevronLeft />}
                onClick={prev}
                position="absolute"
                top="50%"
                left={2}
                transform="translateY(-50%)"
                rounded="full"
                bg="white"
                shadow="md"
              />
              <IconButton
                aria-label="Next"
                icon={<ChevronRight />}
                onClick={next}
                position="absolute"
                top="50%"
                right={2}
                transform="translateY(-50%)"
                rounded="full"
                bg="white"
                shadow="md"
              />

              <HStack mt={4} spacing={3}>
                {images.map((src, i) => (
                  <Box
                    key={i}
                    borderWidth={i === activeIndex ? "2px" : "1px"}
                    borderColor={i === activeIndex ? "orange.400" : "gray.200"}
                    rounded="md"
                    p={1}
                    cursor="pointer"
                    onClick={() => setActiveIndex(i)}
                  >
                    <Image src={src} alt={`thumb-${i}`} boxSize="60px" />
                  </Box>
                ))}
              </HStack>
            </Box>

            {/* Right: Product info */}
            <Stack spacing={4}>
              <Text fontSize="xl" fontWeight="bold">
                2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM,
                256GB SSD Storage) - Space Gray
              </Text>
              <Text fontSize="lg" color="blue.500" fontWeight="semibold">
                $1699{" "}
                <Text
                  as="span"
                  color="gray.500"
                  textDecor="line-through"
                  ml={2}
                >
                  $1999
                </Text>
              </Text>

              <Text color="green.500" fontWeight="medium">
                In Stock
              </Text>

              <Flex gap={3}>
                <Button
                  bg="orange.500"
                  color="white"
                  _hover={{ bg: "orange.600" }}
                  leftIcon={<ShoppingCart />}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" colorScheme="orange">
                  Buy Now
                </Button>
              </Flex>
            </Stack>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuickView;
