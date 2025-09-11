import { Box } from "@chakra-ui/react";
import Hero from "./Hero";
import ProductInfo from "./Info";

const ProductPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Hero />
      <ProductInfo />
    </Box>
  );
};

export default ProductPage;
