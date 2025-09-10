"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Eye, Search, User } from "lucide-react";
import Link from "next/link";
import { OrderType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export function OrdersTable() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await apiFetch("/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      // const response = await fetch(`/api/orders/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // })
      // if (response.ok) {
      //   setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
      // }
      // setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
      console.log("Updating order status:", id, status);
      toast.success("Order status updated, under development");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name!.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "default";
      case "PENDING":
        return "outline";
      case "REFUNDED":
        return "secondary";
      default:
        return "destructive";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">Ordenes</CardTitle>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ordenes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="PENDING">Pendientes</SelectItem>
              <SelectItem value="PROCESSING">Procesando</SelectItem>
              <SelectItem value="COMPLETED">Completadas</SelectItem>
              <SelectItem value="CANCELLED">Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Comprador</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Elementos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Envio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono">#{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium">{order.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.user.email}
                      </div>
                    </div>
                    <Link href={`/dashboard/users/${order.userId}`}>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <User className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell className="font-medium">
                  {order.currency} ${order.totalAmount}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
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
                    {order.shippingTrackingNumber && (
                      <div className="text-xs text-muted-foreground font-mono">
                        {order.shippingTrackingNumber}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/orders/${order.id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Order
                        </DropdownMenuItem>
                      </Link>
                      {order.status === "PENDING" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "PROCESSING")
                          }
                        >
                          Mark as Processing
                        </DropdownMenuItem>
                      )}
                      {order.status === "PROCESSING" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "COMPLETED")
                          }
                        >
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {order.status !== "CANCELLED" &&
                        order.status !== "PAID" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "CANCELLED")
                            }
                            className="text-destructive"
                          >
                            Cancel Order
                          </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
