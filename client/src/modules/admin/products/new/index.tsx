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
import SeoSettings from "./SeoSettings";
import ImageUploader from "./Image";
import { toaster } from "@/components/ui/toaster";

import { type newProductFormData, newProductSchema } from "@/schemas";
import { useCreateCategory } from "@/services/category/category.hooks";
import { queryKeys } from "@/services/queryKeys";

const Link = chakra(RouterLink);

type FileWithPreview = {
  id: string;
  file: File;
  preview: string;
};

const AdminNewProductsPage = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newProductFormData>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      active: true,
      description: "",
      parent: "",
      name: "",
    },
  });

  const { mutate, isPending } = useCreateCategory({
    onSuccess: () => {
      toaster.create({
        title: "Category created successfully",
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

  const onSubmit = handleSubmit((data) => {
    mutate({
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
          <Info register={register} errors={errors} />
          <Separator variant="solid" size={"sm"} w={"95%"} my={4} mx={"auto"} />
          <Price register={register} errors={errors} watch={watch} />
          <Separator variant="solid" size={"sm"} w={"95%"} my={4} mx={"auto"} />
          <ImageUploader files={files} setFiles={setFiles} />
        </GridItem>
        <Stack gap={4}>
          <Category register={register} errors={errors} />
          <Tags setTags={setTags} tags={tags} />
          <SeoSettings />
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default AdminNewProductsPage;
