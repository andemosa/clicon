import {
  Stack,
  Heading,
  Text,
  chakra,
  Alert,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

import RecentOrders from "./dashboard/RecentOrders";
import UserStats from "./dashboard/UserStats";

import { useDashboardQuery } from "@/services/profile/profile.hooks";

const Link = chakra(RouterLink);

const DashboardPage = () => {
  const { data, isFetching, isError } = useDashboardQuery();

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>Failed to fetch user details</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Stack gap={6}>
      <Stack
        gap={1}
        w={{ base: "full", sm: "85%", md: "75%", lg: "65%", xl: "60%" }}
      >
        <Heading>
          Hello,&nbsp;
          {isFetching ? (
            <Skeleton w="100px" />
          ) : (
            data?.firstName
          )}
        </Heading>

        <Text>
          From your account dashboard, you can easily check & view your&nbsp;
          <Link to="/dashboard/orders" color="blue.500">
            Recent Orders
          </Link>
          , manage your&nbsp;
          <Link to="/dashboard/settings" color="blue.500">
            Shipping and Billing Addresses
          </Link>
          , and edit your&nbsp;
          <Link to="/dashboard/settings" color="blue.500">
            Password and Account Details
          </Link>
          .
        </Text>
      </Stack>

      {isFetching ? (
        <>
          <Skeleton h="250px" w="full" rounded="md" />
          <Skeleton h="250px" w="full" rounded="md" />
        </>
      ) : data ? (
        <>
          <UserStats data={data} />
          <RecentOrders orders={data.orders} />
        </>
      ) : null}
    </Stack>
  );
};

export default DashboardPage;
