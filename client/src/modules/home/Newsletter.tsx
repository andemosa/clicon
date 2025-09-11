import { ArrowRightIcon } from "@/components/icons/GeneralIcons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

const Newsletter = () => {
  return (
    <Box bg="blue.700" py={10} px={6} textAlign={"center"}>
      <VStack mx={"auto"} color={"white"} gap={4} maxW={"1440px"}>
        <Box>
          <Heading fontSize={{ base: "lg", md: 'xl', lg: "2xl" }}>
            Subscribe to our newsletter
          </Heading>
          <Text fontSize={"sm"}>Stay updated with the latest information</Text>
        </Box>
        <Flex
          bg={"white"}
          p={{ base: 1, md: 2 }}
          align={"center"}
          justify={"space-between"}
          borderRadius={"sm"}
          w={{ base: "full", sm: "90%", md: "75%", lg: "65%", xl: "60%" }}
          as={"form"}
        >
          <Input
            flex="1"
            placeholder="Email address"
            border={"none"}
            bg={"transparent"}
            p={0}
            px={2}
            css={{ "--focus-color": "transparent" }}
            _hover={{ border: "none" }}
            _active={{ border: "none" }}
            color={"blue.700"}
          />
          <Button
            type="submit"
            size={{ base: "xs", md: "sm", lg: "md" }}
            textTransform="uppercase"
            bg="orange.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "orange.500" }}
            _active={{ bg: "orange.500" }}
          >
            Subscribe&nbsp;
            <ArrowRightIcon />
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Newsletter;
