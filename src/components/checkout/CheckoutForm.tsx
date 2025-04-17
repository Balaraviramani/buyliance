
import React from "react";
import CustomerInformation from "./CustomerInformation";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckoutFormProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  handleCardNumberChange,
  handleExpiryDateChange,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <CustomerInformation />
      <ShippingAddress />
      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleCardNumberChange={handleCardNumberChange}
        handleExpiryDateChange={handleExpiryDateChange}
      />
    </div>
  );
};

export default CheckoutForm;
