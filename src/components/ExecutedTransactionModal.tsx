import { Modal, ModalBody, ModalContent } from "@heroui/react";
import React from "react";
import { TransferExecuted } from "./TransferForm/TransferExecuted";

interface ExecutedTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutedTransactionModal: React.FC<
  ExecutedTransactionModalProps
> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody className="py-6">
          <TransferExecuted onContinue={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
