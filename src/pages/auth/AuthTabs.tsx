
import React from "react";

interface AuthTabsProps {
  isLogin: boolean;
  onTabSwitch: (toLogin: boolean) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ isLogin, onTabSwitch }) => (
  <div className="mb-6">
    <div className="flex border-b">
      <button
        className={`px-4 py-2 w-1/2 text-center ${
          isLogin ? "border-b-2 border-brand font-medium text-brand" : "text-gray-500"
        }`}
        onClick={() => onTabSwitch(true)}
        type="button"
      >
        Login
      </button>
      <button
        className={`px-4 py-2 w-1/2 text-center ${
          !isLogin ? "border-b-2 border-brand font-medium text-brand" : "text-gray-500"
        }`}
        onClick={() => onTabSwitch(false)}
        type="button"
      >
        Register
      </button>
    </div>
  </div>
);

export default AuthTabs;
