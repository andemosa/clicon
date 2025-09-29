import {
  Stack,
  Flex,
  Text,
  SimpleGrid,
  GridItem,
  Separator,
  Alert,
  Heading,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { getRouteApi } from "@tanstack/react-router";

import Display from "./Display";

import { useCategoryQuery } from "@/services/category/category.hooks";

const AdminEditCategoryPage = () => {
  const routeApi = getRouteApi("/admin/categories/$slug/edit");
  const params = routeApi.useParams();
  const { data, isFetching, isError } = useCategoryQuery(params.slug, {
    includeChildren: true,
  });

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>Failed to fetch category</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!data && !isFetching) {
    return (
      <Stack p={10} align="center">
        <Text>No category data found.</Text>
      </Stack>
    );
  }

  if (isFetching && !data) {
    return (
      <>
        <Stack gap={4} color={"gray.900"} w={"full"}>
          <Flex
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={{ base: "column", sm: "row" }}
          >
            <Heading>Categories</Heading>
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

  if (data) return <Display key={data.updatedAt} category={data} />;

  return null;
};

export default AdminEditCategoryPage;
