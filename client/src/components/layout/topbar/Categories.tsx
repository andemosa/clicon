import {
  Box,
  Button,
  HStack,
  Image,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- Data Model with products ---
const categories = [
  {
    label: "Computer & Laptop",
    sub: [
      {
        label: "Laptops",
        products: [
          { name: "Dell XPS 13", price: "$999", img: "/laptop1.png" },
          { name: "MacBook Air", price: "$1199", img: "/laptop2.png" },
        ],
        promo: {
          title: "Hot Laptop Deals",
          desc: "Save up to 30% on selected laptops!",
        },
      },
      {
        label: "Desktops",
        products: [
          { name: "iMac 24”", price: "$1499", img: "/desktop1.png" },
          { name: "HP Pavilion", price: "$899", img: "/desktop2.png" },
        ],
        promo: {
          title: "Workstation Discounts",
          desc: "Boost your setup with new desktops",
        },
      },
    ],
  },
  {
    label: "SmartPhone",
    sub: [
      {
        label: "iPhone",
        products: [
          { name: "iPhone 14 Pro", price: "$999", img: "/iphone1.png" },
          { name: "iPhone 13", price: "$699", img: "/iphone2.png" },
        ],
        promo: {
          title: "Apple Sale",
          desc: "Latest iPhones with special offers",
        },
      },
      {
        label: "Samsung",
        products: [
          { name: "Samsung Galaxy S23", price: "$850", img: "/samsung1.png" },
          { name: "Samsung A54", price: "$399", img: "/samsung2.png" },
        ],
        promo: {
          title: "Galaxy Week",
          desc: "Big discounts on Samsung devices",
        },
      },
    ],
  },
];

const CategoriesMenu = () => {
  const [open, setOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button
          bg={open ? "orange.500" : "gray.50"}
          color={open ? "white" : "gray.900"}
          size="sm"
          borderRadius={"xs"}
          _hover={{ bg: "orange.500", color: "white" }}
        >
          All Category {open ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="250px"
            shadow="lg"
            borderWidth="1px"
            p={0}
            position="relative"
          >
            <VStack align="stretch" gap={0}>
              {categories.map((cat) => (
                <Box
                  key={cat.label}
                  px={4}
                  py={2}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onMouseEnter={() => {
                    setHoveredCat(cat.label);
                    setHoveredSub(null);
                  }}
                >
                  <HStack justify="space-between">
                    <Text>{cat.label}</Text>
                    {cat.sub && <ChevronRightIcon />}
                  </HStack>

                  {/* --- SUBCATEGORIES (Level 2) --- */}
                  {cat.sub && hoveredCat === cat.label && (
                    <Box
                      position="absolute"
                      top="0"
                      left="100%"
                      bg="white"
                      shadow="md"
                      borderWidth="1px"
                      minW="200px"
                      zIndex={10}
                    >
                      <VStack align="stretch" gap={0}>
                        {cat.sub.map((sub) => (
                          <Box
                            key={sub.label}
                            px={4}
                            py={2}
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            onMouseEnter={() => setHoveredSub(sub.label)}
                          >
                            <HStack justify="space-between">
                              <Text>{sub.label}</Text>
                              <ChevronRightIcon />
                            </HStack>
                          </Box>
                        ))}
                      </VStack>

                      {/* --- PRODUCTS & PROMO (Level 3) --- */}
                      {hoveredSub &&
                        cat.sub.find((s) => s.label === hoveredSub) && (
                          <Box
                            position="absolute"
                            top="0"
                            left="100%"
                            bg="white"
                            shadow="lg"
                            borderWidth="1px"
                            minW="400px"
                            maxW="600px"
                            maxH="80vh"
                            overflowY="auto"
                            zIndex={20}
                            p={4}
                          >
                            <HStack align="start" gap={6}>
                              {/* Product List */}
                              <VStack align="stretch" gap={3} flex="2">
                                {cat.sub
                                  .find((s) => s.label === hoveredSub)
                                  ?.products.map((prod) => (
                                    <HStack
                                      key={prod.name}
                                      gap={3}
                                      borderWidth="1px"
                                      borderRadius="md"
                                      p={2}
                                      _hover={{ shadow: "md" }}
                                    >
                                      <Image
                                        boxSize="50px"
                                        objectFit="cover"
                                        src={prod.img}
                                        alt={prod.name}
                                      />
                                      <VStack
                                        align="start"
                                        gap={0}
                                        fontSize="sm"
                                      >
                                        <Text fontWeight="medium">
                                          {prod.name}
                                        </Text>
                                        <Text color="orange.500">
                                          {prod.price}
                                        </Text>
                                      </VStack>
                                    </HStack>
                                  ))}
                              </VStack>

                              {/* Promo Banner */}
                              <Box
                                flex="1"
                                p={4}
                                bg="orange.100"
                                borderRadius="md"
                                textAlign="center"
                              >
                                <Text fontWeight="bold" fontSize="lg">
                                  {
                                    cat.sub.find((s) => s.label === hoveredSub)
                                      ?.promo.title
                                  }
                                </Text>
                                <Text fontSize="sm" color="gray.600" mb={2}>
                                  {
                                    cat.sub.find((s) => s.label === hoveredSub)
                                      ?.promo.desc
                                  }
                                </Text>
                                <Button
                                  size="sm"
                                  colorScheme="orange"
                                  variant="solid"
                                >
                                  Shop Now
                                </Button>
                              </Box>
                            </HStack>
                          </Box>
                        )}
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default CategoriesMenu;
