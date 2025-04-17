
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserCircle, Package, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Define a type for user profile data
interface UserProfile {
  firstName: string;
  lastName: string;
}

const AccountPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Guest",
    lastName: "User"
  });

  useEffect(() => {
    // Extract user metadata or use defaults
    if (user) {
      try {
        // Try to get profile data from user metadata or localStorage
        const userMeta = user.user_metadata || {};
        const firstName = userMeta.first_name || localStorage.getItem('firstName') || "Guest";
        const lastName = userMeta.last_name || localStorage.getItem('lastName') || "User";
        
        setProfile({
          firstName,
          lastName
        });
      } catch (error) {
        console.error("Error getting user profile data:", error);
        // Fallback to defaults
        setProfile({
          firstName: "Guest",
          lastName: "User"
        });
      }
    }
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
    toast.info("Profile editing will be available soon!");
  };

  const handleViewOrders = () => {
    toast.info("Orders feature will be available soon!");
  };

  const handleViewWishlist = () => {
    toast.info("Wishlist feature will be available soon!");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="w-5 h-5" />
                Profile
              </CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Name:</span> {profile.firstName} {profile.lastName}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>Edit Profile</Button>
            </CardFooter>
          </Card>

          {/* Orders Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Orders
              </CardTitle>
              <CardDescription>Your order history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                View and track your orders
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={handleViewOrders}>View Orders</Button>
            </CardFooter>
          </Card>

          {/* Wishlist Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </CardTitle>
              <CardDescription>Your saved items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Products you've saved for later
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={handleViewWishlist}>View Wishlist</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
