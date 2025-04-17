
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OrderDetails {
  id: string;
  items: {
    product: {
      id: string;
      name: string;
      images: string[];
      price: number;
      discountedPrice?: number;
    };
    quantity: number;
  }[];
  total: number;
  date: string;
  shippingAddress: string;
  status: string;
}

const OrderConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  useEffect(() => {
    // Get the order ID from localStorage
    const orderId = localStorage.getItem("lastOrderId");
    const orderDetailsJson = localStorage.getItem("orderDetails");
    
    if (orderDetailsJson) {
      try {
        const parsedOrderDetails = JSON.parse(orderDetailsJson);
        setOrderDetails(parsedOrderDetails);
      } catch (error) {
        console.error("Error parsing order details:", error);
      }
    }
  }, []);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-center">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-6 text-center">
            Thank you for your purchase. Your order has been received.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Order Number</p>
                <p className="text-lg font-bold">{orderDetails?.id || "Unknown"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Date</p>
                <p className="font-medium">
                  {orderDetails?.date ? new Date(orderDetails.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Processing
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Total</p>
                <p className="font-medium">
                  ₹{orderDetails ? Math.round(orderDetails.total).toLocaleString('en-IN') : "0"}
                </p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4 mt-4">
              <h3 className="font-semibold text-lg">Order Details</h3>
              
              <div className="space-y-3">
                {orderDetails?.items?.map((item) => {
                  const price = item.product.discountedPrice || item.product.price;
                  // Convert to INR
                  const priceInr = price * 83;
                  
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
                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{Math.round(priceInr * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
              <p className="text-gray-600">
                {orderDetails?.shippingAddress || "Address information not available"}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8 text-center">
            A confirmation email has been sent to your email address. You can check the status of
            your order at any time in your account dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link to="/account/orders">
              <Button>Track Your Order</Button>
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md text-center">
            <p className="text-sm text-gray-600">
              Need help with your order? <Link to="/contact" className="text-brand hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmationPage;
