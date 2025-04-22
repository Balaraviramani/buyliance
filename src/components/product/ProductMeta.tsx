
import { Truck, RotateCcw, Shield } from "lucide-react";

const ProductMeta = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center text-sm text-gray-600">
        <Truck className="h-4 w-4 text-brand mr-2" />
        Free shipping over ₹4,000
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <RotateCcw className="h-4 w-4 text-brand mr-2" />
        30-day return policy
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Shield className="h-4 w-4 text-brand mr-2" />
        Secure checkout
      </div>
    </div>
  );
};

export default ProductMeta;
