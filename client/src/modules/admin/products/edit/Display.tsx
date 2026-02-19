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
  Spinner,
  useFileUpload,
  FileUpload,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "lucide-react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Category from "./Category";
import Tags from "./Tags";
import Info from "./Info";
import Price from "./Price";
import ImageUploader from "./Image";
import { toaster } from "@/components/ui/toaster";
import DeleteModal from "./DeleteModal";

import { type newProductFormData, newProductSchema } from "@/schemas";
import { queryKeys } from "@/services/queryKeys";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "@/services/product/product.hooks";
import { type Tag, type Product } from "@/types";

const Link = chakra(RouterLink);

const Display = ({ product }: { product: Product }) => {
  const [image, setImage] = useState(product.image ?? "");
  const [tags, setTags] = useState<Tag[]>(product.tags!);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<newProductFormData>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      description: product.description,
      parent: product.category?.id ?? "",
      name: product.name,
      price: product.price,
      stock: product.stock ?? 0,
      discountValue: product.discountValue ?? undefined,
      discountType:
        product.discountType === "percentage" ||
        product.discountType === "fixed"
          ? product.discountType
          : undefined,
    },
  });
  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: "image/*",
  });
  const files = fileUpload.acceptedFiles;

  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteProduct(
    product.id!,
    {
      onSuccess: () => {
        toaster.create({
          title: "Product deleted successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.getProducts,
        });
        navigate({
          to: "/admin/products",
        });
      },
      onError: (err) => {
        toaster.create({
          title: err.message,
          type: "error",
        });
      },
    },
  );

  const { mutate, isPending } = useUpdateProduct(product.id!, {
    onSuccess: () => {
      toaster.create({
        title: "Product updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getProducts,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getProduct(product.id!),
      });
      reset();
      navigate({
        to: "/admin/products",
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
    if (!image && !files.length) {
      toaster.create({
        title: "Please upload an image",
        type: "error",
      });
      return
    }
    const parsedData = newProductSchema.parse(data);

    mutate({
      name: parsedData.name,
      isActive: true,
      description: parsedData.description,
      categoryId: parsedData.parent,
      price: parsedData.price,
      stock: parsedData.stock,
      ...(files.length && { image: files[0] }),
      tagIds: tags.map((item) => item.id),
      ...(parsedData.discountType && {
        discountType: parsedData.discountType,
      }),

      ...(parsedData.discountValue !== undefined &&
        !Number.isNaN(parsedData.discountValue) && {
          discountValue: parsedData.discountValue,
        }),
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
          <Link href="/admin/products">
            <Icon size="lg">
              <ArrowLeftIcon />
            </Icon>
          </Link>
          <Text fontSize={"sm"}>Back to Products</Text>
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
          <Info register={register} errors={errors} control={control} />
          <Separator variant="solid" size={"sm"} w={"95%"} my={4} mx={"auto"} />
          <Price register={register} errors={errors} watch={watch} />
          <Separator variant="solid" size={"sm"} w={"95%"} my={4} mx={"auto"} />
          <FileUpload.RootProvider value={fileUpload} w={"full"}>
            <ImageUploader
              files={files}
              image={image}
              clearImage={() => {
                setImage("");
              }}
            />
          </FileUpload.RootProvider>
        </GridItem>
        <Stack gap={4}>
          <Category register={register} errors={errors} />
          <Tags setTags={setTags} tags={tags} />
        </Stack>
      </SimpleGrid>

      {open ? (
        <DeleteModal
          closeModal={() => setOpen(false)}
          handleDelete={deleteMutate}
          loading={isDeletePending}
          name={product.name}
          open={open}
        />
      ) : null}
    </Stack>
  );
};

export default Display;
