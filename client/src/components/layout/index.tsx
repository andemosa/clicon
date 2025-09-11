import type { PropsWithChildren } from "react";
import { Stack } from "@chakra-ui/react";

import { DocHeight } from "@/theme";
import Navbar from "./navbar/Navbar";
import Topbar from "./topbar/Topbar";
import Footer from "./Footer";

const Layout = (props: PropsWithChildren) => {
  return (
    <Stack w="full" minH={DocHeight} color={"gray.600"} gap={0}>
      <Navbar />
      <Topbar />
      <Stack
        as="main"
        w="full"
        minH={"full"}
        direction="column"
        {...props}
        flex={1}
        gap={0}
      >
        {props.children}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Layout;
