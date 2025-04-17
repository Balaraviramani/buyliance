import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
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
  
  if (itemCount === 0) {
    navigate("/cart");
    return null;
  }
  
  // Shipping cost (free if subtotal > ₹4,000)
  const shippingCost = subtotal > 4000 ? 0 : 199;
  
  // Tax (assuming 18% GST for India)
  const tax = subtotal * 0.18;
  
  // Total cost
  const total = subtotal + shippingCost + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

      // Simple card validation
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
    
    // Process the order
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      
      // Generate a random order ID and store it in localStorage
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Customer Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                
                <div className="mb-4">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="zipCode">PIN Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, saveInfo: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-sm text-gray-600 ml-2"
                  >
                    Save this information for next time
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border rounded-md p-3">
                    <RadioGroupItem value="creditCard" id="creditCard" />
                    <Label htmlFor="creditCard" className="flex-1 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 bg-blue-500 rounded text-white flex items-center justify-center text-xs">VISA</div>
                      <div className="w-8 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs">MC</div>
                      <div className="w-8 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs">AMEX</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-md p-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 flex items-center">
                      <span className="mr-2 text-green-600 font-bold">UPI</span>
                      UPI / Google Pay / PhonePe
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-md p-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1">
                      Cash on Delivery (COD)
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "creditCard" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required={paymentMethod === "creditCard"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleExpiryDateChange}
                          maxLength={5}
                          required={paymentMethod === "creditCard"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC *</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleChange}
                          maxLength={4}
                          required={paymentMethod === "creditCard"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 mb-2">
                      You will be prompted to complete the payment using your preferred UPI app after placing the order.
                    </p>
                    <div className="flex space-x-4 mt-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pay_logo.svg/512px-Google_Pay_logo.svg.png" alt="Google Pay" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      Pay in cash when your order is delivered. Please have the exact amount ready.
                    </p>
                    <p className="text-sm text-red-600 mt-2">
                      Note: Cash on Delivery is available only for orders below ₹10,000.
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <Checkbox 
                      id="agreeTerms" 
                      name="agreeTerms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeTerms: checked as boolean })
                      }
                      required
                    />
                    <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-brand hover:underline">Terms and Conditions</a> and <a href="#" className="text-brand hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {items.map((item) => {
                    const price = item.product.discountedPrice || item.product.price;
                    // Convert to INR
                    const priceInr = price * 83;
                    const totalPrice = priceInr * item.quantity;
                    
                    return (
                      <div key={item.product.id} className="flex items-center py-3 border-b">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium">₹{Math.round(totalPrice).toLocaleString('en-IN')}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">₹{Math.round(shippingCost).toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{Math.round(tax).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-brand">₹{Math.round(total).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Pay ₹${Math.round(total).toLocaleString('en-IN')}`}
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
