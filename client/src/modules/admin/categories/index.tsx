import {
  chakra,
  Flex,
  Stack,
  Heading,
  Button,
  Alert,
  GridItem,
  Separator,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

import CategoryCard from "./CategoryCard";

import { useCategoriesQuery } from "@/services/category/category.hooks";

const Link = chakra(RouterLink);

const AdminCategoriesPage = () => {
  const { data, isFetching, isError } = useCategoriesQuery();

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>Failed to fetch categories</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!data && !isFetching) {
    return (
      <Stack p={10} align="center">
        <Text>No categories data found.</Text>
      </Stack>
    );
  }

  if (isFetching && !data) {
    return (
      <>
        <Stack gap={4} color={"gray.900"} w={"full"}>
          <Flex
            gap={4}
            alignItems={{ sm: "center" }}
            justifyContent={"space-between"}
            direction={{ base: "column", sm: "row" }}
          >
            <Heading>Categories</Heading>
            <Button
              disabled
              alignSelf={"end"}
              size="md"
              w="max-content"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
            >
              <Plus />
              &nbsp;Add Category
            </Button>
          </Flex>
          <Separator variant="solid" size="sm" w="full" />
          <SimpleGrid
            columns={{ base: 1, lg: 4 }}
            gap={{ base: 6 }}
            width="full"
            rounded="md"
            h="max-content"
            p={4}
          >
            <GridItem
              colSpan={{ base: 1 }}
              display="flex"
              justifyContent="center"
            >
              <Skeleton
                rounded="full"
                boxSize={{ base: "150px", lg: "120px", xl: "150px" }}
              />
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 3 }}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <SkeletonText noOfLines={2} height="16px" />
                <SkeletonText noOfLines={2} height="16px" />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={4}>
                <SkeletonText noOfLines={2} height="16px" />
                <SkeletonText noOfLines={2} height="16px" />
              </SimpleGrid>
              <Skeleton mt={6} height="40px" w="120px" rounded="md" />
            </GridItem>
          </SimpleGrid>
        </Stack>
      </>
    );
  }

  if (data)
    return (
      <Stack gap={4} color={"gray.900"} w={"full"}>
        <Flex
          gap={4}
          alignItems={{ sm: "center" }}
          justifyContent={"space-between"}
          direction={{ base: "column", sm: "row" }}
        >
          <Heading>Categories</Heading>
          <Link href={`/admin/categories/new`} alignSelf={"end"}>
            <Button
              size="md"
              w="full"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
            >
              <Plus />
              &nbsp;Add Category
            </Button>
          </Link>
        </Flex>
        {!data.categories?.length ? (
          <Stack
            p={6}
            gap={3}
            align="center"
            justify="center"
            color="gray.600"
            textAlign="center"
          >
            <Text>No categories found</Text>
            <Link
              to="/admin/categories/new"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                size="md"
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
                <Plus />
                &nbsp;Add Category
              </Button>
            </Link>
          </Stack>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={4}>
            {data.categories.map((category) => (
              <CategoryCard {...category} key={category.id} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    );

  return null;
};

export default AdminCategoriesPage;
