
import React from "react";

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => (
  <h1 className="text-2xl font-bold mb-6">
    {isLogin ? "Welcome Back" : "Create Account"}
  </h1>
);

export default AuthHeader;
