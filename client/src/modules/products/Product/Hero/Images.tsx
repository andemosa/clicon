import { Box, Image, VStack } from "@chakra-ui/react";
import type { Product } from "@/types";

interface ImagesProps {
  product: Product;
}

const Images = ({ product }: ImagesProps) => {
  return (
    <VStack w="100%" gap={6} align="stretch">
      <Box borderRadius="lg" overflow="hidden">
        <Image
          src={product.image!}
          alt={product.name}
          w="100%"
          borderRadius="lg"
          border="2px solid"
          borderColor="gray.200"
        />
      </Box>
    </VStack>
  );
};

export default Images;
