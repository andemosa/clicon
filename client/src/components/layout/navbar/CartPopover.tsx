import {
  Box,
  Button,
  chakra,
  CloseButton,
  Dialog,
  Flex,
  IconButton,
  Image,
  Popover,
  Portal,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

import { ArrowRightIcon, CartIcon } from "../../icons/GeneralIcons";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const mockCart: CartItem[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99,
    image: "https://via.placeholder.com/60",
    quantity: 1,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149,
    image: "https://via.placeholder.com/60",
    quantity: 2,
  },
];

const Link = chakra(RouterLink);

export function CartPopover() {
  const [cart, setCart] = useState<CartItem[]>(mockCart);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelectedItem(null);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <IconButton
          aria-label="Cart"
          variant={"plain"}
          position={"relative"}
          size={"xl"}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
        >
          <CartIcon />
          <Flex
            align={"center"}
            justify={"center"}
            color={"blue.700"}
            position={"absolute"}
            top={"8px"}
            right={"8px"}
            fontSize={"0.8rem"}
            bgColor={"white"}
            fontWeight={"semibold"}
            borderRadius={"full"}
            h={4}
            w={4}
            zIndex={9999}
            p={1}
          >
            {cart.length}
          </Flex>
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="360px" rounded="lg" shadow="lg" bg="white">
            <Popover.Arrow />
            <Flex gap={1} align={"center"} p="4">
              <Text fontWeight={500}>Shopping Cart</Text>
              <Text as={"span"} fontWeight={400}>
                ({cart.length})
              </Text>
            </Flex>

            <Separator />

            {cart.length === 0 ? (
              <Text color="gray.500">Your cart is empty</Text>
            ) : (
              <>
                <Stack gap="4">
                  {cart.map((item) => (
                    <Flex key={item.id} align="center" px="4" py={4} gap={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="60px"
                        rounded="md"
                        borderColor={"gray.100"}
                      />
                      <Box flex={1}>
                        <Text color={"gray.900"}>{item.name}</Text>
                        <Text fontWeight={500} color="blue.500">
                          1 x ${item.price} × {item.quantity}
                        </Text>
                      </Box>
                      <CloseButton
                        size="sm"
                        ml={"auto"}
                        onClick={() => setSelectedItem(item)}
                      />
                    </Flex>
                  ))}
                </Stack>
                <Separator />
                <Stack p="4">
                  <Flex justify="space-between">
                    <Text color={"gray.700"}>Sub-Total:</Text>
                    <Text color={"gray.900"} fontWeight={500}>
                      ${total}
                    </Text>
                  </Flex>

                  <VStack>
                    <Link to={"/checkout"} _hover={{ textDecoration: "none" }} w={'full'}>
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
                        Checkout Now&nbsp;
                        <ArrowRightIcon />
                      </Button>
                    </Link>
                    <Link to={"/cart"} _hover={{ textDecoration: "none" }} w={'full'}>
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
                    </Link>
                  </VStack>
                </Stack>
              </>
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>

      <Dialog.Root
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      >
        <Portal>
          <Dialog.Backdrop zIndex={1500} />
          <Dialog.Positioner zIndex={1501}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Remove Item</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  Are you sure you want to remove{" "}
                  <Text as="span" fontWeight="bold">
                    {selectedItem?.name}
                  </Text>{" "}
                  from your cart?
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorScheme="red"
                  onClick={() => selectedItem && handleRemove(selectedItem.id)}
                >
                  Remove
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Popover.Root>
  );
}
