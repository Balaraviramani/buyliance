
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Calculate discount percentage
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300",
        variant === "compact" ? "h-60" : "h-full",
        isHovered && "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-700 shadow-sm transition-colors hover:text-red-500"
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
        </button>

        {/* Quick action overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity",
          isHovered && "opacity-100"
        )}>
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="flex items-center gap-1 bg-white text-black hover:bg-brand hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        
        {/* Ratings */}
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
          </div>
          <span className="mx-1 text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{product.reviews} reviews</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-1">
          {product.discountedPrice ? (
            <>
              <span className="font-medium text-gray-900">${product.discountedPrice}</span>
              <span className="text-sm text-gray-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="font-medium text-gray-900">${product.price}</span>
          )}
        </div>

        {/* Stock status */}
        {product.stock <= 5 && (
          <p className="mt-1 text-xs text-red-600">
            {product.stock === 0 ? "Out of stock" : `Only ${product.stock} left`}
          </p>
        )}

        {/* Category */}
        {variant === "featured" && (
          <span className="mt-2 inline-flex items-center rounded-full bg-brand-light px-2 py-1 text-xs font-medium text-brand">
            {product.category}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
