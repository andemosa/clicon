import {
  Flex,
  Stack,
  Heading,
  Button,
  Alert,
  Text,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

import TagRow from "./TagRow";
import TagModal from "./TagModal";

import { useTagsQuery } from "@/services/tag/tag.hooks";

const AdminTagsPage = () => {
  const { data, isFetching, isError } = useTagsQuery();
  const { open, onOpen, onClose } = useDisclosure();

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
      <Stack p={10} align="center">
        <Text>No tags found.</Text>
      </Stack>
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
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <Flex
        gap={4}
        alignItems={{ sm: "center" }}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Heading>Tags</Heading>
        <Button
          size="md"
          w="max-content"
          textTransform="uppercase"
          bg="orange.500"
          color="white"
          fontWeight={700}
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.500" }}
          onClick={onOpen}
          alignSelf={"end"}
        >
          <Plus />
          &nbsp;Add Tag
        </Button>
      </Flex>

      {!data?.tags.length ? (
        <Stack gap={3}>
          <Text>No tags found.</Text>
          <Button
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
            &nbsp;Add New Tag
          </Button>
        </Stack>
      ) : (
        <Stack gap={3}>
          {data.tags.map((tag) => (
            <TagRow tag={tag} isFetching={isFetching} key={tag.id} />
          ))}
        </Stack>
      )}

      {open ? (
        <TagModal open={open} closeModal={onClose} type={"new"} key={"new"} />
      ) : null}
    </Stack>
  );
};

export default AdminTagsPage;
