import { Flex, HStack, Separator, Text, Icon, chakra } from "@chakra-ui/react";
import { MapPin, Phone, RefreshCcw } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

import CategoriesMenu from "./Categories";

const Link = chakra(RouterLink);

const Topbar = () => {
  return (
    <>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={{ base: 8, lg: 16 }}
        px={{ base: 6, lg: 12 }}
        py={2}
        maxW={{ base: "full", xl: "1440px" }}
        mx={"auto"}
        fontSize={{ base: "xs", lg: "sm" }}
        w={"full"}
      >
        <HStack gap={4}>
          <CategoriesMenu />
          <Link
            to={"/track"}
            _hover={{ textDecoration: "none", bg: "gray.50" }}
            px={4}
            py={2}
          >
            <Flex gap={2} align={"center"}>
              <Icon boxSize={4} color="gray.900">
                <MapPin />
              </Icon>
              <Text>Track Order</Text>
            </Flex>
          </Link>
          <Link
            to={"/compare"}
            _hover={{ textDecoration: "none", bg: "gray.50" }}
            px={4}
            py={2}
          >
            <Flex gap={2} align={"center"}>
              <Icon boxSize={4} color="gray.900">
                <RefreshCcw />
              </Icon>
              <Text>Compare</Text>
            </Flex>
          </Link>
        </HStack>
        <Flex align={"center"} gap={1}>
          <Icon boxSize={4} color="gray.900">
            <Phone />
          </Icon>
          <Text>+1-202-555-0104</Text>
        </Flex>
      </Flex>
      <Separator />
    </>
  );
};

export default Topbar;
