"use client";

import { ProductList } from "@/components/home/prodcuts-list";
import { CustomBanner } from "@/components/layout/custom-banner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CustomBanner />
      <ProductList />
    </main>
  );
}
