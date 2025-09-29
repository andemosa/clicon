import { useState } from "react";
import {
  Button,
  GridItem,
  SimpleGrid,
  FileUpload,
  Stack,
  useFileUpload,
  Field,
  Input,
  Image,
  Text,
  Separator,
  Skeleton,
  Spinner,
  Float,
  Flex,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";

import { useUpdateProfile } from "@/services/profile/profile.hooks";
import { queryKeys } from "@/services/queryKeys";

import { updateProfileSchema } from "@/schemas";
import type { UserProfileRes } from "@/types";

type FormValues = z.infer<typeof updateProfileSchema>;

const AccountSettings = ({
  data,
  isFetching,
}: {
  data: UserProfileRes;
  isFetching: boolean;
}) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { firstName, lastName, email, phone, avatar } = data || {};
  const fileUpload = useFileUpload({
    maxFiles: 1,
  });
  const files = fileUpload.acceptedFiles;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email,
      phone: phone ?? "",
    },
  });

  const { mutate, isPending } = useUpdateProfile({
    onSuccess: () => {
      toaster.create({
        title: "Profile updated successfully",
        type: "success",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: queryKeys.getProfile,
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
      avatar: files.length ? files[0] : null,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });
  });

  return (
    <Stack
      border={"1px solid"}
      gap={0}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Account Settings
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <SimpleGrid
        columns={{ base: 1, lg: 4 }}
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
          <Skeleton loading={isFetching} rounded="full">
            {!isEditing ? (
              <Image
                src={avatar}
                boxSize={{ base: "150px", lg: "120px", xl: "150px" }}
                rounded="full"
                overflow="hidden"
                border="2px solid"
                borderColor="blue.500"
                fit="cover"
                alt={`${firstName ?? ""} ${lastName ?? ""}`}
              />
            ) : (
              <FileUpload.RootProvider value={fileUpload}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  {files.length ? (
                    <FileUpload.Item w="auto" file={files[0]}>
                      <FileUpload.ItemPreviewImage
                        boxSize={{ base: "150px", lg: "120px", xl: "150px" }}
                        rounded="full"
                        overflow="hidden"
                        border="2px solid"
                        borderColor="blue.500"
                      />
                      <Float placement="top-end">
                        <FileUpload.ItemDeleteTrigger
                          boxSize="4"
                          layerStyle="fill.solid"
                        >
                          <X />
                        </FileUpload.ItemDeleteTrigger>
                      </Float>
                    </FileUpload.Item>
                  ) : (
                    <Flex
                      role="group"
                      position="relative"
                      cursor="pointer"
                      boxSize={{ base: "150px", lg: "120px", xl: "150px" }}
                      rounded="full"
                      overflow="hidden"
                      border="2px solid"
                      borderColor="blue.500"
                      align="center"
                      justify="center"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <Image
                        src={avatar}
                        boxSize="full"
                        fit="cover"
                        alt={`${firstName ?? ""} ${lastName ?? ""}`}
                      />

                      <Flex
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.600"
                        opacity={hovered ? 1 : 0}
                        align="center"
                        justify="center"
                        transition="opacity 0.2s ease-in-out"
                        _groupHover={{ opacity: 1 }}
                      >
                        <Text color="white" fontSize="sm" fontWeight="medium">
                          Change Photo
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </FileUpload.Trigger>
              </FileUpload.RootProvider>
            )}
          </Skeleton>
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Stack gap={6} as={"form"} onSubmit={onSubmit}>
            {!isEditing ? (
              <>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>First Name</Text>
                      <Text
                        fontSize={"md"}
                        fontStyle={"italic"}
                      >
                        {firstName ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Last Name</Text>
                      <Text
                        fontSize={"md"}
                        fontStyle={"italic"}
                      >
                        {lastName ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Email</Text>
                      <Text
                        fontSize={"md"}
                        fontStyle={"italic"}
                      >
                        {email}
                      </Text>
                    </Stack>
                  </Skeleton>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Phone</Text>
                      <Text
                        fontSize={"md"}
                        fontStyle={"italic"}
                      >
                        {phone ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>
                <Skeleton loading={isFetching}>
                  <Button
                    type="button"
                    size="md"
                    w="max-content"
                    textTransform="uppercase"
                    bg="orange.500"
                    color="white"
                    fontWeight={700}
                    _hover={{ bg: "orange.500" }}
                    _active={{ bg: "orange.500" }}
                    mt={2}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </Skeleton>
              </>
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Field.Root invalid={!!errors.firstName}>
                    <Field.Label>First name</Field.Label>
                    <Input {...register("firstName")} />
                    <Field.ErrorText>
                      {errors.firstName?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.lastName}>
                    <Field.Label>Last name</Field.Label>
                    <Input {...register("lastName")} />
                    <Field.ErrorText>
                      {errors.lastName?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email")} disabled />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>Phone</Field.Label>
                    <Input {...register("phone")} type="number" />
                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                  </Field.Root>
                </SimpleGrid>
                <Stack direction="row" gap={2} mt={2}>
                  <Button
                    disabled={isPending}
                    size="md"
                    type="submit"
                    textTransform="uppercase"
                    bg="orange.500"
                    color="white"
                    fontWeight={700}
                    _hover={{ bg: "orange.500" }}
                    _active={{ bg: "orange.500" }}
                  >
                    {isPending ? <Spinner size="sm" /> : <>Save Changes</>}
                  </Button>
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    textTransform="uppercase"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};

export default AccountSettings;
