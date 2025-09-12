import { Stack, Heading, Text } from "@chakra-ui/react";

import RecentOrders from "./dashboard/RecentOrders";
import UserStats from "./dashboard/UserStats";

const DashboardPage = () => {
  return (
    <Stack gap={6}>
      <Stack gap={1} w={{ base: "full", sm: "85%", md: "75%", lg: "65%", xl: "55%" }}>
        <Heading>Hello, Kevin</Heading>

        <Text>
          From your account dashboard. you can easily check & view your Recent
          Orders, manage your Shipping and Billing Addresses and edit your
          Password and Account Details.
        </Text>
      </Stack>
      <UserStats />
      <RecentOrders />
    </Stack>
  );
};

export default DashboardPage;
