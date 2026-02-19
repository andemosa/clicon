import { Box, Button, FileUpload, Float, Text } from "@chakra-ui/react";
import { X } from "lucide-react";

const Images = ({ files }: { files: File[] }) => {
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
            <Box p={8} textAlign="center" w={"full"}>
              <Button size="sm">Add File</Button>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Or drag and drop file
              </Text>
            </Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
      )}
    </Box>
  );
};

export default Images;
