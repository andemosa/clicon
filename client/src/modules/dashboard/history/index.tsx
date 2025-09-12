import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";

const DashboardHistoryPage = () => {
  return (
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <Flex
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Heading>Browsing History</Heading>
        <Switch.Root>
          <Switch.HiddenInput />
          <Switch.Label>Turn Browsing History on/off</Switch.Label>
          <Switch.Control />
        </Switch.Root>
      </Flex>
      <Flex
        gap={4}
        direction={{ base: "column", sm: "row" }}
        alignItems={"center"}
        w={"80%"}
      >
        <InputGroup
          bg={"white"}
          startElement={
            <Icon boxSize="6" color="orange.500">
              <SearchIcon />
            </Icon>
          }
        >
          <Input placeholder="Search in browsing history..." />
        </InputGroup>
        <InputGroup bg={"white"}>
          <Input type="date" />
        </InputGroup>
      </Flex>
      <Box
        width="full"
        border={"1px solid"}
        borderColor={"gray.100"}
        rounded="md"
        h={"max-content"}
      >
        <Text
          color={"gray.900"}
          fontWeight="semibold"
          p={{ base: 4 }}
          textTransform={"uppercase"}
        >
          17 Oct, 2020
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          gap={{ base: 4 }}
          mt={4}
        ></SimpleGrid>
      </Box>
    </Stack>
  );
};

export default DashboardHistoryPage;
