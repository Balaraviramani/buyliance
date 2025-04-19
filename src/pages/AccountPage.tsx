import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the UserProfile interface for the component
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Define the WishlistItem interface or import it if available
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images: string[];
}

const AccountPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
      fetchWishlist(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data.");
      }

      if (data) {
        const { first_name, last_name, id } = data;
        const email = user?.email || "";

        setProfile({
          id: id,
          firstName: first_name || "",
          lastName: last_name || "",
          email: email,
        });

        setFormData({
          firstName: first_name || "",
          lastName: last_name || "",
          email: email,
        });
      }
    } catch (error) {
      console.error("Unexpected error fetching profile:", error);
      toast.error("Unexpected error loading profile data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("wishlist")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist.");
        return;
      }

      if (data && data.wishlist) {
        // Fetch product details for each item in the wishlist
        const productDetails = await Promise.all(
          data.wishlist.map(async (productId: string) => {
            const { data: productData, error: productError } = await supabase
              .from("products")
              .select("id, name, price, discounted_price, images")
              .eq("id", productId)
              .single();

            if (productError) {
              console.error(`Error fetching product ${productId}:`, productError);
              return null;
            }
            return productData;
          })
        );

        // Filter out any null results (failed product fetches)
        const validProducts = productDetails.filter(Boolean);

        setWishlist(
          validProducts.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            discountedPrice: product.discounted_price,
            images: product.images,
          }))
        );
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Unexpected error fetching wishlist:", error);
      toast.error("Unexpected error loading wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .eq("id", user?.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
        // Update local profile state
        setProfile({
          ...profile as UserProfile,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }
    } catch (error) {
      console.error("Unexpected error updating profile:", error);
      toast.error("Unexpected error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto mt-8">
        <Tabs defaultValue="profile" className="w-[400px] mx-auto">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading profile...</p>
                ) : profile ? (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                  </div>
                ) : (
                  <p>No profile data available.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdateProfile} disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading wishlist...</p>
                ) : wishlist.length > 0 ? (
                  <div className="grid gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-md p-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        {item.discountedPrice && <p>Discounted Price: ${item.discountedPrice}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Your wishlist is empty.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No orders available yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
