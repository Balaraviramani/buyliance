
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { toast } from "sonner";
import type { Order } from "@/types";
import { Separator } from "@/components/ui/separator";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      // First try to get orders directly without joining profiles
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          shipping_address:addresses(street, city, state, postal_code),
          order_items(
            quantity,
            price,
            product:products(id, name, images)
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
        setOrders([]);
        setLoading(false);
        return;
      }

      const formattedOrders: Order[] = (data || []).map(order => ({
        id: order.id,
        userId: order.user_id,
        items: order.order_items.map(item => ({
          product: {
            id: item.product.id || "",
            name: item.product.name,
            images: item.product.images,
            description: "",
            price: item.price, // Use the order item price directly
            currency: "USD",
            category: "",
            tags: [],
            rating: 0,
            reviews: 0,
            stock: 0,
            featured: false,
            createdAt: "",
            updatedAt: ""
          },
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          street: order.shipping_address?.street || "",
          city: order.shipping_address?.city || "",
          state: order.shipping_address?.state || "",
          postalCode: order.shipping_address?.postal_code || "",
          country: "USA"
        },
        paymentMethod: order.payment_method,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
        status: order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        createdAt: order.created_at,
        updatedAt: order.updated_at || order.created_at
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-2 mb-6">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <Separator className="mb-6" />
        
        {!user ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You need to be logged in to view your orders</p>
              <Link to="/auth">
                <Button>Log In</Button>
              </Link>
            </CardContent>
          </Card>
        ) : loading ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center">Loading orders...</p>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyOrdersPage;
