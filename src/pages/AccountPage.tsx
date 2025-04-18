import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { UserCircle, Package, Heart, LogOut, Edit, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, WishlistItem } from "@/types";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images: string[];
}

const AccountPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          const userData = {
            id: user.id,
            firstName: profileData?.first_name || user.user_metadata?.first_name || "",
            lastName: profileData?.last_name || user.user_metadata?.last_name || "",
            email: user.email || ""
          };

          setProfile(userData);
          setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName
          });

        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select(`
              id, 
              subtotal, 
              tax, 
              shipping, 
              total, 
              status, 
              created_at,
              order_items (
                product_id, 
                quantity, 
                price
              )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;

          const ordersWithProducts = await Promise.all(
            (data || []).map(async (order) => {
              const productIds = order.order_items.map((item: any) => item.product_id);
              
              const { data: products } = await supabase
                .from('products')
                .select('*')
                .in('id', productIds);
              
              const itemsWithProducts = order.order_items.map((item: any) => {
                const product = products?.find((p) => p.id === item.product_id);
                return {
                  ...item,
                  product
                };
              });

              return {
                ...order,
                order_items: itemsWithProducts,
                created_at_formatted: new Date(order.created_at).toLocaleDateString()
              };
            })
          );

          setOrders(ordersWithProducts);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error("Failed to load order history");
        }
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('wishlist')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          const wishlistIds = profileData?.wishlist || [];
          
          if (wishlistIds.length === 0) {
            setWishlistItems([]);
            return;
          }

          const { data: products, error: productsError } = await supabase
            .from('products')
            .select('id, name, price, discounted_price, images')
            .in('id', wishlistIds);

          if (productsError) throw productsError;

          const wishlistItems: WishlistItem[] = (products || []).map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            discountedPrice: product.discounted_price || undefined,
            images: product.images
          }));

          setWishlistItems(wishlistItems);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
          toast.error("Failed to load wishlist");
        }
      }
    };

    fetchWishlist();
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile({
        ...profile,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('wishlist')
        .eq('id', user?.id)
        .single();

      if (fetchError) throw fetchError;

      const updatedWishlist = (currentProfile?.wishlist || []).filter(id => id !== productId);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ wishlist: updatedWishlist })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setWishlistItems(wishlistItems.filter(item => item.id !== productId));
      
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input value={profile.email} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {profile.email}</p>
                    <p><span className="font-medium">First Name:</span> {profile.firstName}</p>
                    <p><span className="font-medium">Last Name:</span> {profile.lastName}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isEditing ? (
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isLoading ? "Saving..." : "Save Profile"}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={handleEditProfile}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <div className="mt-8">
              <Button 
                variant="destructive" 
                className="flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Your Orders
                </CardTitle>
                <CardDescription>Order history and tracking</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-md p-4">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Order #{order.id.substring(0, 8)}</p>
                            <p className="text-sm text-gray-500">Placed on {order.created_at_formatted}</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {order.order_items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-t">
                              <div className="flex items-center">
                                {item.product?.images?.[0] && (
                                  <div className="w-12 h-12 mr-4 bg-gray-100 rounded overflow-hidden">
                                    <img 
                                      src={item.product.images[0]} 
                                      alt={item.product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium">{item.product?.name || "Product"}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${order.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shipping:</span>
                            <span>${order.shipping}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tax:</span>
                            <span>${order.tax}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                            <span>Total:</span>
                            <span>${order.total}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/shop")}
                    >
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-md p-4">
                        <div className="aspect-w-1 aspect-h-1 w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.images[0] || "/placeholder.svg"} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center mt-2">
                          <span className="font-medium">
                            ${item.discountedPrice || item.price}
                          </span>
                          {item.discountedPrice && (
                            <span className="ml-2 text-sm line-through text-gray-500">
                              ${item.price}
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your wishlist is empty.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/shop")}
                    >
                      Discover Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
