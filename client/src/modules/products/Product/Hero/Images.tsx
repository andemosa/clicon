"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, IconButton, Image, VStack } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    left="-14px"
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
    right="-14px"
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

const productImages = [
  "/images/01.png",
  "/images/02.png",
  "/images/03.png",
  "/images/04.png",
  "/images/05.png",
];

const Images = () => {
  const slider = useRef<Slider>(null);
  const [activeImage, setActiveImage] = useState(productImages[0]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, // disable default arrows, we’re using custom
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <VStack w="100%" gap={6} align="stretch" mb={10}>
      <Box w="100%" borderRadius="lg" overflow="hidden">
        <Image
          src={activeImage}
          alt="Selected Product"
          w="100%"
          h="auto"
          borderRadius="lg"
          border="2px solid"
          borderColor="gray.200"
        />
      </Box>

      <Box position="relative">
        <Slider {...settings} ref={slider}>
          {productImages.map((src, i) => (
            <Box key={i} p={2}>
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                borderRadius="md"
                border={`2px solid ${
                  activeImage === src ? "orange" : "transparent"
                }`}
                _hover={{ border: "2px solid orange", cursor: "pointer" }}
                onClick={() => setActiveImage(src)}
              />
            </Box>
          ))}
        </Slider>

        <PrevArrow onClick={() => slider?.current?.slickPrev()} />
        <NextArrow onClick={() => slider?.current?.slickNext()} />
      </Box>
    </VStack>
  );
};

export default Images;
