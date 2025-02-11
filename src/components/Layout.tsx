import React from "react";
import { Link } from "react-router-dom";
import { CircleUser, LogOut, UserCog } from "lucide-react";

import Logo from "@/assets/images/logo.png";
import { DashboardNavbar } from "./DashboardNavbar";
import { useAppContext } from "@/hooks/useAppContext";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const customerId = localStorage.getItem("customerId");
  const showNavbar = true;
  const isDashboard = location.pathname.includes("/dashboard");
  const {
    state: { customerName },
  } = useAppContext();

  if (!showNavbar) {
    return <>{children}</>;
  }

  const UserButton = () => (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button variant="light" endContent={<CircleUser size={16} />}>
          {customerName}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 space-y-4 w-32">
          <Link
            to="/dashboard/profile"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <UserCog className="h-5 w-5" />
            <span className="ml-2">Profile</span>
          </Link>
          <Link
            onClick={() => localStorage.removeItem("customerId")}
            to="/"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Sign Out</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className=" top-0 left-0 right-0 fixed z-50">
        <nav className="bg-background shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  to={customerId ? `/dashboard/${customerId}` : "/"}
                  className="flex items-center text-gray-800 hover:text-blue-600"
                >
                  <img src={Logo} alt="Logo" className="h-8 w-8" />
                  <span className="ml-2 font-medium">Mural Pay</span>
                </Link>
              </div>
              {customerId && (
                <div className="flex items-center">{UserButton()}</div>
              )}
            </div>
          </div>
        </nav>

        {isDashboard && <DashboardNavbar />}
      </header>

      <main
        className={`flex-1 bg-gradient-to-r from-blue-50 to-purple-50  *:max-w-7xl *:mx-auto *:px-4 sm:*:px-6 lg:*:px-8 ${
          isDashboard && "pt-28"
        }`}
      >
        <div className="">{children}</div>
      </main>
    </div>
  );
}
