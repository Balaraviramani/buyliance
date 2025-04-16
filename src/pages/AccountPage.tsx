
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserCircle, Package, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

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
      // Try to get profile data from user metadata or localStorage
      const firstName = user.user_metadata?.first_name || localStorage.getItem('firstName') || "Guest";
      const lastName = user.user_metadata?.last_name || localStorage.getItem('lastName') || "User";
      
      setProfile({
        firstName,
        lastName
      });
    }
  }, [user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
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
              <Button variant="outline" size="sm">Edit Profile</Button>
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
              <Button variant="outline" size="sm">View Orders</Button>
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
              <Button variant="outline" size="sm">View Wishlist</Button>
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
