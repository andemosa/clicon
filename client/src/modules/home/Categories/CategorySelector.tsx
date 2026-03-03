import { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Text, VStack, IconButton, Image, Flex } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Category } from "@/types";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    left="-12px"
    top="50%"
    transform="translateY(-50%)"
    bg="orange.500"
    zIndex={2}
    h={10}
    w={10}
    borderRadius="full"
    color="white"
    _hover={{ bg: "orange.600" }}
  >
    <ArrowLeft />
  </IconButton>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-12px"
    top="50%"
    transform="translateY(-50%)"
    bg="orange.500"
    zIndex={2}
    h={10}
    w={10}
    borderRadius="full"
    color="white"
    _hover={{ bg: "orange.600" }}
  >
    <ArrowRight />
  </IconButton>
);

const CategoryCarousel = ({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: Category;
  onSelect: (cat: Category) => void;
}) => {
  const slider = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box w="100%" position="relative" mb={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Shop with Categories
      </Text>
      <Box position="relative">
        <Slider {...settings} ref={slider}>
          {categories.map((cat) => (
            <CatCard
              cat={cat}
              key={cat.slug}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </Slider>

        <PrevArrow onClick={() => slider?.current?.slickPrev()} />
        <NextArrow onClick={() => slider?.current?.slickNext()} />
      </Box>
    </Box>
  );
};

export default CategoryCarousel;

const CatCard = ({
  cat,
  selected,
  onSelect,
}: {
  cat: Category;
  selected: Category;
  onSelect: (cat: Category) => void;
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Box key={cat.id} px={2}>
      <VStack
        borderWidth="1px"
        borderRadius="lg"
        py={4}
        px={3}
        gap={2}
        h="160px"
        justify="center"
        cursor="pointer"
        bg={selected.id === cat.id ? "orange.50" : "white"}
        borderColor={selected.id === cat.id ? "orange.400" : "gray.200"}
        onClick={() => onSelect(cat)}
        transition="all 0.2s ease"
        _hover={{ borderColor: "orange.300" }}
      >
        <Box
          w="100%"
          h="100px"
          bg={!cat.image || imgError ? "gray.200" : "transparent"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {cat.image && !imgError ? (
            <Image
              src={cat.image}
              alt={cat.name}
              objectFit="cover"
              w="100%"
              h="100%"
              onError={() => setImgError(true)}
            />
          ) : (
            <Flex
              w={"full"}
              h={"full"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text color="gray.500" fontSize="sm">
                No Image
              </Text>
            </Flex>
          )}
        </Box>
        <Text fontSize="sm" textAlign="center" fontWeight="medium">
          {cat.name}
        </Text>
      </VStack>
    </Box>
  );
};
