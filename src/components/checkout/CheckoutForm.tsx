
import React from "react";
import CustomerInformation from "./CustomerInformation";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";

interface CheckoutFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    saveInfo: boolean;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    agreeTerms: boolean;
  };
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  paymentMethod,
  setPaymentMethod,
  handleChange,
  handleCardNumberChange,
  handleExpiryDateChange,
  setFormData,
}) => {
  return (
    <div>
      <CustomerInformation formData={formData} handleChange={handleChange} />
      <ShippingAddress formData={formData} handleChange={handleChange} setFormData={setFormData} />
      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        formData={formData}
        handleCardNumberChange={handleCardNumberChange}
        handleExpiryDateChange={handleExpiryDateChange}
        handleChange={handleChange}
        setFormData={setFormData}
      />
    </div>
  );
};

export default CheckoutForm;
