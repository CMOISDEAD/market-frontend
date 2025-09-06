"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const orderData = [
  { name: "Completed", value: 1089, color: "hsl(var(--chart-1))" },
  { name: "Processing", value: 156, color: "hsl(var(--chart-2))" },
  { name: "Pending", value: 89, color: "hsl(var(--chart-3))" },
  { name: "Cancelled", value: 56, color: "hsl(var(--chart-4))" },
];

export function OrdersOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Orders Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={orderData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
