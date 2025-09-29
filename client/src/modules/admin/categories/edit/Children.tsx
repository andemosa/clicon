import {
  Stack,
  Text,
  Separator,
  Tag,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Spinner,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link as RouterLink } from "@tanstack/react-router";

import { toaster } from "@/components/ui/toaster";

import { useDeleteCategory } from "@/services/category/category.hooks";
import { queryKeys } from "@/services/queryKeys";
import type { Category } from "@/types";

const Link = chakra(RouterLink);

const Children = ({ categories }: { categories: Category[] }) => {
  return (
    <Stack
      gap={0}
      border={"1px solid"}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Sub Categories
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Stack wrap="wrap" direction="row">
          {categories.map((cat) => (
            <ChildTag key={cat.id} {...cat} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Children;

const ChildTag = ({ id, name, slug }: Category) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteCategory(slug!, {
      onSuccess: () => {
        toaster.create({
          title: "Category deleted successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getCategories,
        });
      },
      onError: (err) => {
        toaster.create({
          title: err.message,
          type: "error",
        });
      },
    });

  return (
    <>
      <Tag.Root key={id} size={"lg"}>
        <Tag.Label>
          <Link href={`/admin/categories/${slug}/edit`}>{name}</Link>
        </Tag.Label>
        <Tag.EndElement cursor={"pointer"}>
          <Tag.CloseTrigger
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        </Tag.EndElement>
      </Tag.Root>
      <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
        <Portal>
          <Dialog.Backdrop zIndex={1500} />
          <Dialog.Positioner zIndex={1501}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Category</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  Are you sure you want to delete&nbsp;
                  <Text as="span" fontWeight="bold">
                    {name}
                  </Text>
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  bg="red.500"
                  color="white"
                  fontWeight={700}
                  _hover={{ bg: "red.500" }}
                  _active={{ bg: "red.500" }}
                  onClick={() => deleteMutate()}
                  disabled={isDeletePending}
                >
                  {isDeletePending ? <Spinner size="sm" /> : <>Delete</>}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
