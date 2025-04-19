
interface OrderPriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderPriceSummary = ({ subtotal, shipping, tax, total }: OrderPriceSummaryProps) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
