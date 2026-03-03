import { Box, Tabs, useTabs, Text } from "@chakra-ui/react";

import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const tabs = useTabs({
    defaultValue: "description",
  });

  return (
    <Box border="1px solid" borderColor="gray.100" mt={10}>
      <Tabs.RootProvider value={tabs}>
        <Tabs.List justifyContent="center">
          <Tabs.Trigger value="description" textTransform="uppercase">
            Description
          </Tabs.Trigger>
          <Tabs.Trigger value="reviews" textTransform="uppercase">
            Reviews
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="description" p={6}>
          <Text color="gray.600">{product.description}</Text>
        </Tabs.Content>

        <Tabs.Content value="reviews" p={6}>
          <Text color="gray.600">
            ⭐ {product.averageRating} average rating
          </Text>
        </Tabs.Content>
      </Tabs.RootProvider>
    </Box>
  );
};

export default ProductInfo;