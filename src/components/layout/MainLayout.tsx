
import React from "react";
import Navbar from "./Navbar";
import CustomFooter from "./CustomFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">{children}</main>
      <CustomFooter />
    </div>
  );
};

export default MainLayout;
