
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Trash2, ChevronLeft, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  // Shipping cost (free if subtotal > ₹4,000)
  const shippingCost = subtotal > 4000 ? 0 : 199;
  
  // Tax (assuming 18% GST for India)
  const tax = subtotal * 0.18;
  
  // Total cost
  const total = subtotal + shippingCost + tax;
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Coupon logic would go here
    alert(`Coupon '${couponCode}' applied!`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {itemCount === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="hidden lg:flex border-b pb-4 mb-4 text-sm font-medium text-gray-500">
                  <div className="w-2/5">Product</div>
                  <div className="w-1/5 text-center">Price</div>
                  <div className="w-1/5 text-center">Quantity</div>
                  <div className="w-1/5 text-center">Total</div>
                </div>

                {items.map((item) => {
                  const price = item.product.discountedPrice || item.product.price;
                  const totalPrice = price * item.quantity;
                  
                  return (
                    <div key={item.product.id} className="py-6 border-b flex flex-col lg:flex-row lg:items-center">
                      {/* Product Info */}
                      <div className="flex lg:w-2/5 mb-4 lg:mb-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800 lg:hidden"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="lg:w-1/5 lg:text-center mb-2 lg:mb-0">
                        <div className="lg:hidden text-sm text-gray-500">Price:</div>
                        <div className="text-gray-900">₹{Math.round(price * 83).toLocaleString('en-IN')}</div>
                      </div>

                      {/* Quantity */}
                      <div className="lg:w-1/5 lg:text-center flex justify-start lg:justify-center mb-2 lg:mb-0">
                        <div className="lg:hidden text-sm text-gray-500 mr-2">Quantity:</div>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-gray-600"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-0.5">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-gray-600"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="lg:w-1/5 lg:text-center">
                        <div className="lg:hidden text-sm text-gray-500">Total:</div>
                        <div className="text-brand font-medium">₹{Math.round(totalPrice * 83).toLocaleString('en-IN')}</div>
                      </div>

                      {/* Remove button (desktop) */}
                      <div className="hidden lg:block">
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between items-center mt-6">
                  <Link to="/shop" className="inline-flex items-center text-brand hover:text-brand-dark">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{Math.round(subtotal * 83).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">₹{shippingCost.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{Math.round(tax * 83).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <form onSubmit={handleApplyCoupon} className="pt-4 pb-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1"
                      />
                      <Button type="submit" variant="outline" disabled={!couponCode}>
                        Apply
                      </Button>
                    </div>
                  </form>
                  
                  <Separator />
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-brand">₹{Math.round(total * 83).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full mt-6">Proceed to Checkout</Button>
                </Link>
                
                <div className="mt-6 text-sm text-gray-600">
                  <p>We accept:</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Importing a shopping cart icon for the empty cart state
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export default CartPage;
