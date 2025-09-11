import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  GridItem,
  SimpleGrid,
  Badge,
  VStack,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { Truck, Trophy, Lock, Headphones } from "lucide-react";

import Slider from "react-slick";

type Slide = {
  eyebrow: string;
  title: string;
  copy: string;
  price: string;
  img: string;
};

const slides: Slide[] = [
  {
    eyebrow: "THE BEST PLACE TO PLAY",
    title: "Xbox Consoles",
    copy: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    price: "$299",
    img: "/images/ps5.png",
  },
  {
    eyebrow: "LIMITED DEAL",
    title: "Xbox Series S Bundle",
    copy: "Extra controller + 1 month Game Pass included.",
    price: "$349",
    img: "/images/earbuds.png",
  },
  {
    eyebrow: "NEW ARRIVAL",
    title: "Wireless Elite Controller",
    copy: "Pro-level precision and interchangeable components.",
    price: "$169",
    img: "/images/ps5.png",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <SimpleGrid
        columns={{ base: 1, md: 5, lg: 3 }}
        gap={{ base: 6, md: 3, lg: 6 }}
      >
        <GridItem colSpan={{ base: 1, md: 3, lg: 2 }}>
          <Box bg="gray.50" rounded="xs" overflow="hidden" position="relative">
            <Global
              styles={{
                ".slick-dots": {
                  left: "16px",
                  right: "auto",
                  textAlign: "left",
                  bottom: "16px",
                },
                ".slick-dots li": {
                  margin: "0 4px",
                },
                ".slick-dots li button:before": {
                  fontSize: "10px",
                  color: "#CBD5E1", // slate-300
                  opacity: "1",
                },
                ".slick-dots li.slick-active button:before": {
                  color: "#1E293B", // slate-800
                  opacity: "1",
                },
              }}
            />
            <Slider {...settings}>
              {slides.map((s, i) => (
                <Box key={i}>
                  <Flex
                    p={{ base: 6, md: 10 }}
                    align="center"
                    justify="space-between"
                    gap={{ base: 6, md: 10 }}
                    direction={{ base: "column", md: "row" }}
                    minH={{ base: "auto", md: "380px" }}
                  >
                    <VStack align="start" gap={4} maxW={{ md: "56%" }}>
                      <Text
                        fontSize="sm"
                        color="blue.500"
                        fontWeight="semibold"
                      >
                        {s.eyebrow}
                      </Text>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                      >
                        {s.title}
                      </Text>
                      <Text color="gray.600">{s.copy}</Text>
                      <Button colorScheme="orange" size="md" alignSelf="start">
                        Shop Now
                      </Button>
                    </VStack>

                    <Box position="relative">
                      <Image
                        src={s.img}
                        alt={s.title}
                        boxSize={{ base: "240px", md: "280px" }}
                        objectFit="contain"
                      />
                      <Badge
                        position="absolute"
                        top="-2"
                        right="-3"
                        rounded="full"
                        px="4"
                        py="3"
                        fontSize="lg"
                        colorScheme="blue"
                      >
                        {s.price}
                      </Badge>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Slider>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
          <Flex direction={"column"} gap={{ base: 6, md: 3, lg: 4 }} h={"full"}>
            <Flex
              bg="black"
              color="white"
              p={{ base: 5, md: 6 }}
              rounded="xs"
              w="full"
              justify="space-between"
              align="center"
              flex={1}
            >
              <VStack align="start" gap={2}>
                <Text fontSize="sm" color="yellow.400" fontWeight="semibold">
                  SUMMER SALES
                </Text>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                  New Google Pixel 6 Pro
                </Text>
                <Button colorScheme="orange" size="sm">
                  Shop Now
                </Button>
              </VStack>
              <Box position="relative">
                <Image
                  src="/images/pad.png"
                  alt="Google Pixel"
                  boxSize="120px"
                />
                <Badge
                  bg="yellow.400"
                  color="black"
                  position="absolute"
                  top="0"
                  left="-3"
                  rounded="md"
                  px="2"
                >
                  29% OFF
                </Badge>
              </Box>
            </Flex>

            <Flex
              bg="gray.50"
              p={{ base: 5, md: 6 }}
              rounded="xs"
              w="full"
              justify="space-between"
              align="center"
              flex={1}
            >
              <Image
                src="/images/earbuds.png"
                alt="Xiaomi FlipBuds"
                boxSize="120px"
              />
              <VStack align="start" gap={2}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                  Xiaomi FlipBuds Pro
                </Text>
                <Text color="blue.500" fontWeight="semibold">
                  $299 USD
                </Text>
                <Button colorScheme="orange" size="sm">
                  Shop Now
                </Button>
              </VStack>
            </Flex>
          </Flex>
        </GridItem>
      </SimpleGrid>

      {/* Feature boxes */}
      <SimpleGrid
        bg="white"
        mt={10}
        p={6}
        rounded="xs"
        borderColor="gray.100"
        border="0.5px solid"
        columns={{ base: 1, md: 2, xl: 4 }}
        gap={{ base: 6 }}
      >
        <GridItem colSpan={1}>
          <Stack
            gap={3}
            align={{ base: "center" }}
            direction={{ base: "column", md: "row" }}
            borderRight={{ md: "0.5px solid" }}
          >
            <Truck size={20} />
            <VStack align="start" gap={0}>
              <Text fontWeight="bold">Fast Delivery</Text>
              <Text fontSize="sm" color="gray.500">
                Delivery in 24/H
              </Text>
            </VStack>
          </Stack>
        </GridItem>
        <Separator
          orientation={{ base: "horizontal", md: "vertical" }}
          display={{ md: "none" }}
        />
        <GridItem colSpan={1}>
          <Stack
            gap={3}
            align={{ base: "center" }}
            direction={{ base: "column", md: "row" }}
            borderRight={{ xl: "0.5px solid" }}
          >
            <Trophy size={20} />
            <VStack align="start" gap={0}>
              <Text fontWeight="bold">24 Hours Return</Text>
              <Text fontSize="sm" color="gray.500">
                100% money-back guarantee
              </Text>
            </VStack>
          </Stack>
        </GridItem>
        <Separator
          orientation={{ base: "horizontal", md: "vertical" }}
          display={{ md: "none" }}
        />
        <GridItem colSpan={1}>
          <Stack
            gap={3}
            align={{ base: "center" }}
            direction={{ base: "column", md: "row" }}
            borderRight={{ md: "0.5px solid" }}
          >
            <Lock size={20} />
            <VStack align="start" gap={0}>
              <Text fontWeight="bold">Secure Payment</Text>
              <Text fontSize="sm" color="gray.500">
                Your money is safe
              </Text>
            </VStack>
          </Stack>
        </GridItem>
        <Separator
          orientation={{ base: "horizontal", md: "vertical" }}
          display={{ md: "none" }}
        />
        <GridItem colSpan={1}>
          <Stack
            gap={3}
            align={{ base: "center" }}
            direction={{ base: "column", md: "row" }}
          >
            <Headphones size={20} />
            <VStack align="start" gap={0}>
              <Text fontWeight="bold">Support 24/7</Text>
              <Text fontSize="sm" color="gray.500">
                Live contact/message
              </Text>
            </VStack>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Hero;
