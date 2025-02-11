import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CircleUser, LogOut, Moon, Sun, UserCog } from "lucide-react";

import Logo from "@/assets/images/logo.png";
import { DashboardNavbar } from "./DashboardNavbar";
import { useAppContext } from "@/hooks/useAppContext";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const customerId = localStorage.getItem("customerId");
  const showNavbar = true;
  const isDashboard = location.pathname.includes("/dashboard");
  const [theme, setTheme] = useState(
    window?.matchMedia("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light"
  );

  const {
    state: { customerName },
  } = useAppContext();

  if (!showNavbar) {
    return <>{children}</>;
  }

  if (!customerId) {
    return <Navigate to="/" replace />;
  }

  const UserButton = (theme) => (
    <Popover placement="bottom" showArrow={true} className={`${theme}`}>
      <PopoverTrigger className="text-foreground">
        <Button variant="light" endContent={<CircleUser size={16} />}>
          <span>{customerName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" px-1 py-2 space-y-4 w-32 text-foreground">
          <Link
            to="/dashboard/profile"
            className="flex items-center hover:text-blue-600"
          >
            <UserCog className="h-5 w-5" />
            <span className="ml-2">Profile</span>
          </Link>
          <Link
            onClick={() => localStorage.removeItem("customerId")}
            to="/"
            className="flex items-center text-foreground hover:text-blue-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Sign Out</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className={`${theme} min-h-screen flex flex-col`}>
      <header className=" top-0 left-0 right-0 fixed z-50">
        <nav className="bg-background shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16  items-center">
              <div className="flex text-foreground">
                <Link
                  to={customerId ? `/dashboard/${customerId}` : "/"}
                  className="flex items-center text-foreground  hover:text-blue-600"
                >
                  <img src={Logo} alt="Logo" className="h-8 w-8" />
                  <span className="ml-2 font-medium text-foreground">
                    Mural Pay
                  </span>
                </Link>
              </div>
              <div className="flex space-x-3 text-foreground items-center">
                {customerId && (
                  <div className="flex items-center ">{UserButton(theme)}</div>
                )}
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  endContent={
                    theme === "light" ? <Moon size={16} /> : <Sun size={16} />
                  }
                  onPress={() => setTheme(theme === "light" ? "dark" : "light")}
                />
              </div>
            </div>
          </div>
        </nav>

        {isDashboard && <DashboardNavbar />}
      </header>

      <main
        className={`${theme} flex-1 bg-background  *:max-w-7xl *:mx-auto *:px-4 sm:*:px-6 lg:*:px-8 ${
          isDashboard && "pt-28"
        }`}
      >
        <div className="">{children}</div>
      </main>
    </div>
  );
}
