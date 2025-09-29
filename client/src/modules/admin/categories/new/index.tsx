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
import { toaster } from "@/components/ui/toaster";

import { newCategorySchema, type newCategoryFormData } from "@/schemas";

import { useCreateCategory } from "@/services/category/category.hooks";
import { queryKeys } from "@/services/queryKeys";

const Link = chakra(RouterLink);

const AdminNewCategoriesPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<newCategoryFormData>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      active: true,
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
      ...(files.length && { image: files[0] }),
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
        <Flex alignSelf={"end"}>
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
          <FileUpload.RootProvider value={fileUpload} w={"full"}>
            <Images files={files} />
          </FileUpload.RootProvider>
        </GridItem>
        <Stack gap={4}>
          <Visibility control={control} errors={errors} />
          <Parent register={register} errors={errors} />
        </Stack>
      </SimpleGrid>
      <Button
        disabled={isPending}
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
        {isPending ? <Spinner size="sm" /> : <>Save</>}
      </Button>
    </Stack>
  );
};

export default AdminNewCategoriesPage;
