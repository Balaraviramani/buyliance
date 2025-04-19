
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { WishlistItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";

const MyWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("wishlist")
        .eq("id", user?.id)
        .single();

      if (profileError) throw profileError;

      if (profileData?.wishlist && profileData.wishlist.length > 0) {
        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("id, name, price, discounted_price, images")
          .in("id", profileData.wishlist);

        if (productsError) throw productsError;
        setWishlistItems(products || []);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const { data: currentProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("wishlist")
        .eq("id", user?.id)
        .single();

      if (fetchError) throw fetchError;

      const updatedWishlist = currentProfile.wishlist.filter(
        (id: string) => id !== productId
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ wishlist: updatedWishlist })
        .eq("id", user?.id);

      if (updateError) throw updateError;

      setWishlistItems(wishlistItems.filter(item => item.id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const moveToCart = async (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      discountedPrice: item.discountedPrice,
      images: item.images,
      quantity: 1
    });
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

        {loading ? (
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
                      ${item.discountedPrice || item.price}
                    </span>
                    {item.discountedPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.price}
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
