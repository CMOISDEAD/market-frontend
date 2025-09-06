import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartButton() {
  return (
    <Link href="/cart">
      <Button variant="ghost">
        <ShoppingCart className="size-6" />
      </Button>
    </Link>
  );
}
