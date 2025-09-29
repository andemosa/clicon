import { useState } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  chakra,
  Icon,
  SimpleGrid,
  GridItem,
  Separator,
  useFileUpload,
  FileUpload,
  Spinner,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "lucide-react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import Info from "./Info";
import Images from "./Images";
import Visibility from "./Visibility";
import Parent from "./Parent";
import DeleteModal from "./DeleteModal";
import Children from "./Children";
import { toaster } from "@/components/ui/toaster";

import { newCategorySchema, type newCategoryFormData } from "@/schemas";

import {
  useDeleteCategory,
  useUpdateCategory,
} from "@/services/category/category.hooks";
import type { Category } from "@/types";
import { queryKeys } from "@/services/queryKeys";

const Link = chakra(RouterLink);

const Display = ({ category }: { category: Category }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(category.image ?? "");
  const [prevImg, setPrevImg] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<newCategoryFormData>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      active: category.isActive,
      description: category.description,
      parent: category.parentId,
      name: category.name,
    },
  });
  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: "image/*",
  });
  const files = fileUpload.acceptedFiles;

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteCategory(category.slug!, {
      onSuccess: () => {
        toaster.create({
          title: "Category deleted successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getCategories,
        });
        navigate({
          to: "/admin/categories",
        });
      },
      onError: (err) => {
        toaster.create({
          title: err.message,
          type: "error",
        });
      },
    });

  const { mutate, isPending } = useUpdateCategory(category.slug!, {
    onSuccess: () => {
      toaster.create({
        title: "Category updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getCategories,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getCategory(category.slug!),
      });
      reset()
      navigate({
        to: "/admin/categories",
      });
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      ...(files.length && { image: files[0] }),
      ...(prevImg && { deleteImage: true }),
      isActive: data.active,
      name: data.name,
      description: data.description,
      parentId: data.parent,
    });
  });

  return (
    <Stack
      gap={4}
      color={"gray.900"}
      w={"full"}
      as={"form"}
      onSubmit={onSubmit}
    >
      <Flex
        gap={4}
        alignItems={{ sm: "center" }}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
      >
        <Flex color="gray.900" gap={3} alignItems={"center"}>
          <Link href="/admin/categories">
            <Icon size="lg">
              <ArrowLeftIcon />
            </Icon>
          </Link>
          <Text fontSize={"sm"}>Back to Categories</Text>
        </Flex>
        <Flex gap={4} alignSelf={"end"}>
          <Button
            disabled={isPending || isDeletePending}
            type="button"
            size="md"
            w="max-content"
            textTransform="uppercase"
            bg="red.500"
            color="white"
            fontWeight={700}
            _hover={{ bg: "red.500" }}
            _active={{ bg: "red.500" }}
            onClick={() => setOpen(true)}
          >
            {isDeletePending ? <Spinner size="sm" /> : <>Delete</>}
          </Button>
          <Button
            disabled={isPending || isDeletePending}
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
            {isPending ? <Spinner size="sm" /> : <>Update</>}
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 4 }}>
        <GridItem
          colSpan={{ lg: 2 }}
          border={"1px solid"}
          borderColor={"gray.100"}
          color={"gray.900"}
          h={"max-content"}
        >
          <Info register={register} errors={errors} />
          <Separator variant="solid" size={"sm"} w={"95%"} my={4} mx={"auto"} />
          <FileUpload.RootProvider value={fileUpload} w={"full"}>
            <Images
              files={files}
              image={image}
              clearImage={() => {
                setImage("");
                setPrevImg(true);
              }}
            />
          </FileUpload.RootProvider>
        </GridItem>
        <Stack gap={4}>
          <Visibility control={control} errors={errors} />
          <Parent
            register={register}
            errors={errors}
            categoryId={category.id}
          />
          {category.children?.length ? (
            <Children categories={category.children} />
          ) : null}
        </Stack>
      </SimpleGrid>

      <Button
        disabled={isPending || isDeletePending}
        type="submit"
        size="md"
        maxW={{ base: "full", md: "50%" }}
        textTransform="uppercase"
        bg="orange.500"
        color="white"
        fontWeight={700}
        _hover={{ bg: "orange.500" }}
        _active={{ bg: "orange.500" }}
        my={4}
      >
        {isPending ? <Spinner size="sm" /> : <>Update</>}
      </Button>

      {open ? (
        <DeleteModal
          closeModal={() => setOpen(false)}
          handleDelete={deleteMutate}
          loading={isDeletePending}
          name={category.name}
          open={open}
        />
      ) : null}
    </Stack>
  );
};

export default Display;
