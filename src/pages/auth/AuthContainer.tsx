
import React from "react";
import { FormProvider } from "react-hook-form";
import AuthHeader from "./AuthHeader";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthForms } from "./useAuthForms";

const AuthContainer = () => {
  const {
    isLogin,
    isLoading,
    setIsLoading,
    handleSwitchForm,
    loginForm,
    registerForm,
    onSubmitLogin,
    onSubmitRegister,
  } = useAuthForms();

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <AuthHeader isLogin={isLogin} />
        <AuthTabs isLogin={isLogin} onTabSwitch={handleSwitchForm} />
        {isLogin ? (
          <FormProvider {...loginForm}>
            <LoginForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              // Optionally, you can pass onSubmit handler in Form component if needed
              // onSubmit={onSubmitLogin}
            />
          </FormProvider>
        ) : (
          <FormProvider {...registerForm}>
            <RegisterForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onRegisterSuccess={() => handleSwitchForm(true)}
              // Optionally, you can pass onSubmit handler in Form component if needed
              // onSubmit={onSubmitRegister}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
