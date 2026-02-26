import { useState } from "react";
import {
  Flex,
  Stack,
  Heading,
  Button,
  Text,
  useDisclosure,
  VStack,
  IconButton,
  Input,
  InputGroup,
  NativeSelect,
} from "@chakra-ui/react";
import { Plus, SearchIcon } from "lucide-react";

import TagModal from "./TagModal";
import TagRow from "./TagRow";
import PaginationComp from "@/components/common/PaginationComp";
import { Tooltip } from "@/components/ui/tooltip";

const TagDisplay = ({
  data,
  page,
  search,
  isFetching,
  order,
  sort,
  setOrder,
  setSort,
  setPage,
  setSearch,
}: {
  data: any;
  page: number;
  search: string;
  isFetching: boolean;
  order: "desc" | "asc";
  sort: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState(search);

  return (
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <Flex
        gap={4}
        alignItems={{ sm: "center" }}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Flex
          gap={2}
          direction={{ base: "column", xl: "row" }}
          alignItems={{ xl: "center" }}
        >
          <Flex
            gap={2}
            alignItems={{ sm: "center" }}
            direction={{ base: "column", sm: "row" }}
          >
            <Heading>Tags</Heading>
            <InputGroup
              as={"form"}
              bg={"white"}
              endElement={
                <Tooltip content="Click to search">
                  <IconButton boxSize="8" color="blue.700">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              }
              flex={1}
              mx="auto"
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(searchTerm);
              }}
            >
              <Input
                placeholder="Search for tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Flex>
          <Flex
            gap={3}
            alignItems={{ sm: "center" }}
            direction={{ base: "column", sm: "row" }}
          >
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                value={sort}
                onChange={(e) =>
                  setSort(e.currentTarget.value as "name" | "productCount")
                }
              >
                <option value="name">Name</option>
                <option value="productCount">Product Count</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>

            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                value={order}
                onChange={(e) =>
                  setOrder(e.currentTarget.value as "asc" | "desc")
                }
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
        </Flex>

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
        <VStack gap={3} mt={5}>
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
            onClick={onOpen}
          >
            <Plus />
            &nbsp;Add New Tag
          </Button>
        </VStack>
      ) : (
        <Stack gap={3}>
          {data.tags.map((tag: any) => (
            <TagRow tag={tag} isFetching={isFetching} key={tag.id} />
          ))}
        </Stack>
      )}

      {data?.meta?.total <= data?.meta?.limit ? null : (
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data?.meta?.total}
          itemsPerPage={data?.meta?.limit}
        />
      )}

      {open ? (
        <TagModal open={open} closeModal={onClose} type={"new"} key={"new"} />
      ) : null}
    </Stack>
  );
};

export default TagDisplay;
