"use client";

import { ProductCard } from "../products/product-card";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/types";
import { apiFetch } from "@/lib/api";

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductType[] = await apiFetch("/products");
        setProducts(data.filter((p) => p.featured));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de piezas esenciales para tu guardarropa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
