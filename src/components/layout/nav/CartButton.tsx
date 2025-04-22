
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export const CartButton = () => {
  const { items } = useCart();
  const cartItemCount = items?.length || 0;

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="h-5 w-5 text-gray-700" />
      {cartItemCount > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {cartItemCount}
        </Badge>
      )}
    </Link>
  );
};
