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

import type { UserDashboardRes } from "@/types";

const Link = chakra(RouterLink);

const UserStats = ({ data }: { data: UserDashboardRes }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      gap={{ base: 4, xl: 6 }}
      color={"gray.900"}
    >
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
          <Flex gap={2} alignItems={"center"}>
            <Avatar.Root size="lg">
              <Avatar.Fallback name={`${data.firstName} ${data.lastName}`} />
              <Avatar.Image src={data.avatar ?? undefined} />
            </Avatar.Root>
            <Stack gap={1}>
              <Text fontSize={"lg"} color={"gray.600"} fontWeight={600}>
                {data?.firstName} {data?.lastName}
              </Text>
            </Stack>
          </Flex>
          <Stack>
            <Flex>
              <Text>Email:</Text>
              <Text color={"gray.600"}>{data.email}</Text>
            </Flex>
            <Flex>
              <Text>Phone:</Text>
              <Text color={"gray.600"}>{data.phone}</Text>
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
        {data.billingAddress ? (
          <Stack p={{ base: 2, sm: 4, lg: 6 }} gap={4}>
            <Stack gap={1}>
              <Text fontWeight={500}>
                {data.billingAddress.firstName} {data.billingAddress.lastName}
              </Text>
              <Text color={"gray.600"}>
                {data.billingAddress.addressLine1}, {data.billingAddress.city},{" "}
                {data.billingAddress.state}, {data.billingAddress.country}
              </Text>
            </Stack>
            <Stack>
              <Flex>
                <Text>Email:</Text>
                <Text color={"gray.600"}>{data.billingAddress.email}</Text>
              </Flex>
              <Flex>
                <Text>Phone:</Text>
                <Text color={"gray.600"}>{data.billingAddress.phone}</Text>
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
        ) : (
          <Stack
            align="center"
            justify="center"
            p={8}
            gap={6}
            textAlign={"center"}
          >
            <Text fontSize="md" color="gray.600">
              You don’t have a billing address yet.
            </Text>
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
                Add Address
              </Button>
            </Link>
          </Stack>
        )}
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
              {data.totalOrders}
            </Text>
            <Text color={"gray.700"}>Total Orders</Text>
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
              {data.pendingOrders}
            </Text>
            <Text color={"gray.700"}>Pending Orders</Text>
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
              {data.completedOrders}
            </Text>
            <Text color={"gray.700"}>Completed Orders</Text>
          </Stack>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default UserStats;
