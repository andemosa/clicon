import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  chakra,
} from "@chakra-ui/react";
import { House } from "lucide-react";
import { Link as RouterLink } from "@tanstack/react-router";

const NavigateLink = chakra(RouterLink);

const NotFoundPage = () => {
  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        color={"gray.900"}
      >
        <Stack
          mx={"auto"}
          align={"center"}
          textAlign={"center"}
          w={"full"}
          maxW={"600px"}
          gap={2}
          p={{ base: 4, md: 6 }}
        >
          <Image src="/images/404.webp" alt="404 Illustration" maxW="320px" />
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb={3}
          >
            404 - Page Not Found
          </Heading>
          <Text color="gray.600" maxW="lg" mb={8}>
            Sorry, we couldn’t find the page you’re looking for. The link may be
            broken or the page has been removed.
          </Text>
          <NavigateLink
            to={"/"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              size="md"
              w="max-content"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
            >
              <House />
              &nbsp;Go to home
            </Button>
          </NavigateLink>
        </Stack>
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
