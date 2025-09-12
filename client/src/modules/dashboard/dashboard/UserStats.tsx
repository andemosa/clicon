import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Stack,
  Separator,
  chakra,
  Button,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { NotepadText, Package, Rocket } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const Link = chakra(RouterLink);

const UserStats = () => {
  return (
        
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 4, xl: 6 }} color={'gray.900'}>
      <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
        <Text
          fontSize="lg"
          fontWeight="medium"
          textTransform={"uppercase"}
          p={{ base: 2, sm: 3, md: 4 }}
        >
          Account Info
        </Text>
        <Separator w={"full"} />
        <Stack p={{ base: 2, sm: 4, lg: 6 }} gap={4}>
          <Flex gap={2}>
            <Avatar.Root size="lg">
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Stack gap={1}>
              <Text>Name</Text>
              <Text color={"gray.600"}>Email</Text>
            </Stack>
          </Flex>
          <Stack>
            <Flex>
              <Text>Email:</Text>
              <Text color={"gray.600"}>email</Text>
            </Flex>
            <Flex>
              <Text>Phone:</Text>
              <Text color={"gray.600"}>phone</Text>
            </Flex>
          </Stack>
          <Link
            to={"/dashboard/settings"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              size="md"
              w={"max-content"}
              textTransform="uppercase"
              borderColor="blue.500"
              bg={"transparent"}
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
              Edit Account
            </Button>
          </Link>
        </Stack>
      </Box>

      <Box border={"1px solid"} borderColor={"gray.100"} rounded="md">
        <Text
          fontSize="lg"
          fontWeight="medium"
          textTransform={"uppercase"}
          p={{ base: 2, sm: 3, md: 4 }}
        >
          Billing address
        </Text>
        <Separator w={"full"} />
        <Stack p={{ base: 2, sm: 4, lg: 6 }} gap={4}>
          <Stack gap={1}>
            <Text>Name</Text>
            <Text color={"gray.600"}>Email</Text>
          </Stack>
          <Stack>
            <Flex>
              <Text>Email:</Text>
              <Text color={"gray.600"}>email</Text>
            </Flex>
            <Flex>
              <Text>Phone:</Text>
              <Text color={"gray.600"}>phone</Text>
            </Flex>
          </Stack>
          <Link
            to={"/dashboard/settings"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              size="md"
              w={"max-content"}
              textTransform="uppercase"
              borderColor="blue.500"
              bg={"transparent"}
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
              Edit Address
            </Button>
          </Link>
        </Stack>
      </Box>

      <Flex
        direction={"column"}
        gap={4}
        justifyContent={"space-between"}
        display={{ base: "none", lg: "flex" }}
        h={"full"}
      >
        <Flex
          bg={"blue.50"}
          p={4}
          gap={4}
          align={"center"}
          borderRadius={"md"}
          flex={1}
        >
          <Flex
            align={"center"}
            justify={"center"}
            p={3}
            bg={"white"}
            borderRadius={"sm"}
          >
            <Icon size="lg" color="pink.700">
              <Rocket />
            </Icon>
          </Flex>

          <Stack gap={0} fontSize={"sm"}>
            <Text fontWeight={600} fontSize={"lg"}>
              154
            </Text>
            <Text color={'gray.700'}>Total Orders</Text>
          </Stack>
        </Flex>
        <Flex
          bg={"orange.50"}
          p={4}
          gap={4}
          align={"center"}
          borderRadius={"md"}
          flex={1}
        >
          <Flex
            align={"center"}
            justify={"center"}
            p={3}
            bg={"white"}
            borderRadius={"sm"}
          >
            <Icon size="lg" color="pink.700">
              <NotepadText />
            </Icon>
          </Flex>

          <Stack gap={0} fontSize={"sm"}>
            <Text fontWeight={600} fontSize={"lg"}>
              09
            </Text>
            <Text color={'gray.700'}>Pending Orders</Text>
          </Stack>
        </Flex>
        <Flex
          bg={"green.50"}
          p={4}
          gap={4}
          align={"center"}
          borderRadius={"md"}
          flex={1}
        >
          <Flex
            align={"center"}
            justify={"center"}
            p={3}
            bg={"white"}
            borderRadius={"sm"}
          >
            <Icon size="lg" color="pink.700">
              <Package />
            </Icon>
          </Flex>

          <Stack gap={0} fontSize={"sm"}>
            <Text fontWeight={600} fontSize={"lg"}>
              149
            </Text>
            <Text color={'gray.700'}>Completed Orders</Text>
          </Stack>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default UserStats;
