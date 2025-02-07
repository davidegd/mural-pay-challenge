import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransferPage } from "@/pages/TransferPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { AppRoutes } from "@/constants/routes";
import { AccountsPage } from "./pages/AccountsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path={AppRoutes.dashboard} element={<DashboardPage />} />
          <Route
            path={`${AppRoutes.dashboard}${AppRoutes.transfer}`}
            element={<TransferPage />}
          />
          <Route
            path={`${AppRoutes.dashboard}${AppRoutes.profile}`}
            element={<ProfilePage />}
          />
          <Route
            path={`${AppRoutes.dashboard}${AppRoutes.transactions}`}
            element={<TransactionsPage />}
          />
          <Route
            path={`${AppRoutes.dashboard}${AppRoutes.accounts}`}
            element={<AccountsPage />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
