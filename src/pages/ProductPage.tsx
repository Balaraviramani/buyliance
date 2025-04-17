
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart, Truck, RotateCcw, Shield, Star, Minus, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/product/ProductGrid";
import ReviewForm from "@/components/product/ReviewForm";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Find the product with the matching id
  const product = products.find((p) => p.id === id);
  
  // Find related products (same category)
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <Button className="mt-6">Continue Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Calculate discount percentage if discounted price exists
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  // Convert price display to rupees
  const priceInRupees = product.price * 83; // Using 1 USD = 83 INR conversion rate
  const discountedPriceInRupees = product.discountedPrice ? product.discountedPrice * 83 : null;

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // In a real app, you would refresh reviews from the server
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to={`/categories/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
                {product.category}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-brand font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[activeImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {/* Image thumbnails */}
            <div className="flex space-x-4 overflow-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square w-20 flex-shrink-0 rounded-md overflow-hidden ${
                    activeImageIndex === index ? 'ring-2 ring-brand' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
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

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium text-gray-900 w-24">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-1 text-center w-12">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} items available
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart}
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
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

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
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description" className="text-base">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-base">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p className="mt-4">
                  Our products are crafted with the highest quality materials, ensuring durability and performance.
                  Each item undergoes rigorous testing to meet our exacting standards.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Brand</span>
                      <span className="text-gray-600">Buyliance</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Model</span>
                      <span className="text-gray-600">BL-{product.id}</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Material</span>
                      <span className="text-gray-600">Premium</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Weight</span>
                      <span className="text-gray-600">0.5 kg</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Dimensions</span>
                      <span className="text-gray-600">25 x 15 x 5 cm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                  <div className="space-y-2">
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Delivery Time</span>
                      <span className="text-gray-600">2-5 business days</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Shipping Fee</span>
                      <span className="text-gray-600">Free over ₹4,000</span>
                    </div>
                    <div className="flex border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-900 w-40">Return Policy</span>
                      <span className="text-gray-600">30-day returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-5 w-5 ${
                              index < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium">{product.rating} out of 5</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Based on {product.reviews} reviews</p>
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                      >
                        {showReviewForm ? "Cancel" : "Write a Review"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    {showReviewForm ? (
                      <div className="border-b border-gray-100 pb-6 mb-6">
                        <h4 className="font-medium mb-4">Write Your Review</h4>
                        <ReviewForm 
                          productId={product.id} 
                          onSuccess={handleReviewSubmitted}
                        />
                      </div>
                    ) : null}
                  
                    <div className="space-y-6">
                      {/* Sample review */}
                      <div className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">JD</span>
                            </div>
                            <div className="ml-4">
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-gray-500">Verified Purchase</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">2 weeks ago</p>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <h4 className="font-medium mb-2">Excellent product, worth every penny!</h4>
                        <p className="text-gray-600">
                          I am extremely satisfied with this purchase. The quality is outstanding, and it works even better than expected. Would definitely recommend to anyone looking for a product like this.
                        </p>
                      </div>
                      
                      {/* Sample review 2 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">JS</span>
                            </div>
                            <div className="ml-4">
                              <p className="font-medium">Jane Smith</p>
                              <p className="text-xs text-gray-500">Verified Purchase</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">1 month ago</p>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <h4 className="font-medium mb-2">Great value for money</h4>
                        <p className="text-gray-600">
                          The product arrived quickly and was well packaged. Quality is great for the price, though there are a few minor details that could be improved. Overall, I'm very happy with my purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductPage;
