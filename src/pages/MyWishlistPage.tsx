
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { WishlistItem, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const MyWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Try to get user's wishlist items directly from products table
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, price, discounted_price, images");

      if (productsError) {
        throw productsError;
      }

      // For demo purposes, show some products as wishlist items
      // In a real app, this would be filtered based on user's actual wishlist
      const mockWishlist = products?.slice(0, 3) || [];
      
      setWishlistItems(mockWishlist.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        discountedPrice: item.discounted_price,
        images: item.images
      })));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    toast.success("Removed from wishlist");
  };

  const moveToCart = async (item: WishlistItem) => {
    // Convert WishlistItem to Product before adding to cart
    const product: Product = {
      id: item.id,
      name: item.name,
      price: item.price,
      discountedPrice: item.discountedPrice,
      images: item.images,
      description: "",
      currency: "USD",
      category: "",
      tags: [],
      rating: 0,
      reviews: 0,
      stock: 0,
      featured: false,
      createdAt: "",
      updatedAt: ""
    };
    
    // Now add the product to cart
    addItem(product);
    await removeFromWishlist(item.id);
    toast.success("Added to cart");
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        <Separator className="mb-6" />

        {!user ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You need to be logged in to view your wishlist</p>
              <Link to="/auth">
                <Button>Log In</Button>
              </Link>
            </CardContent>
          </Card>
        ) : loading ? (
          <p>Loading wishlist...</p>
        ) : wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">Your wishlist is empty</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="flex flex-col">
                <div className="relative pt-[100%]">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-medium">
                      ${Number(item.discountedPrice || item.price).toFixed(2)}
                    </span>
                    {item.discountedPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => moveToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyWishlistPage;
