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
} from "@chakra-ui/react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import QuickView from "./QuickView";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  badge?: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    price: 1200,
    discountPrice: 720,
    badge: "40% Off",
    image: "/images/pad.png",
  },
  {
    id: 2,
    name: "Canon EOS 1500D DSLR Camera",
    price: 550,
    image: "/images/ps5.png",
    badge: "Sold Out",
  },
  {
    id: 3,
    name: "Apple AirPods Pro (2nd Gen)",
    price: 250,
    discountPrice: 199,
    image: "/images/earbuds.png",
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 6",
    price: 320,
    image: "/images/pad.png",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 400,
    discountPrice: 349,
    image: "/images/earbuds.png",
    badge: "12% Off",
  },
  {
    id: 6,
    name: "MacBook Pro 14-inch M3",
    price: 2400,
    image: "/images/pad.png",
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    price: 1200,
    discountPrice: 1100,
    image: "/images/ps5.png",
    badge: "Hot Deal",
  },
  {
    id: 8,
    name: "Logitech MX Master 3S Mouse",
    price: 120,
    image: "/images/pad.png",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [hovered, setHovered] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
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
        <Box position="relative" role="group">
          <Image
            src={product.image}
            alt={product.name}
            borderRadius="md"
            w="full"
          />

          {product.badge && (
            <Badge
              position="absolute"
              top={2}
              left={2}
              colorScheme={
                product.badge.toLowerCase().includes("off")
                  ? "green"
                  : product.badge.toLowerCase().includes("sold")
                    ? "red"
                    : "orange"
              }
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
            >
              {product.badge}
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
        </Box>

        {/* Product details */}
        <Stack gap={1} mt={3}>
          <Text fontSize="sm">{product.name}</Text>
          <HStack gap={2}>
            {product.discountPrice ? (
              <>
                <Text fontSize="md" color="blue.500" fontWeight="semibold">
                  ${product.discountPrice}
                </Text>
                <Text as="s" fontSize="sm" color="gray.500" fontWeight="medium">
                  ${product.price}
                </Text>
              </>
            ) : (
              <Text fontSize="md" color="blue.500" fontWeight="semibold">
                ${product.price}
              </Text>
            )}
          </HStack>
        </Stack>
      </Box>
      <QuickView isOpen={open} onClose={onClose} />
    </>
  );
};

const BestDeals = () => {
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
          <Heading fontSize={{ base: "md", sm: "lg" }}>Best Deals</Heading>
          <Flex fontSize={{ base: "xs", sm: "sm" }} align={"center"} gap={2}>
            <Text>Deals ends in</Text>
            <Badge
              bg={"yellow.300"}
              color={"gray.900"}
              px={2}
              py={1}
              rounded="md"
              size={{ base: "xs", sm: "sm" }}
            >
              16d : 21h : 57m : 23s
            </Badge>
          </Flex>
        </Flex>
        <Text fontSize={{ base: "xs", sm: "sm" }} color={"blue.500"}>
          Browse All Product
        </Text>
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
