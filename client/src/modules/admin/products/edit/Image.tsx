import { useState } from "react";
import {
  Box,
  FileUpload,
  Float,
  Text,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import { X } from "lucide-react";

import { Tooltip } from "@/components/ui/tooltip";

const Images = ({ files, image, clearImage }: { files: File[]; image: string, clearImage: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box p={4} w={"full"}>
      <Text pb={4} textTransform={"uppercase"} fontWeight={"medium"}>
        Image
      </Text>
      <FileUpload.HiddenInput />
      {files.length ? (
        <FileUpload.Item w="auto" mx={"auto"} file={files[0]}>
          <FileUpload.ItemPreviewImage overflow="hidden" />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <X />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ) : (
        <FileUpload.Dropzone w={"full"}>
          <FileUpload.DropzoneContent w={"full"}>
            {image ? (
              <Flex
                role="group"
                position="relative"
                cursor="pointer"
                overflow="hidden"
                align="center"
                justify="center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Image src={image} boxSize="full" fit="cover" alt={``} />

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
                  <Flex
                    justifyContent={"end"}
                    position={"absolute"}
                    w={"full"}
                    top={0}
                    left={0}
                    right={0}
                    p={4}
                  >
                    <Tooltip content="Remove image">
                      <X color="white" onClick={clearImage} />
                    </Tooltip>
                  </Flex>
                  <Text color="white" fontSize="sm" fontWeight="medium">
                    Change Image
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Box p={8} textAlign="center" w={"full"}>
                <Button size="sm">Add File</Button>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Or drag and drop file
                </Text>
              </Box>
            )}
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
      )}
    </Box>
  );
};

export default Images;
