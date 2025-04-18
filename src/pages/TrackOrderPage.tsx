
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Search } from "lucide-react";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim() || !email.trim()) {
      toast.error("Please enter both order ID and email address");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      toast.error("Order not found. Please check your order ID and email address.");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>
                Enter your order ID and email address to track your order status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input 
                    id="orderId"
                    placeholder="Enter your order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSearching}>
                  {isSearching ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      Track Order
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-gray-500">
                If you need further assistance, please contact our customer support.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackOrderPage;
