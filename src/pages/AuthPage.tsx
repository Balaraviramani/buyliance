
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AuthContainer from "./auth/AuthContainer";

const AuthPage = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-8">
      <AuthContainer />
    </div>
  </MainLayout>
);

export default AuthPage;
