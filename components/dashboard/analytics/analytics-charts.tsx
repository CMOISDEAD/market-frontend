"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const orderStatusData = [
  { status: "Pending", count: 89, color: "hsl(var(--chart-3))" },
  { status: "Processing", count: 156, color: "hsl(var(--chart-2))" },
  { status: "Completed", count: 1089, color: "hsl(var(--chart-1))" },
  { status: "Cancelled", count: 56, color: "hsl(var(--chart-4))" },
];

export function AnalyticsCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Order Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatusData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="status" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
