import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { CreateAccount } from "@/types/api";
import { CheckCheckIcon } from "lucide-react";

interface CreateAccountModalProps {
  isOpen: boolean;
  onContinue: (accountInfo: CreateAccount) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string;
  successCreation?: boolean;
}

export const CreateAccountModal = ({
  isOpen,
  onContinue,
  onClose,
  loading,
  error,
  successCreation,
}: CreateAccountModalProps) => {
  const [accountInfo, setAccountInfo] = useState<CreateAccount>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (successCreation) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [successCreation]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Create Account</ModalHeader>
        <ModalBody className="mb-6">
          <p className="text-xl font-light space-y-3">Account information</p>

          <div className="flex flex-col space-y-4">
            {successCreation ? (
              <div className="flex flex-col space-y-3 justify-center items-center">
                <CheckCheckIcon className="h-12 w-12 text-green-500" />
                <p className="text-green-500 text-md font-medium mx-auto space-y-6">
                  Account created successfully
                </p>
              </div>
            ) : (
              <>
                <Input
                  label="Name"
                  type="text"
                  id="name"
                  placeholder="Corporation LLC"
                  value={accountInfo.name}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <Input
                  label="Description"
                  type="text"
                  id="description"
                  value={accountInfo.description}
                  placeholder="Short description of the account (optional)"
                  onChange={(e) =>
                    setAccountInfo({
                      ...accountInfo,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </>
            )}
            {error && (
              <p className="text-red-500 text-md font-medium mx-auto space-y-6">
                {error}
              </p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            color="secondary"
            onPress={() => onClose()}
            className="btn btn-secondary"
            size="lg"
            isDisabled={loading}
            radius="md"
          >
            Cancel
          </Button>
          <Button
            isLoading={loading}
            size="lg"
            color="primary"
            onPress={() => onContinue(accountInfo)}
            className="btn btn-primary"
            isDisabled={loading}
            radius="md"
          >
            {loading ? "Creating Account" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
