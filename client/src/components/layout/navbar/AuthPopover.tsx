import { useState } from "react";
import {
  chakra,
  Flex,
  Icon,
  IconButton,
  Popover,
  Portal,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layers, LogOut, Settings } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";

import { UserIcon } from "../../icons/GeneralIcons";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { toaster } from "@/components/ui/toaster";

import {
  type FormType,
  FORGOTPASSWORD_FORM,
  LOGIN_FORM,
  SIGNUP_FORM,
} from "../constants";

import { useProfileQuery, useSignout } from "@/services/auth/auth.hooks";
import { queryKeys } from "@/services/queryKeys";

const Link = chakra(RouterLink);

const AuthPopover = () => {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState<FormType>(LOGIN_FORM);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const switchToLogin = () => {
    setDisplay(LOGIN_FORM);
  };
  const switchToSignup = () => {
    setDisplay(SIGNUP_FORM);
  };
  const switchToForgotPassword = () => {
    setDisplay(FORGOTPASSWORD_FORM);
  };

  const { data, isFetching, isError } = useProfileQuery();

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
    <Popover.Root
      positioning={{ placement: "bottom-end" }}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Popover.Trigger asChild>
        <IconButton
          aria-label="user"
          variant={"plain"}
          position={"relative"}
          size={"xl"}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
        >
          <UserIcon />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            w={data ? "200px" : "360px"}
            rounded="lg"
            shadow="lg"
            bg="white"
            color={"gray.900"}
          >
            <Popover.Arrow />

            {isFetching ? (
              <Stack gap="5" p={4}>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="40px" />
              </Stack>
            ) : data ? (
              <Stack gap={3} py={4} color={"gray.600"}>
                <Link
                  to={"/dashboard"}
                  _hover={{
                    textDecoration: "none",
                    background: "orange.500",
                    color: "white",
                  }}
                >
                  <Flex gap={4} align={"center"} px={4} py={2}>
                    <Icon size="lg">
                      <Layers />
                    </Icon>
                    <Text>Dashboard</Text>
                  </Flex>
                </Link>
                <Link
                  to={"/settings"}
                  _hover={{
                    textDecoration: "none",
                    background: "orange.500",
                    color: "white",
                  }}
                >
                  <Flex gap={4} align={"center"} px={4} py={2}>
                    <Icon size="lg">
                      <Settings />
                    </Icon>
                    <Text>Settings</Text>
                  </Flex>
                </Link>

                <Flex
                  gap={4}
                  align={"center"}
                  px={4}
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
              </Stack>
            ) : isError ? (
              <>
                {display === LOGIN_FORM ? (
                  <LoginForm
                    switchToForgotPassword={switchToForgotPassword}
                    switchToSignup={switchToSignup}
                  />
                ) : display === SIGNUP_FORM ? (
                  <SignupForm switchToLogin={switchToLogin} />
                ) : display === FORGOTPASSWORD_FORM ? (
                  <ForgotPasswordForm switchToLogin={switchToLogin} />
                ) : null}
              </>
            ) : null}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default AuthPopover;
