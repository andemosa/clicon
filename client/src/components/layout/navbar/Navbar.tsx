import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  chakra,
  Icon,
  CloseButton,
  Drawer,
  Portal,
  HStack,
  type FlexProps,
  Separator,
  VStack,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Home,
  Store,
  ShoppingCart,
  Heart,
  Layers,
  Settings,
  LogOut,
  Clock,
  Copy,
  MapPin,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Logo } from "../../icons/GeneralIcons";
import DesktopMenu from "./DesktopMenu";
import { toaster } from "@/components/ui/toaster";

import { useSignout } from "@/services/auth/auth.hooks";
import { useProfileQuery } from "@/services/profile/profile.hooks";
import { queryKeys } from "@/services/queryKeys";

const links = [
  { name: "Home", href: "/", icon: <Home size={18} />, loggedIn: false },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Layers size={18} />,
    loggedIn: true,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: <Store size={18} />,
    loggedIn: false,
  },
  {
    name: "Order History",
    href: "/dashboard/orders",
    icon: <Clock />,
    loggedIn: true,
  },
  {
    name: "Track Order",
    href: "/track",
    icon: <MapPin />,
    loggedIn: true,
  },
  {
    name: "Shopping Cart",
    href: "/cart",
    icon: <ShoppingCart size={18} />,
    loggedIn: false,
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: <Heart size={18} />,
    loggedIn: false,
  },
  {
    name: "Compare",
    href: "/compare",
    icon: <Copy />,
    loggedIn: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
    loggedIn: true,
  },
];

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Link = chakra(RouterLink);

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, isError } = useProfileQuery();

  return (
    <Box w="100%" bg={{ base: "blue.700" }} color={{ base: "white" }}>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={{ base: 8, lg: 16 }}
        px={{ base: 6, lg: 12 }}
        py={2}
        maxW={{ base: "full", xl: "1440px" }}
        mx={"auto"}
        fontSize={{ base: "xs", lg: "sm" }}
        display={{ base: "none", md: "flex" }}
      >
        <Text>Welcome to Clicon online eCommerce store</Text>
        <Flex align={"center"} gap={1}>
          <Text>Follow us:</Text>
          <HStack>
            <Icon boxSize={4} color="white">
              <Instagram />
            </Icon>
            <Icon boxSize={4} color="white">
              <Twitter />
            </Icon>
            <Icon boxSize={4} color="white">
              <Youtube />
            </Icon>
            <Icon boxSize={4} color="white">
              <Facebook />
            </Icon>
          </HStack>
        </Flex>
      </Flex>
      <Separator />
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={{ base: 8, lg: 16 }}
        px={{ base: 6, lg: 12 }}
        py={3}
        maxW={{ base: "full", xl: "1440px" }}
        mx={"auto"}
      >
        <Link to={"/"} _hover={{ textDecoration: "none" }}>
          <Icon boxSize="8" color="blue.700">
            <Logo />
          </Icon>
        </Link>

        <DesktopMenu />

        <Box display={{ base: "block", md: "none" }}>
          <Drawer.Root
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            size={"full"}
          >
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                <Icon boxSize="8" color="blue.700">
                  <MenuIcon />
                </Icon>
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>
                      <Link to={"/"} _hover={{ textDecoration: "none" }}>
                        <Icon boxSize="8" color="blue.700">
                          <Logo fill="#1B6392" />
                        </Icon>
                      </Link>
                    </Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Flex
                      align={"center"}
                      justify={{ base: "start", sm: "center" }}
                    >
                      {isFetching ? (
                        <VStack gap="5" p={4}>
                          <Skeleton height="20px" />
                          <Skeleton height="20px" />
                          <Skeleton height="40px" />
                        </VStack>
                      ) : data ? (
                        <MobileMenu isLoggedIn setOpen={setOpen} />
                      ) : isError ? (
                        <MobileMenu setOpen={setOpen} />
                      ) : null}
                    </Flex>
                  </Drawer.Body>

                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="md" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Box>
      </Flex>
    </Box>
  );
};

const MobileMenu = ({
  isLoggedIn = false,
  setOpen,
}: {
  isLoggedIn?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useSignout({
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: "success",
      });
      setOpen(false);
      navigate({ to: "/", reloadDocument: true });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getProfile,
      });
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  return (
    <VStack gap={6} mt={4} align="start">
      {links
        .filter((link) => (isLoggedIn ? true : !link.loggedIn))
        .map((link) => (
          <MenuItem
            key={link.name}
            to={link.href}
            icon={link.icon}
            label={link.name}
          />
        ))}

      {isLoggedIn ? (
        <Flex
          gap={{ base: 6, sm: 8 }}
          align="center"
          px={4}
          py={2}
          _hover={{ bg: "gray.100", borderRadius: "md" }}
          onClick={() => mutate()}
        >
          {isPending ? (
            <Spinner size="sm" />
          ) : (
            <>
              <Icon size="lg">
                <LogOut />
              </Icon>
              <Text>Logout</Text>
            </>
          )}
        </Flex>
      ) : (
        <HStack gap={8}>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
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
              Sign up
            </Button>
          </Link>
          <Link to={"/signin"} style={{ textDecoration: "none" }}>
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
              Signin
            </Button>
          </Link>
        </HStack>
      )}
    </VStack>
  );
};

interface MenuItemProps extends FlexProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, label, ...rest }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Flex
        gap={{ base: 6, sm: 8 }}
        align="center"
        px={4}
        py={2}
        _hover={{ bg: "gray.100", borderRadius: "md" }}
        {...rest}
      >
        <Icon size="lg">{icon}</Icon>
        <Text>{label}</Text>
      </Flex>
    </Link>
  );
};

export default NavBar;
