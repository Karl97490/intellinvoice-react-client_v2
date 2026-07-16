import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "flowbite-react";

const ConfirmationModal = ({
  show,
  status,
  onClose,
  title,
  message,
  confirmText,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {message}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Please click on {confirmText} if you wish so, or cancel to back to
            the page.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="cursor-pointer"
          color="alternative"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          className="cursor-pointer"
          color={status === "delete" ? "red" : "default"}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner aria-label={`${status} loading spinner`} size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            <>{confirmText}</>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
