import { useState } from "react";
import {
  chakra,
  Flex,
  Stack,
  Heading,
  Button,
  SimpleGrid,
  Text,
  Input,
  InputGroup,
  IconButton,
  NativeSelect,
} from "@chakra-ui/react";
import { Plus, SearchIcon } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

import CategoryCard from "./CategoryCard";
import PaginationComp from "@/components/common/PaginationComp";
import { Tooltip } from "@/components/ui/tooltip";

const Link = chakra(RouterLink);

const CategoryDisplay = ({
  data,
  page,
  order,
  sort,
  search,
  itemsPerPage,
  setPage,
  setSearch,
  setOrder,
  setSort,
  setItemsPerPage,
}: {
  data: any;
  page: number;
  search: string;
  order: "desc" | "asc";
  sort: string;
  itemsPerPage: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
            <Heading>Categories</Heading>
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
                placeholder="Search for category..."
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
                  setSort(
                    e.currentTarget.value as
                      | "name"
                      | "createdAt"
                      | "productCount",
                  )
                }
              >
                <option value="createdAt">Date Created</option>
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
          <Link to="/admin/categories/new" _hover={{ textDecoration: "none" }}>
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
          {data.categories.map((category: any) => (
            <CategoryCard {...category} key={category.id} />
          ))}
        </SimpleGrid>
      )}

      <Flex gap={{base: 2, sm: 4, lg: 6}} alignItems={"center"} justifyContent={"center"}>
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data.meta.total}
          itemsPerPage={itemsPerPage}
        />
        <Flex gap={1} alignItems={"center"}>
          <Text display={{base: "none", sm: "block"}}>Items per page:</Text>
          <NativeSelect.Root size="sm" width={"60px"}>
            <NativeSelect.Field
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(+e.currentTarget.value)}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="48">48</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default CategoryDisplay;
