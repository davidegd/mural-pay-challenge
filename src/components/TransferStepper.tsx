import React from "react";
import { Slider } from "@heroui/react";
import { TransferSteps } from "@/constants/common";

export const TransactionStepper = ({ currentStep }) => {
  const step =
    TransferSteps.find((step) => step.label === currentStep)?.value * 25;
  return (
    <div className="mb-4 w-full sm:w-1/2">
      <Slider value={step} aria-labelledby="transaction-steps" size="sm" />
      <div className="flex justify-between text-sm mt-2">
        {TransferSteps.map((step, index) => (
          <span
            key={index}
            className={`${
              step.label === currentStep
                ? "font-bold text-blue-600"
                : "text-gray-500"
            }`}
          >
            {step.text}
          </span>
        ))}
      </div>
    </div>
  );
};
