"use client";

import { ProductCard } from "@/components/products/product-card";
import { apiFetch } from "@/lib/api";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await apiFetch("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section id="product-section" className="w-full py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
