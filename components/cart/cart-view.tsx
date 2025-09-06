"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItemType, CartType } from "@/types/types";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  cart: CartType;
}

export default function CartView({ cart }: Props) {
  const [items, setItems] = useState<CartItemType[]>(cart.items);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Updating on db.");
      await apiFetch(`/cart-items/${itemId}`, {
        method: "PATCH",
        data: { quantity: newQuantity },
      });

      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Error updating item quantity.");
    } finally {
      toast.dismiss();
      setIsLoading(false);
    }
  };
  const removeItem = async (itemId: string) => {
    try {
      await apiFetch(`/cart-items/${itemId}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== itemId));
      toast.success("successfully cart item removed.");
    } catch (error) {
      console.error(error);
      toast.error("error removing cart item.");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0,
  );
  const shipping = subtotal > 100000 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    try {
      const { init_point } = await apiFetch("/cart/checkout", {
        method: "POST",
      });

      if (init_point) {
        window.open(init_point, "_blank");
      } else {
        toast.error("No se recibió el link de MercadoPago");
      }

      router.push("/orders");
    } catch (error) {
      console.error(error);
      toast.error("Error en checkout");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-32">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <span className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {items.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-32 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-balance">
                            {item.product.name}
                          </h3>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          {item.priceAtAdd.toLocaleString("en-US", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </p>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isLoading}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isLoading}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>
                  Subtotal ({items.length}{" "}
                  {items.length === 1 ? "item" : "items"})
                </span>
                <span>
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "COP",
                  })}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping === 0 && subtotal > 0 && (
                <p className="text-xs text-green-600">
                  Free shipping on orders over COP 100.000
                </p>
              )}

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "COP",
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-medium"
                disabled={items.length === 0}
              >
                CHECKOUT
              </Button>

              <Button
                variant="outline"
                className="w-full py-4 bg-transparent"
                disabled={items.length === 0}
              >
                Buy with ShopPay
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 pt-2">
              <p>• Secure checkout with SSL encryption</p>
              <p>• 30-day return policy</p>
              <p>• Free returns on all orders</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
