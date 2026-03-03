import { useState } from "react";
import {
  Box,
  SimpleGrid,
  Skeleton,
  Alert,
  Stack,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";

import CategoryCarousel from "./CategorySelector";
import ProductCard from "./ProductCard";

import type { Category } from "@/types";
import { useHomepageCategoriesQuery } from "@/services/category/category.hooks";
import { Package } from "lucide-react";

const Categories = () => {
  const { data, isLoading, isError } = useHomepageCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6} mt={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box borderWidth="1px" borderRadius="md" p={3} key={i}>
            <Skeleton height="200px" borderRadius="md" />
            <Stack mt={3} gap={2}>
              <Skeleton height="14px" width="80%" />
              <Skeleton height="16px" width="40%" />
            </Stack>
          </Box>
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

  if (data) {
    const activeCategory = selectedCategory ?? data[0];
    const products = activeCategory?.products ?? [];

    return (
      <Box
        px={{ base: 6, lg: 12 }}
        py={{ base: 6, lg: 12 }}
        maxW={{ base: "full", xl: "1440px" }}
        mx="auto"
        w="full"
      >
        <CategoryCarousel
          categories={data}
          selected={activeCategory}
          onSelect={(cat) => setSelectedCategory(cat)}
        />

        {products.length === 0 ? (
          <VStack
            mt={10}
            py={16}
            borderWidth="1px"
            borderRadius="md"
            borderStyle="dashed"
            borderColor="gray.300"
            gap={4}
          >
            <Icon w="max-content" h="auto" boxSize={10} alignSelf={"start"}>
              <Package />
            </Icon>
            <Text fontWeight="medium" color="gray.600">
              No products available in this category
            </Text>
            <Text fontSize="sm" color="gray.500">
              Please check back later.
            </Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    );
  }

  return null;
};

export default Categories;
