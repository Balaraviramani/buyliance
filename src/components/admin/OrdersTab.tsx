import { useState, useEffect } from "react";
import { Order } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrdersTabProps {
  isAdmin: boolean;
}

const OrdersTab = ({ isAdmin }: OrdersTabProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (isAdmin) {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select(`
              id, 
              user_id,
              subtotal, 
              tax, 
              shipping, 
              total, 
              status, 
              created_at,
              updated_at,
              payment_method
            `)
            .order('created_at', { ascending: false });

          if (error) throw error;
          
          const transformedOrders: Order[] = (data || []).map(order => ({
            id: order.id,
            userId: order.user_id,
            items: [],
            shippingAddress: {
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: ''
            },
            paymentMethod: order.payment_method,
            subtotal: order.subtotal,
            tax: order.tax,
            shipping: order.shipping,
            total: order.total,
            status: order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
            createdAt: order.created_at,
            updatedAt: order.updated_at,
            paymentStatus: 'pending'
          }));
          
          setOrders(transformedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">Orders Management</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  #{order.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.userId.substring(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  ${order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                    ${order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : ''}
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                    ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select 
                    className="text-sm border border-gray-300 rounded-md"
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(
                      order.id, 
                      e.target.value as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    )}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;