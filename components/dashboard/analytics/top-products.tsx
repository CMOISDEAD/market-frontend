"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topProducts = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    sku: "SHIRT-001",
    sales: 245,
    revenue: 7350,
    percentage: 100,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    sku: "JEANS-002",
    sales: 189,
    revenue: 15111,
    percentage: 77,
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    sku: "DRESS-003",
    sales: 156,
    revenue: 9356,
    percentage: 64,
  },
  {
    id: "4",
    name: "Casual Sneakers",
    sku: "SHOES-004",
    sales: 134,
    revenue: 13400,
    percentage: 55,
  },
  {
    id: "5",
    name: "Leather Jacket",
    sku: "JACKET-005",
    sales: 98,
    revenue: 19600,
    percentage: 40,
  },
];

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-card-foreground">
                      {product.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {product.sku}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-card-foreground">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
                <Progress value={product.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
