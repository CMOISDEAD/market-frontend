"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,678",
    change: "+15.2%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "New Customers",
    value: "234",
    change: "+8.1%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Products Sold",
    value: "1,456",
    change: "+23.5%",
    trend: "up",
    icon: Package,
    description: "vs last month",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    icon: ShoppingCart,
    description: "vs last month",
  },
];

export function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stat.value}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }
              >
                {stat.change}
              </span>
              <span className="ml-1">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
