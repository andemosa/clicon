import { chakra, Flex, Stack, Heading, Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const AdminProductsPage = () => {
  return (
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <Flex
        gap={4}
        alignItems={{ sm: "center" }}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Heading>Products</Heading>
        <Link href={`/admin/products/new`} alignSelf={"end"}>
          <Button
            type="submit"
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
    </Stack>
  );
};

export default AdminProductsPage;
