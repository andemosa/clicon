import {
  Box,
  Alert,
  Stack,
  Text,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { getRouteApi } from "@tanstack/react-router";

import Hero from "./Hero";
import ProductInfo from "./Info";

import { useProductQuery } from "@/services/product/product.hooks";

const ProductPage = () => {
  const routeApi = getRouteApi("/products/$productId");
  const params = routeApi.useParams();

  const { data, isFetching, isError } = useProductQuery(
    params.productId
  );

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>
            Failed to fetch product.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (isFetching && !data) {
    return (
      <Stack gap={6} p={10} w="full">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={8}
          alignItems="start"
        >
          <Skeleton h="400px" rounded="md" />

          <Stack gap={4}>
            <SkeletonText noOfLines={2} />
            <SkeletonText noOfLines={4} />
            <Skeleton h="40px" w="120px" rounded="md" />
          </Stack>
        </SimpleGrid>
      </Stack>
    );
  }

  if (!data) {
    return (
      <Stack p={10} align="center">
        <Text>No product data found.</Text>
      </Stack>
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
      <Hero product={data} />
      <ProductInfo product={data} />
    </Box>
  );
};

export default ProductPage;