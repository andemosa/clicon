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

import { type newProductFormData, newProductSchema } from "@/schemas";
import { queryKeys } from "@/services/queryKeys";
import { useCreateProduct } from "@/services/product/product.hooks";
import type { Tag } from "@/types";

const Link = chakra(RouterLink);

const AdminNewProductsPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<newProductFormData>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      description: "",
      parent: "",
      name: "",
    },
  });
  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: "image/*",
  });
  const files = fileUpload.acceptedFiles;

  const { mutate, isPending } = useCreateProduct({
    onSuccess: () => {
      toaster.create({
        title: "Product created successfully",
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
  });

  const onSubmit = handleSubmit(
    (data) => {
      if (!files.length) {
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
        tagIds: tags.map((item) => item.id),
        ...(files.length && { image: files[0] }),
        ...(parsedData.discountType && {
          discountType: parsedData.discountType,
        }),

        ...(parsedData.discountValue !== undefined &&
          !Number.isNaN(parsedData.discountValue) && {
            discountValue: parsedData.discountValue,
          }),
      });
    },

    (errors) => {
      const entries = Object.entries(errors);

      if (!entries.length) return;

      const [field, error] = entries[0];

      // Human-readable label
      const labelMap: Record<string, string> = {
        name: "Product name",
        brand: "Brand",
        price: "Price",
        stock: "Stock",
        description: "Description",
        parent: "Category",
      };

      toaster.create({
        title: `${labelMap[field] ?? field}: ${error?.message}`,
        type: "error",
      });
    },
  );

  return (
    <Stack
      gap={4}
      color={"gray.900"}
      w={"full"}
      as={"form"}
      onSubmit={onSubmit}
    >
      <Flex
        gap={2}
        alignItems={"center"}
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
        <Flex>
          <Button
            disabled={isPending}
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
            {isPending ? <Spinner size="sm" /> : <>Save</>}
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
            <ImageUploader files={files} />
          </FileUpload.RootProvider>
        </GridItem>
        <Stack gap={4}>
          <Category register={register} errors={errors} />
          <Tags setTags={setTags} tags={tags} />
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default AdminNewProductsPage;
