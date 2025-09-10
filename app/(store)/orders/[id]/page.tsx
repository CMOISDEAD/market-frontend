"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OrderType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
    case "PAID":
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "PROCESSING":
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
    case "UNPAID":
    case "NOT_SHIPPED":
      return "bg-yellow-100 text-yellow-800";
    case "CANCELLED":
    case "REFUNDED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderDetailPage() {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [trackingCopied, setTrackingCopied] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFetch(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
        toast.error("error fetching orders.");
      }
    };
    fetchOrders();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.shippingTrackingNumber!);
    setTrackingCopied(true);
    setTimeout(() => setTrackingCopied(false), 2000);
  };

  const handlePayment = () => {
    if (order.init_point) {
      window.open(order.init_point, "_blank");
    }
  };

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.19; // 19% IVA
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-8 mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Ir a Ordenes
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order.id}
              </h1>
              <p className="text-gray-600 mt-1">
                Creada {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={getStatusColor(order.status)}
                variant="secondary"
              >
                {order.status}
              </Badge>
              <Badge
                className={getStatusColor(order.paymentStatus)}
                variant="secondary"
              >
                {order.paymentStatus}
              </Badge>
              <Badge
                className={getStatusColor(order.shippingStatus)}
                variant="secondary"
              >
                {order.shippingStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {order.status !== "PAID" &&
              order.paymentStatus !== "COMPLETED" &&
              order.init_point && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-orange-800 mb-1">
                          Pago requerido
                        </h3>
                        <p className="text-orange-700 text-sm">
                          Completa tu pago para proceder con esta orden.
                        </p>
                      </div>
                      <Button
                        onClick={handlePayment}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Pagar ahora
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Elementos de la orden
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={
                            item.product.images[0] ||
                            "https://placechold.co/200"
                          }
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Talla: {item.size}</span>
                          <span>Color: {item.color}</span>
                          <span>Cantidad: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: order.currency,
                            },
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: order.currency,
                          })}{" "}
                          unidad
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Linea de tiempo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.history.map((event, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${index === order.history.length - 1 ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        {index < order.history.length - 1 && (
                          <div className="w-px h-8 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-col gap-2 spacec-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {event.from || "null"}
                            </Badge>
                            <ArrowRight className="size-4" />
                            <Badge variant="secondary">{event.to}</Badge>
                          </div>
                          <span className="text-sm">
                            {new Date(event.date).toLocaleDateString()} at{" "}
                            {new Date(event.date).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="">{event.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    {subtotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: order.currency,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (IVA 19%)</span>
                  <span>
                    {tax.toLocaleString("en-US", {
                      style: "currency",
                      currency: order.currency,
                    })}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: order.currency,
                    })}{" "}
                  </span>
                </div>
                {order.status !== "PAID" &&
                  order.paymentStatus !== "COMPLETED" &&
                  order.init_point && (
                    <>
                      <Separator />
                      <Button
                        onClick={handlePayment}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        size="lg"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Completar Pago
                      </Button>
                    </>
                  )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Direccion de Envio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{order.shippingAddress?.street || "Calle 123"}</p>
                  <p>
                    {order.shippingAddress?.city || "Armenia"},{" "}
                    {order.shippingAddress?.state || "Quindio"}
                  </p>
                  <p>{order.shippingAddress?.country || "Colombia"}</p>
                </div>
              </CardContent>
            </Card>

            {order.shippingTrackingNumber && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Detalles de Envio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Carrier
                    </p>
                    <p className="font-medium">{order.shippingCarrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Numero de seguimiento
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {order.shippingTrackingNumber}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyTrackingNumber}
                        className="h-8 w-8 p-0"
                      >
                        {trackingCopied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {order.shippingNotes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Notas de entrega
                      </p>
                      <p className="text-sm">{order.shippingNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informacion de pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge
                      className={getStatusColor(order.paymentStatus)}
                      variant="secondary"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span>Credit Card</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
