
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmationPage = () => {
  const orderNumber = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-600">Order Number</p>
            <p className="text-xl font-bold">{orderNumber}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your email address. You can check the status of
            your order at any time in your account dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link to="/account/orders">
              <Button>View Order</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmationPage;
