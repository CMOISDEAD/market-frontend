"use client";

import { Benefits } from "@/components/home/benefits";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { NewCollection } from "@/components/home/new-collection";
import { ProductList } from "@/components/home/products-list";
import { SaleSection } from "@/components/home/sales-section";
import { Testimonials } from "@/components/home/testimonials";
import { CustomBanner } from "@/components/layout/custom-banner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CustomBanner />
      <Benefits />
      <Categories />
      <FeaturedProducts />
      <ProductList />
      <NewCollection />
      <SaleSection />
      <Testimonials />
    </main>
  );
}
