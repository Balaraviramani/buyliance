import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    saveInfo: false,
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    agreeTerms: false
  });

  // Shipping cost (free if subtotal > ₹4,000)
  const shippingCost = subtotal > 4000 ? 0 : 199;
  
  // Tax (assuming 18% GST for India)
  const tax = subtotal * 0.18;
  
  // Total cost
  const total = subtotal + shippingCost + tax;

  // Simulate loading of checkout data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length > 0 ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    setFormData({
      ...formData,
      expiryDate: value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return false;
    }

    if (paymentMethod === "creditCard") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvc) {
        toast({
          title: "Error",
          description: "Please fill in all payment details",
          variant: "destructive"
        });
        return false;
      }

      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast({
          title: "Error",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      
      const orderId = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("lastOrderId", orderId);
      localStorage.setItem("orderDetails", JSON.stringify({
        id: orderId,
        items: items,
        total: total,
        date: new Date().toISOString(),
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}, ${formData.country}`,
        status: "pending"
      }));
      
      navigate("/order-confirmation");
    }, 1500);
  };

  return {
    formData,
    setFormData,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    isLoading,
    shippingCost,
    tax,
    total,
    handleChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleSubmit,
  };
};
