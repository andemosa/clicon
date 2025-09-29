import {
  Flex,
  IconButton,
  Text,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

import TagModal from "./TagModal";

import type { Tag } from "@/types";

const TagRow = ({ tag, isFetching }: { tag: Tag; isFetching: boolean }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"new" | "edit" | "delete" | null>(
    null
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
        <Text>{tag.name}</Text>
        <Flex gap={2}>
          <IconButton
            aria-label="Edit"
            variant="ghost"
            size="sm"
            onClick={() => openModal("edit", tag)}
          >
            <Pencil size={16} />
          </IconButton>
          <IconButton
            aria-label="Delete"
            variant="ghost"
            size="sm"
            onClick={() => openModal("delete", tag)}
          >
            <Trash size={16} />
          </IconButton>
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
