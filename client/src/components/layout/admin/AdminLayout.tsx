
import type { PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";
import { useMatches } from "@tanstack/react-router";

import BreadCrumbComp from "../BreadCrumbComp";
import Layout from "..";
import Sidebar from "./Sidebar";

import type { Crumb } from "../constants";

type AdminLayoutProps = PropsWithChildren & {
  items?: Crumb[];
};

const AdminLayout = (props: AdminLayoutProps) => {
  const matches = useMatches();

  return (
    <Layout>
      <BreadCrumbComp
        items={matches[matches.length - 1].staticData.breadcrumbs!}
      />
      <Flex
        px={{ base: 6, lg: 12 }}
        py={{ base: 6 }}
        maxW={{ base: "full", xl: "1440px" }}
        mx="auto"
        w="full"
        gap={{ base: 4, md: 6, lg: 8 }}
      >
        <Sidebar />
        {props.children}
      </Flex>
    </Layout>
  );
};

export default AdminLayout;
