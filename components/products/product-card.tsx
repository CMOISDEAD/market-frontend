"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductType } from "@/types/types";
import Link from "next/link";

export function ProductCard({ id, name, price, images }: ProductType) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/${id}`}>
      <div
        className="bg-dark-800 rounded-lg overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square">
          <Image
            src={isHovered ? images[1] : images[0]}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1 rounded-full text-sm font-medium">
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "COP",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
