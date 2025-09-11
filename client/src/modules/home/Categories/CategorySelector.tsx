import { useRef } from "react";
import Slider from "react-slick";
import { Box, Text, VStack, IconButton, Image } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  categories: { label: string; img: string, subcategories: string[];
 }[];
  selected: { label: string; img: string, subcategories: string[];
 };
  onSelect: (cat: { label: string; img: string, subcategories: string[];
 }) => void;
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
            <Box key={cat.label} px={2}>
              <VStack
                borderWidth="1px"
                borderRadius="lg"
                py={4}
                px={3}
                gap={2}
                h="160px"
                justify="center"
                cursor="pointer"
                bg={selected.label === cat.label ? "orange.50" : "white"}
                borderColor={
                  selected.label === cat.label ? "orange.400" : "gray.200"
                }
                onClick={() => onSelect(cat)}
                transition="all 0.2s ease"
                _hover={{ borderColor: "orange.300" }}
              >
                <Image src={cat.img} alt={cat.label} boxSize="60px" />
                <Text fontSize="sm" textAlign="center" fontWeight="medium">
                  {cat.label}
                </Text>
              </VStack>
            </Box>
          ))}
        </Slider>

        <PrevArrow onClick={() => slider?.current?.slickPrev()} />
        <NextArrow onClick={() => slider?.current?.slickNext()} />
      </Box>
    </Box>
  );
};

export default CategoryCarousel;
