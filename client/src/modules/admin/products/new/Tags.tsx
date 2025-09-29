import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Text,
  Separator,
  Field,
  Input,
  IconButton,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { toaster } from "@/components/ui/toaster";
import { queryKeys } from "@/services/queryKeys";
import { useCreateTag, useTagsQuery } from "@/services/tag/tag.hooks";

const Tags = ({
  setTags,
  tags,
}: {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
}) => {
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (newTag.length > 1) {
        setDebouncedSearch(newTag);
        setShowSuggestions(true);
      } else {
        setDebouncedSearch("");
        setShowSuggestions(false);
      }
      setHighlightedIndex(-1);
    }, 300);

    return () => clearTimeout(handler);
  }, [newTag]);

  // Fetch tags if query string is valid
  const { data, isFetching, isError } = useTagsQuery(
    { search: debouncedSearch, limit: 5 },
    {
      enabled: debouncedSearch.length > 1,
      queryKey: [...queryKeys.getTags],
    }
  );

  // Scroll highlighted suggestion into view
  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionsRef.current[highlightedIndex]) {
      suggestionsRef.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const { mutate, isPending } = useCreateTag({
    onSuccess: (createdTag) => {
      toaster.create({
        title: "Tag created successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getTags,
      });
      setTags([...tags, createdTag.name]);
      setNewTag("");
      setShowSuggestions(false);
    },
    onError: (err) => {
      toaster.create({
        title: err.message,
        type: "error",
      });
    },
  });

  const handleSelectTag = (tagName: string) => {
    if (!tags.includes(tagName)) {
      setTags([...tags, tagName]);
    }
    setNewTag("");
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleAddTag = () => {
    if (!newTag) return;

    if (tags.includes(newTag)) {
      setNewTag("");
      setShowSuggestions(false);
      return;
    }

    const existingTag = data?.tags?.find(
      (tag: { name: string }) => tag.name.toLowerCase() === newTag.toLowerCase()
    );

    if (existingTag) {
      handleSelectTag(existingTag.name);
    } else {
      mutate({ name: newTag });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const suggestions = data?.tags || [];
    if (!showSuggestions || !suggestions.length) {
      if (e.key === "Enter") {
        e.stopPropagation();
        handleAddTag();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelectTag(suggestions[highlightedIndex].name);
      } else {
        handleAddTag();
      }
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setNewTag("");
    }
  };
  
  return (
    <Stack
      gap={0}
      border={"1px solid"}
      borderColor={"gray.100"}
      color={"gray.900"}
    >
      <Text py={2} px={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Tags
      </Text>
      <Separator variant="solid" size={"sm"} w={"full"} />
      <Stack h={"max-content"} p={4} gap={4}>
        <Stack direction={"row"}>
          <Field.Root required>
            <Input
              ref={inputRef}
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="subtle"
            />
          </Field.Root>
          <IconButton
            disabled={isPending}
            onClick={(e) => {
              e.stopPropagation();
              handleAddTag();
            }}
            variant={"subtle"}
            color="orange.700"
            type="button"
          >
            {isPending ? <Spinner /> : <Plus />}
          </IconButton>
        </Stack>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <Stack
            gap={1}
            border="1px solid"
            borderColor="gray.200"
            p={2}
            rounded="md"
            maxH="200px"
            overflowY="auto"
          >
            {isFetching ? (
              <Spinner />
            ) : isError ? (
              <Text color="red.500">Error loading tags</Text>
            ) : data?.tags?.length ? (
              data.tags.map(
                (tag: { id: string; name: string }, index: number) => (
                  <Tag.Root
                    key={tag.id}
                    // ref={(el) => (suggestionsRef.current[index] = el)}
                    ref={(el) => {
                      suggestionsRef.current[index] = el;
                    }}
                    cursor="pointer"
                    bg={highlightedIndex === index ? "gray.100" : "transparent"}
                    onClick={() => handleSelectTag(tag.name)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <Tag.Label>{tag.name}</Tag.Label>
                  </Tag.Root>
                )
              )
            ) : (
              <Text fontSize="sm" color="gray.500">
                No tags found
              </Text>
            )}
          </Stack>
        )}

        {/* Selected tags */}
        <Stack wrap="wrap" direction="row">
          {tags.map((tag) => (
            <Tag.Root key={tag}>
              <Tag.Label>{tag}</Tag.Label>
              <Tag.EndElement cursor={"pointer"}>
                <Tag.CloseTrigger onClick={() => handleRemoveTag(tag)} />
              </Tag.EndElement>
            </Tag.Root>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Tags;
