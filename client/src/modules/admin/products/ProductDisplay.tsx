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
  NativeSelect
} from "@chakra-ui/react";
import { Plus, SearchIcon } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

import ProductCard from "./ProductCard";
import PaginationComp from "@/components/common/PaginationComp";
import { Tooltip } from "@/components/ui/tooltip";

const Link = chakra(RouterLink);

const ProductDisplay = ({
  data,
  page,
  search,
  itemsPerPage,
  setPage,
  setSearch,
  setItemsPerPage
}: {
  data: any;
  page: number;
  search: string;
  itemsPerPage: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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
          alignItems={{ sm: "center" }}
          direction={{ base: "column", sm: "row" }}
        >
          <Heading>Products</Heading>
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
              placeholder="Search for product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Link href={`/admin/products/new`} alignSelf={"end"}>
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
            &nbsp;Add Product
          </Button>
        </Link>
      </Flex>
      {!data.products?.length ? (
        <Stack
          p={6}
          gap={3}
          align="center"
          justify="center"
          color="gray.600"
          textAlign="center"
        >
          <Text>No products found</Text>
          <Link to="/admin/products/new" _hover={{ textDecoration: "none" }}>
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
              &nbsp;Add Product
            </Button>
          </Link>
        </Stack>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={4}>
          {data.products.map((product: any) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </SimpleGrid>
      )}

      <Flex
        gap={{ base: 2, sm: 4, lg: 6 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data.meta.total}
          itemsPerPage={itemsPerPage}
        />
        <Flex gap={1} alignItems={"center"}>
          <Text display={{ base: "none", sm: "block" }}>Items per page:</Text>
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

export default ProductDisplay;
