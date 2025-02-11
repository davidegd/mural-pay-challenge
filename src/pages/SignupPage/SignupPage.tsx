import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerRegistration from "@/components/CustomerRegistration";
import { useAppContext } from "@/hooks/useAppContext";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: { customerId },
  } = useAppContext();

  useEffect(() => {
    if (customerId) {
      navigate(`/dashboard`);
    }
  }, [customerId]);

  const handleCustomerCreated = () => {
    navigate(`/dashboard`);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-2xl bg-background rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sign Up
          </h1>
          <p className="text-white opacity-90 text-sm sm:text-base">
            Sign up for Mural Pay and start enjoying fast and secure payments.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <CustomerRegistration onCustomerCreated={handleCustomerCreated} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
