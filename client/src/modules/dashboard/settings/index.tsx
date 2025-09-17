import {
  Stack,
  Alert,
  Text,
  GridItem,
  Separator,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";
import AddressSettings from "./AddressSettings";

import { useProfileQuery } from "@/services/profile/profile.hooks";

const DashboardSettingsPage = () => {
  const { data, isFetching, isError } = useProfileQuery();

  if (isError) {
    return (
      <Alert.Root status="error" mt={4}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error occurred</Alert.Title>
          <Alert.Description>Failed to fetch user profile</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!data && !isFetching) {
    return (
      <Stack p={10} align="center">
        <Text>No profile data found.</Text>
      </Stack>
    );
  }

  if (isFetching && !data) {
    return (
      <Stack gap={4} color="gray.900" w="full">
        <Stack border="1px solid" borderColor="gray.100">
          <Text py={2} px={4} textTransform="uppercase" fontWeight="medium">
            Account Settings
          </Text>
          <Separator variant="solid" size="sm" w="full" />
          <SimpleGrid
            columns={{ base: 1, lg: 4 }}
            gap={{ base: 6 }}
            width="full"
            rounded="md"
            h="max-content"
            p={4}
          >
            <GridItem
              colSpan={{ base: 1 }}
              display="flex"
              justifyContent="center"
            >
              <Skeleton
                rounded="full"
                boxSize={{ base: "150px", lg: "120px", xl: "150px" }}
              />
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 3 }}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <SkeletonText noOfLines={2} height="16px" />
                <SkeletonText noOfLines={2} height="16px" />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={4}>
                <SkeletonText noOfLines={2} height="16px" />
                <SkeletonText noOfLines={2} height="16px" />
              </SimpleGrid>
              <Skeleton mt={6} height="40px" w="120px" rounded="md" />
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Stack>
    );
  }

  if (data) {
    const billingAddress = data.addresses.find(
      (item) => item.type === "billing"
    )!;
    const shippingAddress = data.addresses.find(
      (item) => item.type === "shipping"
    )!;

    return (
      <Stack gap={4} color={"gray.900"} w={"full"}>
        <AccountSettings data={data} isFetching={isFetching} />
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          <AddressSettings
            userData={data}
            addressData={billingAddress ?? null}
            isFetching={isFetching}
            type="billing"
          />
          <AddressSettings
            userData={data}
            addressData={shippingAddress ?? null}
            isFetching={isFetching}
            type="shipping"
          />
        </SimpleGrid>
        {data.thirdPartyAuthProvider ? null : <PasswordSettings />}
      </Stack>
    );
  }

  return null;
};

export default DashboardSettingsPage;
