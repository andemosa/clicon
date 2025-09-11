import {
  Flex,
  InputGroup,
  Input,
  chakra,
  type IconButtonProps,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { HeartIcon, SearchIcon } from "../../icons/GeneralIcons";
import type { ReactNode } from "react";
import { CartPopover } from "./CartPopover";
import AuthPopover from "./AuthPopover";

const Link = chakra(RouterLink);

const DesktopMenu = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      flex={1}
      gap={8}
      display={{ base: "none", md: "flex" }}
    >
      <InputGroup
        bg={"white"}
        endElement={
          <Icon boxSize="8" color="blue.700">
            <SearchIcon />
          </Icon>
        }
        flex={1}
        maxW={"60%"}
        mx="auto"
      >
        <Input placeholder="Search for anything..." />
      </InputGroup>
      <Flex gap={{ base: 6, lg: 8 }} pr={{ base: 4, lg: 8 }}>
        <CartPopover />
        <MenuItem to="/wishlist">
          <HeartIcon />
        </MenuItem>
        <AuthPopover />
      </Flex>
    </Flex>
  );
};

export default DesktopMenu;

interface MenuItemProps extends IconButtonProps {
  children: ReactNode;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, to, ...rest }) => {
  return (
    <Link to={to} _hover={{ textDecoration: "none" }}>
      <IconButton
        variant={"plain"}
        position={"relative"}
        size={"xl"}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        _focus={{ boxShadow: "none" }}
        color="blue.700"
        {...rest}
      >
        {children}
      </IconButton>
    </Link>
  );
};
