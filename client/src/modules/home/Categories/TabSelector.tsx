import {
  Tabs,
  Flex,
  Text,
  useTabs,
  GridItem,
  SimpleGrid,
  Box,
  Button,
  Badge,
  Image,
} from "@chakra-ui/react";

const TabSelector = ({
  products,
}: {
  subcategories: string[];
  selected: string;
  onSelect: (sub: string) => void;
  products: {
    id: number;
    name: string;
    price: number | string;
    img: string;
    badge?: string;
  }[];
}) => {
  const tabs = useTabs({
    defaultValue: "members",
  });
  return (
    <Tabs.RootProvider value={tabs}>
      <SimpleGrid
        columns={{ base: 1, lg: 4 }}
        gap={{ base: "24px", md: "40px" }}
      >
        <GridItem display={{ base: "none", lg: "block" }} colSpan={1}>
          <Box bg="yellow.100" p={6} borderRadius="lg" textAlign="center">
            <Text color="orange.600" fontWeight="bold">
              COMPUTER & ACCESSORIES
            </Text>
            <Text fontSize="3xl" fontWeight="extrabold">
              32% Discount
            </Text>
            <Text mb={4}>For all electronics products</Text>
            <Button colorScheme="orange">SHOP NOW</Button>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            w={"full"}
            gap={2}
            align={{ sm: "center" }}
            justifyContent={"space-between"}
          >
            <Text fontWeight="bold" color={"gray.900"}>
              Featured Products
            </Text>
            <Tabs.List>
              <Tabs.Trigger value="members">Members</Tabs.Trigger>
              <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
              <Tabs.Trigger value="tasks">Tasks</Tabs.Trigger>
            </Tabs.List>
          </Flex>
          <Tabs.Content value="members">
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              gap={6}
              mt={4}
            >
              {products.map((p) => (
                <Box
                  key={p.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  _hover={{ shadow: "md" }}
                >
                  {p.badge && (
                    <Badge colorScheme="red" mb={2}>
                      {p.badge}
                    </Badge>
                  )}
                  <Image src={p.img} alt={p.name} boxSize="120px" mx="auto" />
                  <Text mt={2} fontWeight="medium">
                    {p.name}
                  </Text>
                  <Text color="orange.500" fontWeight="bold">
                    {p.price}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Tabs.Content>
          <Tabs.Content value="projects">Manage your projects</Tabs.Content>
          <Tabs.Content value="tasks">
            Manage your tasks for freelancers
          </Tabs.Content>
        </GridItem>
      </SimpleGrid>
    </Tabs.RootProvider>
  );
};

export default TabSelector;
