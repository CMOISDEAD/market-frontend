"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";

interface UserOrdersListProps {
  userId: string;
}

interface Order {
  id: string;
  totalAmount: number;
  currency: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  createdAt: string;
  itemsCount: number;
}

const mockOrders: Order[] = [
  {
    id: "1",
    totalAmount: 129.99,
    currency: "USD",
    status: "COMPLETED",
    paymentStatus: "PAID",
    shippingStatus: "DELIVERED",
    createdAt: "2024-01-20T10:30:00Z",
    itemsCount: 3,
  },
  {
    id: "2",
    totalAmount: 79.99,
    currency: "USD",
    status: "PROCESSING",
    paymentStatus: "PAID",
    shippingStatus: "SHIPPED",
    createdAt: "2024-01-18T14:15:00Z",
    itemsCount: 2,
  },
  {
    id: "3",
    totalAmount: 199.99,
    currency: "USD",
    status: "PENDING",
    paymentStatus: "PENDING",
    shippingStatus: "NOT_SHIPPED",
    createdAt: "2024-01-15T09:45:00Z",
    itemsCount: 1,
  },
];

export function UserOrdersList({ userId }: UserOrdersListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      // const response = await fetch(`/api/users/${userId}/orders`)
      // const data = await response.json()
      // setOrders(data)

      console.log("Fetching orders for user:", userId);
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">
          User Orders ({orders.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No orders found for this user.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.itemsCount} items</TableCell>
                  <TableCell className="font-medium">
                    {order.currency} ${order.totalAmount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "COMPLETED"
                          ? "default"
                          : order.status === "PROCESSING"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.paymentStatus === "PAID"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.shippingStatus === "DELIVERED"
                          ? "default"
                          : order.shippingStatus === "SHIPPED"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.shippingStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
