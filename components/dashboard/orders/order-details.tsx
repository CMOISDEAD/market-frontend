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
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Package, Truck, Calendar } from "lucide-react";
import Link from "next/link";
import { OrderType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  orderId: string;
}

export function OrderDetails({ orderId }: Props) {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await apiFetch(`/orders/${orderId}`);
        setOrder(data);
        console.log("Fetching order:", orderId);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("error fetching order.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "PROCESSING":
        return "secondary";
      case "PENDING":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order #{order.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment:</span>
              <Badge
                variant={
                  order.paymentStatus === "COMPLETED"
                    ? "default"
                    : "destructive"
                }
              >
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping:</span>
              <Badge
                variant={
                  order.shippingStatus === "DELIVERED"
                    ? "default"
                    : order.shippingStatus === "IN_TRANSIT"
                      ? "secondary"
                      : "outline"
                }
              >
                {order.shippingStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold text-lg">
                {order.totalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.currency,
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            {order.deliveredAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivered:</span>
                <span>{new Date(order.deliveredAt).toLocaleString()}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer
            </h4>
            <div className="text-sm space-y-1">
              <div>{order.user.name}</div>
              <div className="text-muted-foreground">{order.user.email}</div>
              <Link href={`/dashboard/users/${order.userId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  View Customer
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Attributes</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/products/${item.productId}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.sku}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: order.currency,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {item.size && (
                          <Badge variant="outline">{item.size}</Badge>
                        )}
                        {item.color && (
                          <Badge variant="outline">{item.color}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(item.quantity * item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: order.currency,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h4>
                <div className="text-sm space-y-1">
                  <div>{order.shippingAddress?.street}</div>
                  <div>
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}{" "}
                    {order.shippingAddress?.postalCode}
                  </div>
                  <div>{order.shippingAddress?.country}</div>
                  {order.shippingAddress?.phone && (
                    <div>Phone: {order.shippingAddress.phone}</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tracking Information</h4>
                <div className="text-sm space-y-1">
                  {order.shippingCarrier && (
                    <div>Carrier: {order.shippingCarrier}</div>
                  )}
                  {order.shippingTrackingNumber && (
                    <div className="font-mono">
                      Tracking: {order.shippingTrackingNumber}
                    </div>
                  )}
                  {order.shippingNotes && (
                    <div>Notes: {order.shippingNotes}</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.history.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                >
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {entry.from ? `${entry.from} → ${entry.to}` : entry.to}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      By {entry.by} {entry.reason && `• ${entry.reason}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
