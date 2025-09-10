/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface OrderEditFormProps {
  orderId: string;
}

const formSchema = z.object({
  status: z.enum([
    "PENDING",
    "PROCESSING",
    "PAID",
    "CANCELLED",
    "SHIPPED",
    "REFUNDED",
  ]),
  paymentStatus: z.enum([
    "PENDING",
    "UNPAID",
    "COMPLETED",
    "REFUNDED",
    "FAILED",
    "CANCELLED",
  ]),
  shippingStatus: z.enum([
    "NOT_SHIPPED",
    "IN_TRANSIT",
    "DELIVERED",
    "RETURNED",
    "CANCELLED",
  ]),
  shippingCarrier: z.string().min(1, "Shipping carrier is required"),
  shippingTrackingNumber: z.string().optional(),
  shippingNotes: z.string().optional(),
});

export function OrderEditForm({ orderId }: OrderEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: undefined,
      paymentStatus: undefined,
      shippingStatus: undefined,
      shippingCarrier: "",
      shippingTrackingNumber: "",
      shippingNotes: "",
    },
  });

  // Fetch order data
  const fetchOrder = async () => {
    try {
      const data = await apiFetch(`/orders/${orderId}`);
      console.log(data);
      form.reset(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await apiFetch(`/orders/${orderId}`, {
        method: "PATCH",
        data: values,
      });
      toast.success("Order updated successfully!");
      router.push(`/dashboard/orders/${orderId}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Orden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pendiente</SelectItem>
                        <SelectItem value="PROCESSING">procesando</SelectItem>
                        <SelectItem value="PAID">Pagado</SelectItem>
                        <SelectItem value="SHIPPED">Enviado</SelectItem>
                        <SelectItem value="CANCELLED">Cancelado</SelectItem>
                        <SelectItem value="REFUNDED">Rembolsado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado del Pago</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pendiente</SelectItem>
                        <SelectItem value="UNPAID">Sin Pagar</SelectItem>
                        <SelectItem value="COMPLETED">Completado</SelectItem>
                        <SelectItem value="FAILED">Fallido</SelectItem>
                        <SelectItem value="REFUNDED">Rembolsado</SelectItem>
                        <SelectItem value="CANCELLED">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NOT_SHIPPED">No Enviado</SelectItem>
                        <SelectItem value="IN_TRANSIT">En Transito</SelectItem>
                        <SelectItem value="DELIVERED">Entregado</SelectItem>
                        <SelectItem value="RETURNED">Devuelto</SelectItem>
                        <SelectItem value="CANCELLED">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informacion del Envio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="shippingCarrier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicio de entrega</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Coordinadora, Servientrega, DHL, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingTrackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de Seguimiento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingerea el numero de Seguimiento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas de Entrega</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notas especiales para la entrega..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Notas de entrega opcionales.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Actualizando..." : "Actualizar Orden"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
