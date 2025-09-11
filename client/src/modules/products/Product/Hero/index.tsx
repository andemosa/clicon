import { SimpleGrid } from "@chakra-ui/react";
import Details from "./Details";
import Images from "./Images";

const Hero = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
      <Images />
      <Details />
    </SimpleGrid>
  );
};

export default Hero;
