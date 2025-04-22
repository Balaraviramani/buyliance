
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductInfoProps {
  product: {
    name: string;
    rating: number;
    reviews: number;
    stock: number;
    description: string;
    category: string;
    tags: string[];
    price: number;
    discountedPrice?: number;
  };
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductInfo = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart 
}: ProductInfoProps) => {
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  const priceInRupees = product.price * 83;
  const discountedPriceInRupees = product.discountedPrice ? product.discountedPrice * 83 : null;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        
        <div className="mt-2 flex items-center space-x-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        {discountedPriceInRupees ? (
          <>
            <span className="text-3xl font-bold text-gray-900">₹{Math.round(discountedPriceInRupees).toLocaleString('en-IN')}</span>
            <span className="ml-2 text-lg text-gray-500 line-through">₹{Math.round(priceInRupees).toLocaleString('en-IN')}</span>
            <span className="ml-2 rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
              {discountPercentage}% OFF
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">₹{Math.round(priceInRupees).toLocaleString('en-IN')}</span>
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900 w-24">Category:</span>
          <span className="text-sm text-gray-600">{product.category}</span>
        </div>
        
        {product.tags.length > 0 && (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 w-24">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-2"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Heart className="h-5 w-5" />
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
