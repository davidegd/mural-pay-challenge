import React from "react";
import { AppRoutes } from "@/constants/routes";
import { Wallet, Landmark, SwitchCamera } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export const DashboardNavbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      name: "Overview",
      path: AppRoutes.dashboard,
      icon: Wallet,
    },
    {
      name: "Accounts",
      path: `${AppRoutes.dashboard}${AppRoutes.accounts}`,
      icon: Landmark,
    },
    {
      name: "Transactions",
      path: `${AppRoutes.dashboard}${AppRoutes.transactions}`,
      icon: SwitchCamera,
    },
  ];
  return (
    <div className={`bg-background shadow`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center py-4 px-1 border-b-2 text-sm font-medium ${
                  isActive(item.path)
                    ? "border-secondary text-secondary"
                    : "border-transparent text-foreground-600 hover:text-secondary "
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
