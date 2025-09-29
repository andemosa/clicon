import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Text,
  Spinner,
  Field,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";

import { queryKeys } from "@/services/queryKeys";
import {
  useCreateTag,
  useDeleteTag,
  useUpdateTag,
} from "@/services/tag/tag.hooks";
import type { Tag } from "@/types";

const tagSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

type FormValues = z.infer<typeof tagSchema>;

const TagModal = ({
  closeModal,
  open,
  type,
  tag,
}: {
  open: boolean;
  closeModal: () => void;
  tag?: Tag;
  type: "new" | "edit" | "delete";
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag?.name ?? "",
    },
  });

  const { mutate: createMutate, isPending: isCreatePending } = useCreateTag({
    onSuccess: () => {
      toaster.create({
        title: "Tag created successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getTags,
      });
      closeModal();
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteTag(
    tag?.id!,
    {
      onSuccess: () => {
        toaster.create({
          title: "Tag deleted successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getTags,
        });
        closeModal();
      },
      onError: (err) => {
        toaster.create({
          title: err.message,
          type: "error",
        });
      },
    }
  );

  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateTag(
    tag?.id!,
    {
      onSuccess: () => {
        toaster.create({
          title: "Tag updated successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getTags,
        });
        closeModal();
      },
      onError: (err) => {
        toaster.create({
          title: err.message,
          type: "error",
        });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    if (type === "new") {
      createMutate({ name: data.name });
    } else if (type === "edit") {
      updateMutate({ name: data.name });
    } else if (type === "delete") {
      deleteMutate();
    }
  });

  return (
    <Dialog.Root open={open} onOpenChange={closeModal}>
      <Portal>
        <Dialog.Backdrop zIndex={1500} />
        <Dialog.Positioner zIndex={1501}>
          <Dialog.Content as={"form"} onSubmit={onSubmit}>
            <Dialog.Header>
              <Dialog.Title>
                {type === "new" && "Add Tag"}
                {type === "edit" && "Edit Tag"}
                {type === "delete" && "Delete Tag"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {type === "delete" ? (
                <Text>
                  Are you sure you want to delete <b>{tag?.name}</b>?
                </Text>
              ) : (
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Name</Field.Label>
                  <Input {...register("name")} />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                bg={type === "delete" ? "red.500" : "orange.500"}
                color="white"
                fontWeight={700}
                _hover={{ bg: type === "delete" ? "red.500" : "orange.500" }}
                _active={{ bg: type === "delete" ? "red.500" : "orange.500" }}
                disabled={isCreatePending || isUpdatePending || isDeletePending}
              >
                {isCreatePending || isUpdatePending || isDeletePending ? (
                  <Spinner size="sm" />
                ) : type === "delete" ? (
                  "Delete"
                ) : (
                  "Save"
                )}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default TagModal;
