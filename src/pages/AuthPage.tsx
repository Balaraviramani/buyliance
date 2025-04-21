
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AuthTabs from "./auth/AuthTabs";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Switch tabs and reset loading state for a clean switch
  const handleSwitchForm = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <AuthTabs isLogin={isLogin} onTabSwitch={handleSwitchForm} />
            {isLogin ? (
              <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              <RegisterForm
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onRegisterSuccess={() => handleSwitchForm(true)}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
