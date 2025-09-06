"use client";
import { useEffect, useState } from "react";
import CartView from "@/components/cart/cart-view";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { CartType } from "@/types/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await apiFetch("/users/me");
        setCart(data.cart);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching user cart.");
      }
    };
    fetchCart();
  });

  if (!cart) {
    return <p>loading</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <CartView cart={cart} />
    </div>
  );
}
