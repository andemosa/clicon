import { useState } from "react";
import {
  Flex,
  Stack,
  Heading,
  Button,
  Alert,
  Text,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

import TagDisplay from "./TagDisplay";

import { useTagsQuery } from "@/services/tag/tag.hooks";

const AdminTagsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isFetching, isError } = useTagsQuery({
    limit: 6,
    page,
    search,
  });

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>Failed to fetch tags</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!data && !isFetching) {
    return (
      <VStack p={10} align="center">
        <Text>No tags found.</Text>
      </VStack>
    );
  }

  if (isFetching && !data) {
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <Flex
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Heading>Tags</Heading>
        <Button
          size="md"
          w="full"
          textTransform="uppercase"
          bg="orange.500"
          color="white"
          fontWeight={700}
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.500" }}
          disabled
        >
          <Plus />
          &nbsp;Add Tag
        </Button>
      </Flex>

      <Stack gap={3}>
        <SkeletonText noOfLines={2} height="100px" />
        <SkeletonText noOfLines={2} height="100px" />
        <SkeletonText noOfLines={2} height="100px" />
        <SkeletonText noOfLines={2} height="100px" />
        <SkeletonText noOfLines={2} height="100px" />
      </Stack>
    </Stack>;
  }

  return (
    <TagDisplay
      isFetching={isFetching}
      search={search}
      setSearch={setSearch}
      data={data}
      page={page}
      setPage={setPage}
    />
  );
};

export default AdminTagsPage;
