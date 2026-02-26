import { useState, useMemo } from "react";
import {
  Card,
  Image,
  Text,
  Box,
  chakra,
  Button,
  Flex,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import type { Product } from "@/types";

const Link = chakra(RouterLink);

const ProductCard = (product: Product) => {
  const {
    name,
    description,
    slug,
    price,
    discountType,
    discountValue,
    category,
    image,
  } = product;

  const [imgError, setImgError] = useState(false);

  // Calculate final price if discount exists
  const finalPrice = useMemo(() => {
    if (!discountType || !discountValue) return price;

    if (discountType === "percentage") {
      return price - (price * discountValue) / 100;
    }

    if (discountType === "fixed") {
      return price - discountValue;
    }

    return price;
  }, [price, discountType, discountValue]);

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box
        w="100%"
        h="200px"
        bg={!image || imgError ? "gray.200" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottom={"0.5px solid"}
        borderColor={"gray.500"}
      >
        {image && !imgError ? (
          <Image
            src={image}
            alt={name}
            objectFit="cover"
            w="100%"
            h="100%"
            onError={() => setImgError(true)}
          />
        ) : (
          <Text color="gray.500" fontSize="sm">
            No Image
          </Text>
        )}
      </Box>

      <Card.Body>
        <Stack gap="2">
          <Flex justifyContent={"space-between"} gap={2} alignItems={"center"}>
            <Card.Title>{name}</Card.Title>

            {category && (
              <Badge colorScheme="blue" width="fit-content">
                {category.name}
              </Badge>
            )}
          </Flex>

          <Card.Description>
            <Box dangerouslySetInnerHTML={{ __html: description || "" }} />
          </Card.Description>

          <Flex align="center" gap="2">
            {discountType && discountValue ? (
              <>
                <Text fontWeight="bold" fontSize="lg" color="green.500">
                  ${finalPrice.toFixed(2)}
                </Text>

                <Text
                  textDecoration="line-through"
                  color="gray.500"
                  fontSize="sm"
                >
                  ${price.toFixed(2)}
                </Text>

                <Badge colorScheme="red">
                  {discountType === "percentage"
                    ? `-${discountValue}%`
                    : `-$${discountValue}`}
                </Badge>
              </>
            ) : (
              <Text fontWeight="bold" fontSize="lg">
                ${price.toFixed(2)}
              </Text>
            )}
          </Flex>
        </Stack>
      </Card.Body>

      <Flex
        direction={{ base: "row", md: "column", lg: "row" }}
        align="center"
        justify="center"
        gap="2"
        px={4}
        pb={3}
      >
        <Link
          to={`/admin/products/${slug}/edit`}
          _hover={{ textDecoration: "none" }}
          w={{ md: "full" }}
          alignSelf={{ md: "end", lg: "start" }}
          display={"flex"}
          justifyContent={{ md: "end", lg: "center" }}
        >
          <Button
            size={{ base: "xs" }}
            textTransform="uppercase"
            borderColor="blue.500"
            bg="transparent"
            color="blue.500"
            fontWeight={700}
            _hover={{
              border: "blue.500",
              bg: "transparent",
              borderColor: "blue.500",
            }}
            _active={{
              border: "blue.500",
              bg: "transparent",
              borderColor: "blue.500",
            }}
          >
            Edit Product
          </Button>
        </Link>
      </Flex>
    </Card.Root>
  );
};

export default ProductCard;
