import { Button } from "@heroui/react";
import { CheckCheck } from "lucide-react";
import React from "react";

interface TransferExecutedProps {
  onContinue: () => void;
}

export const TransferExecuted: React.FC<TransferExecutedProps> = ({
  onContinue,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 ">
      <div className="flex flex-col items-center text-xl text-success text-center">
        <CheckCheck size={72} />
        <h2 className="font-semibold">Transaction executed successfully</h2>
      </div>
      <p className="my-4 font-semibold text-foreground">
        The transaction status will be updated shortly
      </p>
      <Button
        size="lg"
        color="success"
        radius="md"
        onPress={onContinue}
        className="w-3/4 text-white "
        aria-label="Next"
      >
        Done
      </Button>
    </div>
  );
};
