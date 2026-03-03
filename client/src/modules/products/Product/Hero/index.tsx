import { SimpleGrid } from "@chakra-ui/react";

import Details from "./Details";
import Images from "./Images";

import type { Product } from "@/types";

interface HeroProps {
  product: Product;
}

const Hero = ({ product }: HeroProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
      <Images product={product} />
      <Details product={product} />
    </SimpleGrid>
  );
};

export default Hero;