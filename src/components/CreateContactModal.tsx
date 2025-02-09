import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { CreateContactForm } from "./TransferForm/RecipientInfoForm";

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContactModal = ({
  isOpen,
  onClose,
}: CreateContactModalProps) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Create Contact</ModalHeader>
        <ModalBody>
          <CreateContactForm />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
