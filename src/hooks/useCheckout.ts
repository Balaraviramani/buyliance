
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(6, { message: "Please enter a valid PIN code" }),
  country: z.string(),
  saveInfo: z.boolean().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const useCheckout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
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
    },
    mode: "onChange"
  });
  
  // For consistency with the rest of the application, use directly rupees values
  // instead of converting from USD
  const rupeeSubtotal = subtotal * 83;
  
  // Shipping cost (free if subtotal > ₹4,000)
  const shippingCost = rupeeSubtotal > 4000 ? 0 : 199;
  
  // Tax (assuming 18% GST for India)
  const tax = rupeeSubtotal * 0.18;
  
  // Total cost
  const total = rupeeSubtotal + shippingCost + tax;

  // Simulate loading of checkout data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Load saved address if available
  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem("savedAddress");
      if (savedAddress) {
        const address = JSON.parse(savedAddress);
        form.setValue("firstName", address.firstName || "");
        form.setValue("lastName", address.lastName || "");
        form.setValue("address", address.address || "");
        form.setValue("city", address.city || "");
        form.setValue("state", address.state || "");
        form.setValue("zipCode", address.zipCode || "");
        form.setValue("country", address.country || "India");
      }
    } catch (error) {
      console.error("Error loading saved address:", error);
    }
  }, [form]);

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
    form.setValue("cardNumber", formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    form.setValue("expiryDate", value);
  };

  const onSubmit = (data: CheckoutFormValues) => {
    // Extra validation for credit card if needed
    if (paymentMethod === "creditCard") {
      if (!data.cardNumber || data.cardNumber.replace(/\s/g, "").length !== 16) {
        form.setError("cardNumber", { 
          type: "manual", 
          message: "Please enter a valid 16-digit card number" 
        });
        return;
      }
      
      if (!data.expiryDate || data.expiryDate.length !== 5) {
        form.setError("expiryDate", { 
          type: "manual", 
          message: "Please enter a valid expiry date (MM/YY)" 
        });
        return;
      }
      
      if (!data.cvc || data.cvc.length < 3) {
        form.setError("cvc", { 
          type: "manual", 
          message: "Please enter a valid CVC" 
        });
        return;
      }
    }
    
    setIsProcessing(true);

    // Show toast when processing starts
    toast({
      title: "Processing order",
      description: "Please wait while we process your order...",
    });

    // Save address if requested
    if (data.saveInfo) {
      try {
        localStorage.setItem("savedAddress", JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        }));
      } catch (error) {
        console.error("Error saving address:", error);
      }
    }

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
        shippingAddress: `${data.address}, ${data.city}, ${data.state} - ${data.zipCode}, ${data.country}`,
        status: "pending"
      }));
      
      // Show success toast before navigation
      toast({
        title: "Order successfully placed",
        description: `Your order #${orderId} has been confirmed`,
        variant: "default",
      });
      
      navigate("/order-confirmation");
    }, 1500);
  };

  return {
    form,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    isLoading,
    shippingCost,
    tax,
    total,
    handleCardNumberChange,
    handleExpiryDateChange,
    onSubmit
  };
};
