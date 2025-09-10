"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const stats = [
  {
    title: "Ordenes Totales",
    value: "1,234",
    change: "+12%",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Ordenes Pendientes",
    value: "89",
    change: "+5%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Ordenes Completadas",
    value: "1,089",
    change: "+18%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Ordenes Canceladas",
    value: "56",
    change: "-8%",
    icon: XCircle,
    color: "text-red-600",
  },
];

export function OrdersStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
