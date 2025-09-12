import {
  Dialog,
  Portal,
  CloseButton,
  Field,
  HStack,
  Stack,
  Textarea,
  createListCollection,
  Select,
  Flex,
  RatingGroup,
  Button,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  feedback: z.string(),
  rating: z.string().array(),
});

type FormValues = z.infer<typeof formSchema>;

const ReviewModal = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Dialog.Root open={open} onOpenChange={closeModal} placement={"center"}>
      <Portal>
        <Dialog.Backdrop zIndex={1500} />
        <Dialog.Positioner zIndex={1501}>
          <Dialog.Content>
            <Dialog.Header
              borderBottom={"0.5px solid"}
              borderColor={"gray.600"}
            >
              <Dialog.Title textTransform={"uppercase"}>
                Add Review
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack as={"form"} onSubmit={onSubmit}>
                <Field.Root invalid={!!errors.rating}>
                  <Field.Label>Rating</Field.Label>
                  <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                        collection={reviews}
                        size="sm"
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Rating" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {reviews.items.map((rev) => (
                              <Select.Item item={rev} key={rev.value}>
                                <Flex gap={2} alignItems={"center"}>
                                  <RatingGroup.Root
                                    readOnly
                                    count={5}
                                    defaultValue={rev.value}
                                    size="sm"
                                    colorPalette={"orange"}
                                  >
                                    <RatingGroup.HiddenInput />
                                    <RatingGroup.Control />
                                  </RatingGroup.Root>
                                  <Select.ItemText>
                                    {rev.value} Star Rating
                                  </Select.ItemText>
                                </Flex>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>{errors.rating?.message}</Field.ErrorText>
                </Field.Root>
                <HStack gap="10" width="full">
                  <Field.Root required>
                    <Field.Label>Feedback</Field.Label>
                    <Textarea
                      color={"gray.400"}
                      placeholder="Write down your feedback about our product & services"
                      variant="outline"
                      autoresize
                      {...register("feedback")}
                    />
                  </Field.Root>
                </HStack>
                <Button
                  mt={2}
                  type="submit"
                  size="md"
                  w="max-content"
                  textTransform="uppercase"
                  bg="orange.500"
                  color="white"
                  fontWeight={700}
                  _hover={{ bg: "orange.500" }}
                  _active={{ bg: "orange.500" }}
                >
                  Publish Review
                </Button>
              </Stack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReviewModal;

const reviews = createListCollection({
  items: [
    {
      label: "1 Star Rating",
      value: 1,
    },
    {
      label: "2 Star Rating",
      value: 2,
    },
    {
      label: "3 Star Rating",
      value: 3,
    },
    {
      label: "4 Star Rating",
      value: 4,
    },
    {
      label: "5 Star Rating",
      value: 5,
    },
  ],
});
