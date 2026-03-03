import {
  Box,
  Button,
  chakra,
  HStack,
  Popover,
  Portal,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

import { useCategoryTreeQuery } from "@/services/category/category.hooks";

const Link = chakra(RouterLink);

const CategoriesMenu = () => {
  const { data: categories, isLoading } = useCategoryTreeQuery();

  const [open, setOpen] = useState(false);
  const [hoveredRoot, setHoveredRoot] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);

  const productsToShow = useBreakpointValue({
    base: 1,
    lg: 3,
  });

  // Auto-hover first root and first child
  useEffect(() => {
    if (categories?.length && !hoveredRoot) {
      const firstRoot = categories[0];
      setHoveredRoot(firstRoot.id);
      if (firstRoot.children?.length) {
        setHoveredChild(firstRoot.children[0].id);
      }
    }
  }, [categories]);

  // Auto-hover first child when root changes
  useEffect(() => {
    if (hoveredRoot) {
      const activeRoot = categories?.find((c) => c.id === hoveredRoot);
      if (activeRoot?.children?.length) {
        setHoveredChild(activeRoot.children[0].id);
      } else {
        setHoveredChild(null);
      }
    }
  }, [hoveredRoot, categories]);

  if (isLoading || !categories) return null;

  const activeRoot = categories.find((c) => c.id === hoveredRoot);
  const activeChild = activeRoot?.children?.find((c) => c.id === hoveredChild);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button
          bg={open ? "orange.500" : "gray.50"}
          color={open ? "white" : "gray.900"}
          size="sm"
          borderRadius="md"
          _hover={{ bg: "orange.500", color: "white" }}
          fontWeight="medium"
          gap={2}
        >
          All Categories
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w="90vw"
            maxW="1200px"
            minH="450px"
            shadow="xl"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={0}
          >
            <HStack align="stretch" gap={0}>
              {/* LEFT PANEL — ROOT CATEGORIES */}
              <VStack
                w="250px"
                bg="gray.50"
                align="stretch"
                gap={0}
                minH="450px"
                borderRight="1px solid"
                borderColor="gray.200"
                overflowY="auto"
              >
                {categories.map((cat) => (
                  <Box
                    key={cat.id}
                    px={4}
                    py={3}
                    bg={hoveredRoot === cat.id ? "white" : "gray.50"}
                    _hover={{ bg: "white" }}
                    cursor="pointer"
                    transition="background 0.2s"
                    onMouseEnter={() => setHoveredRoot(cat.id)}
                  >
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="medium">
                        {cat.name}
                      </Text>
                      {cat.children?.length > 0 && <ChevronRight size={16} />}
                    </HStack>
                  </Box>
                ))}
              </VStack>

              {/* MIDDLE PANEL — CHILD CATEGORIES */}
              <VStack
                w="250px"
                bg="gray.50"
                align="stretch"
                gap={0}
                minH="450px"
                borderRight="1px solid"
                borderColor="gray.200"
                overflowY="auto"
                py={4}
              >
                {activeRoot?.children?.length ? (
                  activeRoot.children.map((sub) => (
                    <Box
                      key={sub.id}
                      py={2}
                      px={2}
                      bg={hoveredChild === sub.id ? "white" : "gray.50"}
                      _hover={{ bg: "white" }}
                      cursor="pointer"
                      transition="all 0.2s"
                      onMouseEnter={() => setHoveredChild(sub.id)}
                    >
                      <HStack justify="space-between">
                        <Text fontSize="sm" fontWeight="medium">
                          {sub.name}
                        </Text>

                        {hoveredChild === sub.id && <ChevronRight size={16} />}
                      </HStack>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No subcategories
                  </Text>
                )}
              </VStack>

              {/* RIGHT PANEL — PRODUCTS */}
              <Box flex="1" p={6} bg="white">
                {activeChild?.products?.length ? (
                  <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                    {activeChild.products
                      .slice(0, productsToShow)
                      .map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          onClick={() => setOpen(false)}
                          _hover={{ textDecoration: "none" }}
                        >
                          <Box
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            _hover={{
                              shadow: "lg",
                              transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s"
                            cursor="pointer"
                          >
                            {p.image && (
                              <Image
                                src={p.image}
                                alt={p.name}
                                objectFit="cover"
                                w="100%"
                                h="160px"
                              />
                            )}

                            <Box p={3}>
                              <Text fontWeight="bold" lineClamp={2}>
                                {p.name}
                              </Text>

                              <Text
                                mt={2}
                                color="orange.500"
                                fontWeight="semibold"
                              >
                                ${p.price}
                              </Text>
                            </Box>
                          </Box>
                        </Link>
                      ))}
                  </SimpleGrid>
                ) : (
                  <Flex
                    align="center"
                    justify="center"
                    h="100%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Hover a subcategory to see products
                  </Flex>
                )}
              </Box>
            </HStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default CategoriesMenu;
