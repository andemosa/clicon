import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Text,
  Spinner,
} from "@chakra-ui/react";

const DeleteModal = ({
  closeModal,
  handleDelete,
  name,
  open,
  loading,
}: {
  loading: boolean;
  open: boolean;
  closeModal: () => void;
  name: string;
  handleDelete: () => void;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={closeModal}>
      <Portal>
        <Dialog.Backdrop zIndex={1500} />
        <Dialog.Positioner zIndex={1501}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to remove&nbsp;
                <Text as="span" fontWeight="bold">
                  {name}
                </Text>
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                bg="red.500"
                color="white"
                fontWeight={700}
                _hover={{ bg: "red.500" }}
                _active={{ bg: "red.500" }}
                onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : <>Delete</>}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteModal;
