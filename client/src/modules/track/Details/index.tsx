import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { CheckCheck, Dot, } from "lucide-react";

import StepsComp from "./StepsComp";

const TrackOrderDetailsPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        mx={"auto"}
        border={"1px solid"}
        borderColor={"gray.100"}
        py={{ base: 4, md: 6, lg: 8 }}
      >
        <Stack gap={4} w={"full"} px={{ base: 4, md: 6, lg: 8 }}>
          <Flex
            align={"center"}
            justify={"space-between"}
            bg={"yellow.50"}
            border={"0.5px solid"}
            borderColor={"yellow.300"}
            w={"full"}
            p={{ base: 2, md: 4 }}
          >
            <Stack>
              <Text color={"gray.900"}>#96459761</Text>
              <Flex align={"center"} gap={2}>
                <Text>4 Products</Text>
                <Dot />
                <Text>Order Placed in 17 Jan, 2021 at 7:32 PM</Text>
              </Flex>
            </Stack>
            <Heading color={"blue.500"}>$1199.00</Heading>
          </Flex>
          <Text>Order expected arrival 23 Jan, 2021</Text>
          <StepsComp />
        </Stack>
        <Separator variant="solid" size={"sm"} w={"full"} />
        <Stack gap={2} w={"full"} p={{ base: 4, md: 6, lg: 8 }}>
          <Text>Order Activity</Text>
          <Stack>
            <Flex gap={2} align={"center"}>
              <Flex bg={"green.50"} p={2} align={"center"} justify={"center"}>
                <CheckCheck size={20} />
              </Flex>
              <Stack gap={0}>
                <Text color={"gray.900"} fontSize={'sm'}>
                  Your order has been delivered. Thank you for shopping at
                  Clicon!
                </Text>
                <Text color={"gray.500"} fontSize={'sm'}>23 Jan, 2021 at 7:32 PM</Text>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default TrackOrderDetailsPage;
