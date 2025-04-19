
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderPriceSummary } from "./OrderPriceSummary";
import type { Order } from "@/types";

interface OrderCardProps {
  order: Order;
  formatDate: (date: string) => string;
}

export const OrderCard = ({ order, formatDate }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              Order #{order.id.slice(0, 8)}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={`${order.id}-item-${index}`}>
                <TableCell className="flex items-center gap-2">
                  <img 
                    src={item.product.images[0] || "/placeholder.svg"} 
                    alt={item.product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <span>{item.product.name}</span>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <OrderPriceSummary 
          subtotal={order.subtotal}
          shipping={order.shipping}
          tax={order.tax}
          total={order.total}
        />
      </CardContent>
    </Card>
  );
};
