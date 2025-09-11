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
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import {
  AppStoreIcon,
  FooterLogo,
  GooglePlayIcon,
} from "../icons/GeneralIcons";

const Link = chakra(RouterLink);

const Footer = () => {
  return (
    <Box w="100%" color={"gray.400"} bg={"gray.900"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap="40px"
        maxW={{ base: "full", xl: "1440px" }}
        mx={"auto"}
        fontSize={{ base: "xs", lg: "sm" }}
        px={{ base: 6, lg: 12 }}
        py={{ base: 4, md: 8, lg: 12 }}
      >
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={8}>
          <Stack>
            <Icon w="max-content" h="auto" maxH={12} alignSelf={"start"}>
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
              color={"white"}
            >
              Top Category
            </Heading>
            <Stack gap={1}>
              <Link to={"/"}>Computer & Laptop</Link>
              <Link>SmartPhone</Link>
              <Link>Headphone</Link>
              <Link>Accessories</Link>
              <Link>Camera & Photo</Link>
              <Link>TV & Homes</Link>
            </Stack>
          </Stack>
          <Stack align={{ base: "start", lg: "center" }}>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color={"white"}
            >
              Quick links
            </Heading>
            <Stack gap={1}>
              <Link>Shop Product</Link>
              <Link>Shopping Cart</Link>
              <Link>Wishlist</Link>
              <Link>Compare</Link>
              <Link>Track Order</Link>
              <Link>Customer Help</Link>
              <Link>About Us</Link>
            </Stack>
          </Stack>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8}>
          <Stack>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color={"white"}
            >
              Download App
            </Heading>
            <Stack gap={2}>
              <Icon w="max-content" h="auto" maxH={16} alignSelf={"start"}>
                <AppStoreIcon />
              </Icon>
              <Icon w="max-content" h="auto" maxH={16} alignSelf={"start"}>
                <GooglePlayIcon />
              </Icon>
            </Stack>
          </Stack>
          <Stack>
            <Heading
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "md" }}
              color={"white"}
            >
              Popular Tag
            </Heading>
            <Flex wrap="wrap" gap={2}>
              {[
                "Game",
                "iPhone",
                "TV",
                "Asus Laptops",
                "Macbook",
                "SSD",
                "Graphics Card",
                "Power Bank",
                "Smart TV",
                "Speaker",
                "Tablet",
                "Microwave",
                "Samsung",
              ].map((tag) => (
                <Tag.Root key={tag} size={"md"}>
                  <Tag.Label>{tag}</Tag.Label>
                </Tag.Root>
              ))}
            </Flex>
          </Stack>
        </SimpleGrid>
      </SimpleGrid>
      <Separator />
      <Text textAlign={{ base: "left", sm: "center" }} px={2} py={4}>
        Kinbo - eCommerce Template © 2021. Design by Templatecookie. Built by&nbsp;
        <a
          href="http://andemosa.tech"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontStyle: "italic",
            color: "#1B6392",
            textDecoration: "underline"
          }}
        >
          andemosa
        </a>
      </Text>
    </Box>
  );
};

export default Footer;
