import { chakra, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  Layers,
  Clock,
  MapPin,
  ShoppingCart,
  Heart,
  Copy,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";

import { useSignout } from "@/services/auth/auth.hooks";
import { queryKeys } from "@/services/queryKeys";

const Link = chakra(RouterLink);

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Layers />,
    exact: true,
  },
  {
    name: "Order History",
    href: "/dashboard/orders",
    icon: <Clock />,
    exact: false,
  },
  {
    name: "Track Order",
    href: "/track",
    icon: <MapPin />,
    exact: true,
  },
  {
    name: "Shopping Cart",
    href: "/cart",
    icon: <ShoppingCart />,
    exact: true,
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: <Heart />,
    exact: true,
  },
  {
    name: "Compare",
    href: "/compare",
    icon: <Copy />,
    exact: true,
  },
  {
    name: "Browsing History",
    href: "/dashboard/history",
    icon: <History />,
    exact: true,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
    exact: false,
  },
];

const Sidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { mutate, isPending } = useSignout({
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: "success",
      });
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
    <Flex
      gap={{ base: 1 }}
      direction={"column"}
      justifyContent={"space-between"}
      py={4}
      color={"gray.600"}
      bg="white"
      shadow="md"
      borderRadius="md"
      display={{ base: "none", md: "flex" }}
      minW={{ base: "200px", md: "220px", lg: "240px" }}
      maxH={"450px"}
    >
      {links.map(({ href, icon, name, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            to={href}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Flex
              gap={4}
              align={"center"}
              pl={{ base: 4, sm: 6 }}
              pr={{ base: 6, sm: 8, md: 10 }}
              py={2}
              bg={isActive ? "orange.500" : ""}
              color={isActive ? "white" : ""}
              _hover={{
                bg: "orange.300",
                color: "white",
              }}
            >
              <Icon size="md">{icon}</Icon>
              <Text>{name}</Text>
            </Flex>
          </Link>
        );
      })}

      <Flex
        gap={4}
        align={"center"}
        justify={isPending ? "center" : "start"}
        pl={{ base: 4, sm: 6 }}
        pr={{ base: 6, sm: 8, md: 10 }}
        py={2}
        _hover={{
          textDecoration: "none",
          background: "red.500",
          color: "white",
        }}
        mt={2}
        cursor={"pointer"}
        onClick={() => mutate()}
      >
        {isPending ? (
          <Spinner size="sm" alignSelf={"center"} />
        ) : (
          <>
            <Icon size="lg">
              <LogOut />
            </Icon>
            <Text>Logout</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
