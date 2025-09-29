import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

const MAX_FILES = 5;

type FileWithPreview = {
  id: string;
  file: File;
  preview: string;
};

const SortableImage = ({
  id,
  src,
  onDelete,
}: {
  id: string;
  src: string;
  onDelete: (id: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative" as const,
  };

  return (
    <Flex gap={2}>
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        w="150px"
        h="150px"
        border="1px solid #ccc"
        borderRadius="md"
        overflow="hidden"
        role="group"
        position="relative"
        cursor="pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={src} alt="preview" w="100%" h="100%" objectFit="contain" />
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
          <Text
            color="white"
            fontSize="sm"
            fontWeight="medium"
            p={4}
            textAlign={"center"}
          >
            Drag to change position
          </Text>
        </Flex>
      </Box>
      <IconButton
        size="xs"
        aria-label="Delete"
        onClick={(e) => {
          onDelete(id);
          e.stopPropagation();
        }}
        bg="white"
        _hover={{ bg: "red.500" }}
      >
        <X />
      </IconButton>
    </Flex>
  );
};

export default function ImageUploader({
  files,
  setFiles,
}: {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newFiles: FileWithPreview[] = [];

      acceptedFiles.forEach((file) => {
        const exists = files.some(
          (f) => f.file.name === file.name && f.file.size === file.size
        );

        if (!exists) {
          newFiles.push({
            id: URL.createObjectURL(file),
            file,
            preview: URL.createObjectURL(file),
          });
        }
      });

      if (files.length + newFiles.length > 5) {
        alert("You can only upload up to 5 images.");
        return;
      }

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((f) => f.id === active.id);
        const newIndex = items.findIndex((f) => f.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <Box p={4} w={"full"}>
      <Text pb={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Image
      </Text>

      <VStack gap={4} align="stretch">
        <Box
          {...getRootProps()}
          p={6}
          border="2px dashed"
          borderColor="gray.300"
          textAlign="center"
          borderRadius="md"
          cursor="pointer"
        >
          <input {...getInputProps()} />
          <Button colorScheme="blue" mb={2}>
            Add Files
          </Button>
          <Box color="fg.muted">
            {MAX_FILES - files.length} more file
            {MAX_FILES - files.length !== 1 ? "s" : ""} allowed
          </Box>
        </Box>

        {/* Previews */}
        {files.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={files.map((f) => f.id)}
              strategy={rectSortingStrategy}
            >
              <HStack gap={3} wrap="wrap">
                {files.map((file) => (
                  <SortableImage
                    key={file.id}
                    id={file.id}
                    src={file.preview}
                    onDelete={handleDelete}
                  />
                ))}
              </HStack>
            </SortableContext>
          </DndContext>
        )}
      </VStack>
    </Box>
  );
}
