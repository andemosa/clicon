import { useState } from "react";
import {
  Button,
  SimpleGrid,
  Stack,
  Field,
  Input,
  Text,
  Separator,
  Skeleton,
  Spinner,
  createListCollection,
  Portal,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";

import { useUpdateAddress } from "@/services/profile/profile.hooks";
import { useCountriesQuery } from "@/services/open/open.hooks";
import { queryKeys } from "@/services/queryKeys";

import { updateAddressSchema } from "@/schemas";
import type { AddressType, UserProfileRes } from "@/types";

type FormValues = z.infer<typeof updateAddressSchema>;

const AddressSettings = ({
  addressData,
  userData,
  isFetching,
  type,
}: {
  userData: UserProfileRes;
  addressData: UserProfileRes["addresses"][0] | null;
  isFetching: boolean;
  type: AddressType;
}) => {
  const { data: countriesData, isFetching: isCountriesFetching } =
    useCountriesQuery();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const {
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    city,
    country,
    state,
    zipCode,
    companyName,
    countryCode,
  } = addressData || {};
  const {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    phone: userPhone,
  } = userData || {};

  const countries = createListCollection({
    items:
      countriesData?.map((s) => ({
        label: s.name,
        value: s.code,
      })) ?? [],
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      firstName: firstName ?? userFirstName ?? "",
      lastName: lastName ?? userLastName ?? "",
      email: email ?? userEmail ?? "",
      phone: phone ?? userPhone ?? "",
      companyName: companyName ?? "",
      addressLine1: addressLine1 ?? "",
      city: city ?? "",
      state: state ?? "",
      zipCode: zipCode ?? "",
      country: [countryCode],
    },
  });

  const { mutate, isPending } = useUpdateAddress(type, {
    onSuccess: () => {
      toaster.create({
        title: "Address updated successfully",
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

  const onSubmit = handleSubmit((formData) => {
    const selectedCountry =
      formData.country && countriesData
        ? countriesData.find((c) => c.code === formData.country[0])
        : null;

    mutate({
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      addressLine1: formData.addressLine1 ?? "",
      city: formData.city ?? "",
      state: formData.state ?? "",
      zipCode: formData.zipCode ?? "",
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: selectedCountry?.name ?? "",
      countryCode: selectedCountry?.code ?? "",
      type: type,
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
        {type} address
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4} as={"form"} onSubmit={onSubmit}>
        {!isEditing ? (
          <>
            {!addressData ? (
              <Stack
                align="center"
                justify="center"
                py={8}
                gap={6}
                textAlign={"center"}
              >
                <Text fontSize="md" color="gray.600">
                  You don’t have a {type} address yet.
                </Text>
                <Button
                  type="button"
                  size="md"
                  textTransform="uppercase"
                  bg="orange.500"
                  color="white"
                  fontWeight={700}
                  _hover={{ bg: "orange.500" }}
                  _active={{ bg: "orange.500" }}
                  onClick={() => setIsEditing(true)}
                >
                  Add {type} Address
                </Button>
              </Stack>
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>First Name</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {firstName ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Last Name</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {lastName ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Company Name</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {companyName ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>

                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Address</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {addressLine1 ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Country</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {country ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>

                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Region/State</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {state ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>City</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {city ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Zip Code</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {zipCode ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Email</Text>
                      <Text fontSize="md" fontStyle="italic">
                        {email ?? "--"}
                      </Text>
                    </Stack>
                  </Skeleton>
                  <Skeleton loading={isFetching}>
                    <Stack gap={0.5}>
                      <Text fontWeight={600}>Phone</Text>
                      <Text fontSize="md" fontStyle="italic">
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
                    Edit Address
                  </Button>
                </Skeleton>
              </>
            )}
          </>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <Field.Root invalid={!!errors.firstName}>
                <Field.Label>First name</Field.Label>
                <Input {...register("firstName")} />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.lastName}>
                <Field.Label>Last name</Field.Label>
                <Input {...register("lastName")} />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>

            <Field.Root invalid={!!errors.companyName}>
              <Field.Label>
                Company name&nbsp;
                <Text as={"span"} fontSize={"sm"} fontStyle={"italic"}>
                  (optional)
                </Text>
              </Field.Label>
              <Input {...register("companyName")} />
              <Field.ErrorText>{errors.companyName?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.addressLine1}>
              <Field.Label>Address</Field.Label>
              <Input {...register("addressLine1")} />
              <Field.ErrorText>{errors.addressLine1?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.country}>
              <Field.Label>Country</Field.Label>
              <Skeleton loading={isCountriesFetching} w={"full"}>
                {countriesData ? (
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                        collection={countries}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select country" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {countries.items.map((country) => (
                                <Select.Item item={country} key={country.value}>
                                  {country.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  />
                ) : (
                  <Input {...register("country")} w={"full"} />
                )}
              </Skeleton>
              <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.state}>
              <Field.Label>Region/State</Field.Label>
              <Input {...register("state")} />
              <Field.ErrorText>{errors.state?.message}</Field.ErrorText>
            </Field.Root>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <Field.Root invalid={!!errors.city}>
                <Field.Label>City</Field.Label>
                <Input {...register("city")} />
                <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.zipCode}>
                <Field.Label>Zip Code</Field.Label>
                <Input {...register("zipCode")} />
                <Field.ErrorText>{errors.zipCode?.message}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>

            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.phone}>
              <Field.Label>Phone number</Field.Label>
              <Input {...register("phone")} type="number" />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>

            <Stack
              direction={{ base: "row", sm: "column", lg: "row" }}
              gap={2}
              mt={2}
            >
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
    </Stack>
  );
};

export default AddressSettings;
