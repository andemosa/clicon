import { Box, Text, Table, chakra, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const RecentOrders = ({orders}: {orders: any[]}) => {
  return (
    <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
      <Text
        color={"gray.900"}
        fontSize="lg"
        fontWeight="medium"
        p={{ base: 4 }}
        textTransform={"uppercase"}
      >
        Recent Orders
      </Text>

      {orders.length > 0 ? (
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">${item.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Stack
          p={6}
          gap={3}
          align="center"
          justify="center"
          color="gray.600"
          textAlign="center"
        >
          <Text>No recent orders found</Text>
          <Link to="/shop" _hover={{ textDecoration: "none" }}>
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
              Go to Shop
            </Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default RecentOrders;
