import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/hooks/useAppContext";
import { useCustomer } from "@/hooks/useCustomer";

interface Props {
  onCustomerCreated: (customerId: string | null) => void;
}

const CreateCustomer = ({ onCustomerCreated }: Props) => {
  const { dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    organizationType: "BUSINESS",
  });

  const { createNewCustomer, loading } = useCustomer(dispatch);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewCustomer(formData);
    onCustomerCreated(localStorage.getItem("customerId"));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-none">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 mb-8">
            <Input
              label="Name"
              type="text"
              placeholder="Test Business LLC"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              disabled
              type="text"
              placeholder="Organization Type"
              value={"BUSINESS"}
              label="Organization Type"
              className="opacity-50"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            color="primary"
            className="w-full  *:disabled:bg-gray-500 *:disabled:text-gray-300 *:disabled:cursor-not-allowed *:disabled:hover:bg-gray-500"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default CreateCustomer;
