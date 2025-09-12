import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

// const images = [
//   "/images/macbook-1.png",
//   "/images/macbook-2.png",
//   "/images/macbook-3.png",
//   "/images/macbook-4.png",
//   "/images/macbook-5.png",
// ];

const QuickView = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body></Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
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

export default QuickView;
