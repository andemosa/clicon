import {
  Button,
  GridItem,
  SimpleGrid,
  Stack,
  Field,
  Input,
  Avatar,
  Text,
  Separator,
} from "@chakra-ui/react";

const AccountSettings = () => {
  return (
    <Stack border={"1px solid"} gap={0} borderColor={"gray.100"} color={"gray.900"}>
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Account Setting
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <SimpleGrid
        columns={{ base: 1, lg: 5 }}
        gap={{ base: 6 }}
        width="full"
        rounded="md"
        h={"max-content"}
        p={4}
      >
        <GridItem
          colSpan={{ base: 1 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
        >
          <Avatar.Root size="2xl">
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <Stack gap={2}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4 }}>
              <Field.Root>
                <Field.Label>First name</Field.Label>
                <Input />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root>
              <Field.Root>
                <Field.Label>Last name</Field.Label>
                <Input />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4 }}>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input type="email" />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root>
              <Field.Root>
                <Field.Label>Phone</Field.Label>
                <Input type="number" />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
            <Button
              size="md"
              w="max-content"
              textTransform="uppercase"
              bg="orange.500"
              color="white"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.500" }}
              mt={2}
            >
              Save Changes
            </Button>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountSettings;
