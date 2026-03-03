import {
  Box,
  Flex,
  Heading,
  Icon,
  chakra,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Separator,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import {
  AppStoreIcon,
  FooterLogo,
  GooglePlayIcon,
} from "../icons/GeneralIcons";

import { useFooterTopQuery } from "@/services/product/product.hooks";

const Link = chakra(RouterLink);

const Footer = () => {
  const { data, isLoading } = useFooterTopQuery();

  return (
    <Box w="100%" color="gray.400" bg="gray.900">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap="40px"
        maxW={{ base: "full", xl: "1440px" }}
        mx="auto"
        fontSize={{ base: "xs", lg: "sm" }}
        px={{ base: 6, lg: 12 }}
        py={{ base: 4, md: 8, lg: 12 }}
      >
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={8}>
          <Stack>
            <Icon w="max-content" h="auto" maxH={12} alignSelf="start">
              <FooterLogo />
            </Icon>

            <Stack gap={1}>
              <Text>Customer Supports:</Text>
              <Text color="white">(629) 555-0129</Text>
            </Stack>

            <Text>4517 Washington Ave. Manchester, Kentucky 39495</Text>

            <Text color="white">info@kinbo.com</Text>
          </Stack>

          <Stack align={{ base: "start", lg: "center" }}>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color="white"
            >
              Top Category
            </Heading>

            <Stack gap={1}>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} height="16px" width="120px" />
                  ))
                : data?.categories.map((category) => (
                    <Link key={category.slug} to={`/c/${category.slug}`}>
                      {category.name}
                    </Link>
                  ))}
            </Stack>
          </Stack>

          <Stack align={{ base: "start", lg: "center" }}>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color="white"
            >
              Quick Links
            </Heading>

            <Stack gap={1}>
              <Link to="/products">Shop Product</Link>
              <Link to="/cart">Shopping Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/compare">Compare</Link>
              <Link to="/track-order">Track Order</Link>
              <Link to="/help">Customer Help</Link>
              <Link to="/about">About Us</Link>
            </Stack>
          </Stack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8}>
          <Stack>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color="white"
            >
              Download App
            </Heading>

            <Stack gap={2}>
              <Icon w="max-content" h="auto" maxH={16} alignSelf="start">
                <AppStoreIcon />
              </Icon>

              <Icon w="max-content" h="auto" maxH={16} alignSelf="start">
                <GooglePlayIcon />
              </Icon>
            </Stack>
          </Stack>

          <Stack>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color="white"
            >
              Popular Tag
            </Heading>

            <Flex wrap="wrap" gap={2}>
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      height="32px"
                      width="70px"
                      borderRadius="md"
                    />
                  ))
                : data?.tags.map((tag) => (
                    <Link key={tag.name} to={`/t/${tag.name}`}>
                      <Tag.Root
                        size="md"
                        textTransform={"capitalize"}
                        _hover={{
                          bg: "whiteAlpha.200",
                          cursor: "pointer",
                        }}
                      >
                        <Tag.Label>{tag.name}</Tag.Label>
                      </Tag.Root>
                    </Link>
                  ))}
            </Flex>
          </Stack>
        </SimpleGrid>
      </SimpleGrid>

      <Separator />

      <Text textAlign={{ base: "left", sm: "center" }} px={2} py={4}>
        Kinbo - eCommerce Template © 2021. Design by Templatecookie. Built
        by&nbsp;
        <a
          href="http://andemosa.tech"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontStyle: "italic",
            color: "#1B6392",
            textDecoration: "underline",
          }}
        >
          andemosa
        </a>
      </Text>
    </Box>
  );
};

export default Footer;
