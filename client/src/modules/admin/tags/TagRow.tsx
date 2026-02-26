import {
  Flex,
  IconButton,
  Text,
  Skeleton,
  useDisclosure,
  Badge,
  chakra,
} from "@chakra-ui/react";
import { Pencil, Trash, Eye } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

import TagModal from "./TagModal";
import { Tooltip } from "@/components/ui/tooltip";

import type { Tag } from "@/types";

const Link = chakra(RouterLink);

const TagRow = ({ tag, isFetching }: { tag: Tag; isFetching: boolean }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"new" | "edit" | "delete" | null>(
    null,
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const openModal = (type: "new" | "edit" | "delete", tag?: Tag | null) => {
    setModalType(type);
    setSelectedTag(tag || null);
    onOpen();
  };

  return (
    <Skeleton loading={isFetching}>
      <Flex
        align="center"
        justify="space-between"
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        p={3}
        bg="white"
      >
        <Flex align="center" gap={2}>
          <Text>{tag.name}</Text>
          <Badge
            colorScheme="orange"
            fontWeight={600}
            borderRadius="full"
            px="2"
          >
            {tag.productCount ?? 0}&nbsp;
            {tag.productCount === 1 ? "Product" : "Products"}
          </Badge>
        </Flex>
        <Flex gap={2}>
          <Tooltip content="View products">
            <Link
              to={`/admin/tags/${tag.name}/products`}
              _hover={{ textDecoration: "none" }}
            >
              <IconButton aria-label="View Products" variant="ghost" size="sm">
                <Eye size={16} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Edit Tag">
            <IconButton
              aria-label="Edit"
              variant="ghost"
              size="sm"
              onClick={() => openModal("edit", tag)}
            >
              <Pencil size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Tag">
            <IconButton
              aria-label="Delete"
              variant="ghost"
              size="sm"
              onClick={() => openModal("delete", tag)}
            >
              <Trash size={16} />
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>

      {modalType && selectedTag ? (
        <TagModal
          open={open}
          closeModal={onClose}
          type={modalType}
          tag={selectedTag}
        />
      ) : null}
    </Skeleton>
  );
};

export default TagRow;
