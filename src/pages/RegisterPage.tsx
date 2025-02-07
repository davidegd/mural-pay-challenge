import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerRegistration from "@/components/CustomerRegistration";

export function RegisterPage() {
  const navigate = useNavigate();

  const handleCustomerCreated = (customerId?: string) => {
    navigate(`/dashboard`);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Crea tu Cuenta
          </h1>
          <p className="text-white opacity-90 text-sm sm:text-base">
            Regístrate en Mural Pay y comienza a disfrutar de pagos rápidos y
            seguros.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <CustomerRegistration onCustomerCreated={handleCustomerCreated} />
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 text-center border-t border-gray-200">
          <p className="text-gray-600 text-sm sm:text-base">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
