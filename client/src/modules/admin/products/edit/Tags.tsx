import { useState } from "react";
import {
  Stack,
  Text,
  Separator,
  Input,
  IconButton,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";
import { useTagsQuery, useCreateTag } from "@/services/tag/tag.hooks";
import { queryKeys } from "@/services/queryKeys";
import type { Tag as ITag } from "@/types";

const Tags = ({
  tags,
  setTags,
}: {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  const { data, isFetching } = useTagsQuery(
    { search: value, limit: 5 },
    { enabled: value.length > 1, queryKey: [...queryKeys.getTags] },
  );

  const { mutate, isPending } = useCreateTag({
    onSuccess: (tag) => {
      toaster.create({
        title: "Tag created",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.getTags });
      setTags((prev) => [...prev, tag]);
      setValue("");
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  const handleSelect = ({ id, name }: { name: string; id: string }) => {
    const tagExists = tags.find((tag) => tag.name === name);
    if (!tagExists) {
      setTags((prev) => [...prev, { id, name }]);
    }
    setValue("");
  };

  const handleSubmit = () => {
    const input = value.trim();
    if (!input) return;

    const exactMatch = data?.tags?.find(
      (t: { name: string }) => t.name.toLowerCase() === input.toLowerCase(),
    );

    if (exactMatch) {
      handleSelect(exactMatch);
      return;
    }

    // Allow creating tag even if suggestions exist
    mutate({ name: input });
  };

  return (
    <Stack border="1px solid" borderColor="gray.100">
      <Text px={4} py={2} fontWeight="medium" textTransform="uppercase">
        Tags
      </Text>
      <Separator />

      <Stack p={4} gap={3}>
        <Stack direction="row">
          <Input
            placeholder="Type a tag and press enter"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <IconButton
            aria-label="Add tag"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <Spinner size="sm" /> : <Plus />}
          </IconButton>
        </Stack>

        {/* Suggestions */}
        {value.length > 1 ? (
          <Stack border="1px solid" borderColor="gray.200" rounded="md">
            {isFetching ? (
              <Spinner size="sm" />
            ) : (
              <>
                {data?.tags?.map((tag: { id: string; name: string }) => (
                  <Text
                    key={tag.id}
                    px={3}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={() => handleSelect(tag)}
                  >
                    {tag.name}
                  </Text>
                ))}

                {/* Create option (always visible if no exact match) */}
                {!data?.tags?.some(
                  (t: { name: string }) =>
                    t.name.toLowerCase() === value.toLowerCase(),
                ) && (
                  <Text px={3} py={2} fontSize="sm" color="gray.500">
                    Press Enter to create “{value}”
                  </Text>
                )}
              </>
            )}
          </Stack>
        ) : null}

        {/* Selected tags */}
        <Stack direction="row" wrap="wrap">
          {tags.map((tag) => (
            <Tag.Root key={tag.id}>
              <Tag.Label>{tag.name}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger
                  cursor="pointer"
                  onClick={() =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                  }
                />
              </Tag.EndElement>
            </Tag.Root>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Tags;
