
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCheckout } from "@/hooks/useCheckout";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount } = useCart();
  const {
    formData,
    setFormData,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    shippingCost,
    tax,
    total,
    handleChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleSubmit,
  } = useCheckout();
  
  if (itemCount === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information, Shipping Address, Payment Method */}
            <CheckoutForm
              formData={formData}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handleChange={handleChange}
              handleCardNumberChange={handleCardNumberChange}
              handleExpiryDateChange={handleExpiryDateChange}
              setFormData={setFormData}
            />
            
            {/* Order Summary */}
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              total={total}
              isProcessing={isProcessing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
