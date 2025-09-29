import { useState } from "react";
import { Card, Image, Text, Box, chakra, Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import type { Category } from "@/types";

const Link = chakra(RouterLink);

const CategoryCard = ({ image, name, description, slug }: Category) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box
        w="100%"
        h="200px"
        bg={!image || imgError ? "gray.200" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
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

      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description || "--"}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text>
      </Card.Body>
      <Flex
        direction={{ base: "row", sm: "row", md: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        gap="2"
        px={{ base: 2, sm: 4 }}
        py={2}
      >
        <Link
          to={`/admin/categories/${slug}/products`}
          _hover={{ textDecoration: "none" }}
          w={{ md: "full" }}
          display={"flex"}
          justifyContent={{ lg: "center" }}
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
            View Products
          </Button>
        </Link>
        <Link
          to={`/admin/categories/${slug}/edit`}
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
            Edit Category
          </Button>
        </Link>
      </Flex>
    </Card.Root>
  );
};

export default CategoryCard;
