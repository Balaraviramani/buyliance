import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/product/ProductGrid";
import ReviewForm from "@/components/product/ReviewForm";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductMeta from "@/components/product/ProductMeta";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find((p) => p.id === id);
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

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumbs category={product.category} productName={product.name} />

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ProductImageGallery images={product.images} productName={product.name} />
          
          <div className="flex flex-col space-y-6">
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
            <ProductMeta />
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
