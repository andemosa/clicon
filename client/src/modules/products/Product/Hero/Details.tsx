import {
  Badge,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  IconButton,
  NumberInput,
  RatingGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import RadioComp from "./RadioComp";
import SelectComp from "./SelectComp";
import { Copy, Heart, Minus, Plus, RefreshCcw, ShoppingCart } from "lucide-react";

const Details = () => {
  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <Box>
          <Flex align={"center"} gap={2}>
            <RatingGroup.Root readOnly count={5} defaultValue={3} size="sm">
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            <Flex align={"center"} gap={1}>
              <Text>4.7 Star Rating</Text>
              <Text>(21,671 User feedback)</Text>
            </Flex>
          </Flex>
          <Heading mt={1}>
            2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB
            SSD Storage) - Space Gray
          </Heading>
        </Box>
        <SimpleGrid columns={{ base: 2 }} gap={{ base: 2 }}>
          <Flex align={"center"} gap={1}>
            <Text>Sku:</Text>
            <Text>A264671</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Text>Availability:</Text>
            <Text>In Stock</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Text>Brand:</Text>
            <Text>Apple</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Text>Category:</Text>
            <Text> Electronics Devices</Text>
          </Flex>
        </SimpleGrid>
      </Stack>
      <Flex gap={2}>
        <HStack gap={2}>
          <Text fontSize="md" color="blue.500" fontWeight="semibold">
            $1699
          </Text>
          <Text as="s" fontSize="sm" color="gray.500" fontWeight="medium">
            $1099
          </Text>
        </HStack>
        <Badge>21% OFF</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 2 }} gap={{ base: 2 }}>
        <Stack>
          <Text>Color</Text>
          <RadioComp />
        </Stack>
        <Stack>
          <Text>Size</Text>
          <SelectComp />
        </Stack>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 4 }} gap={{ base: 2 }}>
        <GridItem colSpan={{ base: 1 }}>
          <NumberInput.Root
            defaultValue="3"
            unstyled
            spinOnPress={false}
            min={0}
          >
            <HStack gap="2">
              <NumberInput.DecrementTrigger asChild>
                <IconButton variant="outline" size="sm">
                  <Minus />
                </IconButton>
              </NumberInput.DecrementTrigger>
              <NumberInput.ValueText
                textAlign="center"
                fontSize="lg"
                minW="3ch"
              />
              <NumberInput.IncrementTrigger asChild>
                <IconButton variant="outline" size="sm">
                  <Plus />
                </IconButton>
              </NumberInput.IncrementTrigger>
            </HStack>
          </NumberInput.Root>
        </GridItem>
        <GridItem colSpan={{ base: 2 }}>
          <Button
            size="md"
            w="full"
            textTransform="uppercase"
            bg="orange.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "orange.500" }}
            _active={{ bg: "orange.500" }}
          >
            Add to Cart <ShoppingCart />
          </Button>
        </GridItem>
        <GridItem colSpan={{ base: 1 }}>
          <Button
            textTransform="uppercase"
            borderColor="orange.500"
            color="orange.500"
            fontWeight={700}
            _hover={{ borderColor: "orange.500", bg: "white" }}
            _active={{ borderColor: "orange.500", bg: "white" }}
            variant={"outline"}
            size="md"
            w="full"
          >
            View Cart
          </Button>
        </GridItem>
      </SimpleGrid>
      <Flex align={"center"} justify={"space-between"} gap={4}>
        <Flex align={"center"} gap={4}>
          <Flex align={"center"} gap={2}>
            <IconButton size="sm" variant={'ghost'}>
              <Heart />
            </IconButton>
            <Text>Add to wishlist</Text>
          </Flex>
          <Flex align={"center"} gap={2}>
            <IconButton size="sm" variant={'ghost'}>
              <RefreshCcw />
            </IconButton>
            <Text>Add to Compare</Text>
          </Flex>
        </Flex>
        <Flex align={"center"} gap={1}>
          <Text>Share product:</Text>
          <IconButton size="sm" variant={'ghost'}>
            <Copy />
          </IconButton>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Details;
