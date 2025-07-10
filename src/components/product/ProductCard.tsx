
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import { useImageError } from "@/hooks/useImageError";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist(product.id);
  const { imageError, handleImageError } = useImageError();

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(product.name);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Calculate discount percentage
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  // Convert price display to rupees
  const priceInRupees = product.price * 83; // Using 1 USD = 83 INR conversion rate
  const discountedPriceInRupees = product.discountedPrice ? product.discountedPrice * 83 : null;

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
          src={imageError ? "/placeholder.svg" : (product.images[0] || "/placeholder.svg")}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-700 shadow-sm transition-colors hover:text-red-500"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isInWishlist}
        >
          <Heart className={cn("h-4 w-4", isInWishlist && "fill-red-500 text-red-500")} />
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
            aria-label={`Add ${product.name} to cart`}
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
          {discountedPriceInRupees ? (
            <>
              <span className="font-medium text-gray-900">₹{Math.round(discountedPriceInRupees).toLocaleString('en-IN')}</span>
              <span className="text-sm text-gray-500 line-through">₹{Math.round(priceInRupees).toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="font-medium text-gray-900">₹{Math.round(priceInRupees).toLocaleString('en-IN')}</span>
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
