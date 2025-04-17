
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isProcessing: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  tax,
  total,
  isProcessing,
}) => {
  return (
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
  );
};

export default OrderSummary;
