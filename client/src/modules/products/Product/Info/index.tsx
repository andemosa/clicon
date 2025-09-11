import { Box, Tabs, useTabs } from "@chakra-ui/react";

const ProductInfo = () => {
  const tabs = useTabs({
    defaultValue: "description",
  });
  return (
    <Box border={"1px solid"} borderColor={"gray.100"}>
      <Tabs.RootProvider value={tabs}>
        <Tabs.List display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Tabs.Trigger value="description" textTransform={'uppercase'}>description</Tabs.Trigger>
          <Tabs.Trigger value="reviews" textTransform={'uppercase'}>Reviews</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="description" p={4}>Manage your description</Tabs.Content>
        <Tabs.Content value="reviews" p={4}>
          Manage your reviews
        </Tabs.Content>
      </Tabs.RootProvider>
    </Box>
  );
};

export default ProductInfo;
