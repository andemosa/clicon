import {
  Stack,
  Text,
  Separator,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";

const SeoSettings = () => {
  return (
    <Stack
      gap={0}
      border={"1px solid"}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        SEO Settings
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea placeholder="" variant="outline" autoresize />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>
      </Stack>
    </Stack>
  );
};

export default SeoSettings;
