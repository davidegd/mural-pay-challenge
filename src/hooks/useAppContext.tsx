import React, { createContext, useContext } from "react";
import { useAppStore } from "./useAppStore";

const AppContext = createContext(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const customerId = localStorage.getItem("customerId");
  const value = useAppStore(customerId);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
};
