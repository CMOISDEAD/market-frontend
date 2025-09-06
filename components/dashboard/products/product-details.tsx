"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      toast.loading("Loading product data...");
      const data = await apiFetch(`/products/${productId}`);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product data");
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await apiFetch(`/products/${productId}`, { method: "DELETE" });
      router.push("/dashboard/products");
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Product deletion failed");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </CardContent>
      </Card>

      {/* Product Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Product Information</CardTitle>
            <div className="flex gap-2">
              <Link href={`/dashboard/products/${productId}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={deleteProduct}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-card-foreground">SKU</h3>
                <p className="text-muted-foreground font-mono">{product.sku}</p>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Price</h3>
                <p className="text-2xl font-bold text-card-foreground">
                  ${product.price}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Name</h3>
              <p className="text-xl text-card-foreground">{product.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  Stock
                </h3>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock} units
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  Gender
                </h3>
                <Badge variant="outline">{product.gender}</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Status
              </h3>
              <Badge variant={product.featured ? "default" : "secondary"}>
                {product.featured ? "Featured" : "Regular"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Product Attributes */}
        <Card>
          <CardHeader>
            <CardTitle>Product Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Badge key={size} variant="outline">
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Available Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Badge key={color} variant="outline">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h3 className="font-semibold text-card-foreground">Created</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Last Updated
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(product.updatedAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
