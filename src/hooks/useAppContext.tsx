import React, { createContext, useContext } from "react";
import { useAppStore } from "./useAppStore";
import { AppState } from "@/types/appState";

import { Dispatch } from "react";
import { ActionType } from "@/store/actions/base-action";

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<ActionType>;
}

const AppContext = createContext<AppContextType | null>(null);

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
