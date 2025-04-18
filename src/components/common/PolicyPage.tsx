
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

interface PolicyPageProps {
  title: string;
  children: React.ReactNode;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, children }) => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PolicyPage;
