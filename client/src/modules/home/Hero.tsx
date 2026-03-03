import {
  Box,
  Flex,
  Text,
  GridItem,
  SimpleGrid,
  VStack,
  Stack,
  Skeleton,
  SkeletonCircle,
  Alert,
  Separator,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { Truck, Trophy, Lock, Headphones } from "lucide-react";
import Slider from "react-slick";

import { CarouselItem, FirstItem, SecondItem } from "./Items";

import { useHomePageQuery } from "@/services/product/product.hooks";
import type { Product } from "@/types";

const Hero = () => {
  const { data, isLoading, isError } = useHomePageQuery();

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

  if (isLoading) {
    return (
      <Box px={{ base: 6, lg: 12 }} py={{ base: 6, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
          {/* Carousel Skeleton */}
          <Box bg="gray.50" p={10} rounded="xs">
            <Stack gap={6}>
              <Skeleton height="20px" width="40%" />
              <Skeleton height="30px" width="70%" />
              <Skeleton height="20px" width="90%" />
              <Skeleton height="40px" width="150px" />
            </Stack>
          </Box>

          <Stack gap={6}>
            <Flex gap={4} align="center">
              <SkeletonCircle size="12" />
              <Stack flex="1">
                <Skeleton height="5" />
                <Skeleton height="5" width="80%" />
              </Stack>
            </Flex>

            <Flex gap={4} align="center">
              <SkeletonCircle size="12" />
              <Stack flex="1">
                <Skeleton height="5" />
                <Skeleton height="5" width="80%" />
              </Stack>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Box>
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

  const bestDeals = data?.bestDeals ?? [];
  const discountedProducts = bestDeals.filter(
    (item: Product) => item.discountType && Number(item.discountValue) > 0,
  );

  const firstDiscounted = discountedProducts[0];

  const remainingProducts = bestDeals.filter(
    (item: Product) => item.id !== firstDiscounted?.id,
  );

  const sideCards = [firstDiscounted, remainingProducts[0]].filter(Boolean);

  const carouselItems = remainingProducts.slice(1);

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <SimpleGrid columns={{ base: 1, md: 5, lg: 3 }} gap={6}>
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
              {carouselItems.map((item: Product) => (
                <CarouselItem key={item.slug} item={item} />
              ))}
            </Slider>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
          <Flex direction={"column"} gap={{ base: 6, md: 3, lg: 4 }} h={"full"}>
            <FirstItem item={sideCards[0]} />

            <SecondItem item={sideCards[1]} />
          </Flex>
        </GridItem>
      </SimpleGrid>

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
