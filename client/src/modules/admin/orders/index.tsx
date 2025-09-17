import {
  Box,
  Text,
  Table,
  ButtonGroup,
  IconButton,
  Pagination,
  chakra,
  Flex,
} from "@chakra-ui/react";
import { ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const AdminOrdersPage = () => {
  return (
    <Box
      width="full"
      border={"1px solid"}
      borderColor={"gray.100"}
      rounded="md"
      h={'max-content'}
    >
      <Text
        color={"gray.900"}
        fontWeight="semibold"
        p={{ base: 4 }}
        textTransform={"uppercase"}
      >
        Order History
      </Text>

      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row
              key={item.id}
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
            >
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell textAlign="end" fontSize={{ base: "10px", sm: "sm", md: "md" }}>
                <Link href={`/dashboard/orders/${item.id}`}>
                  <Flex
                    color={"blue.500"}
                    alignItems={"center"}
                    justifyContent={'end'}
                    _hover={{ textDecoration: "underline" }}
                  >
                    View Details&nbsp;
                    <ArrowRightIcon size={14} />
                  </Flex>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination.Root count={items.length * 5} pageSize={5} page={1} my={4}>
        <ButtonGroup
          variant="ghost"
          size="sm"
          wrap="wrap"
          alignItems={"center"}
          justifyContent={"center"}
          w={"full"}
        >
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Box>
  );
};

export default AdminOrdersPage;

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
