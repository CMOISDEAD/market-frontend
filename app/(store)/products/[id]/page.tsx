"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { ProductType, UserType } from "@/types/types";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ProductPage() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiFetch(`/products/${id}`);
        setProduct(data);

        // Set sensible defaults when editing / loading product
        if (data) {
          if (Array.isArray(data.sizes) && data.sizes.length > 0) {
            setSelectedSize((prev) => prev || data.sizes[0]);
          }
          if (Array.isArray(data.colors) && data.colors.length > 0) {
            setSelectedColor((prev) => prev ?? data.colors[0]);
          }
        }

        setQuantity(1);
      } catch (error) {
        console.error(error);
        toast.error("error fetching the product");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Product not found</p>;

  const maxAvailable =
    typeof product.stock === "number" ? product.stock : Infinity;

  const incrementQuantity = () => {
    setQuantity((q) => {
      const next = q + 1;
      if (next > maxAvailable) {
        toast.error("No hay más stock disponible");
        return q;
      }
      return next;
    });
  };

  const decrementQuantity = () => {
    setQuantity((q) => (q > 1 ? q - 1 : q));
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (quantity > maxAvailable) {
      toast.error("Requested quantity exceeds stock");
      return;
    }

    try {
      const user: UserType = await apiFetch("/users/me");
      const data = {
        cartId: user.cart!.id,
        productId: product.id,
        priceAtAdd: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
      };

      await apiFetch("/cart-items", { method: "POST", data });
      toast.success("product added to cart successfully.");
    } catch (error) {
      console.error(error);
      toast.error("error adding product to cart.");
    }
  };

  const handleBuyNow = () => {
    // implementar flujo de compra
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 sticky top-0 h-screen overflow-y-auto bg-background flex items-center p-20">
        <div className="mx-auto w-full space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground capitalize">
              {product.categories.join("/")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "COP",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {typeof product.stock === "number"
                ? `${product.stock} in stock`
                : null}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={color === selectedColor ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Size</h3>
              <button className="text-sm text-primary underline">
                Size guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={size === selectedSize ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity control */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity</span>

            <div className="inline-flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="px-3"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                value={quantity}
                readOnly
                aria-label="Quantity"
                className="w-16 text-center bg-transparent border-none focus:ring-0"
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
                disabled={quantity >= maxAvailable}
                aria-label="Increase quantity"
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {maxAvailable !== Infinity && (
              <span className="text-xs text-muted-foreground">
                ({maxAvailable} available)
              </span>
            )}
          </div>

          <div className="space-y-3 flex gap-2">
            <Button className="w-full" onClick={handleBuyNow}>
              Buy Product
            </Button>
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="size-4" />
            </Button>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>

      {/* Right Column - Scrollable Images */}
      <div className="w-1/2 bg-muted/30">
        <div className="space-y-1">
          {product.images.map((image, index) => (
            <div key={index} className="relative aspect-[3/4] w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} - View ${index + 1}`}
                fill
                className="object-cover"
                sizes="50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
