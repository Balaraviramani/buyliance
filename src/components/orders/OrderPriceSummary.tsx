
interface OrderPriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderPriceSummary = ({ subtotal, shipping, tax, total }: OrderPriceSummaryProps) => {
  // Format currency values consistently
  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };
  
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>${formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping:</span>
        <span>${formatCurrency(shipping)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax:</span>
        <span>${formatCurrency(tax)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total:</span>
        <span>${formatCurrency(total)}</span>
      </div>
    </div>
  );
};
