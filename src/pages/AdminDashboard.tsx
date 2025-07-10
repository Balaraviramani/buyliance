import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import AddProductForm from "@/components/admin/AddProductForm";
import ProductsTab from "@/components/admin/ProductsTab";
import OrdersTab from "@/components/admin/OrdersTab";
import CustomersTab from "@/components/admin/CustomersTab";
import SettingsTab from "@/components/admin/SettingsTab";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (profile && profile.is_admin) {
          setIsAdmin(true);
        } else {
          toast.error("You do not have access to the admin dashboard");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast.error("Error checking permissions. Please try again later.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);


  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading admin dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-center">
            <AlertTriangle className="text-yellow-500 mr-3 h-5 w-5" />
            <div>
              <p className="font-medium">Access Restricted</p>
              <p className="text-sm">You don't have permission to access the admin dashboard.</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setIsAddProductOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsTab onAddProduct={() => setIsAddProductOpen(true)} />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersTab isAdmin={isAdmin} />
          </TabsContent>
          
          <TabsContent value="customers">
            <CustomersTab isAdmin={isAdmin} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <AddProductForm isOpen={isAddProductOpen} onClose={() => setIsAddProductOpen(false)} />
    </MainLayout>
  );
};

export default AdminDashboard;
