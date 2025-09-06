import { AnalyticsCharts } from "@/components/dashboard/analytics/analytics-charts";
import { AnalyticsStats } from "@/components/dashboard/analytics/analytics-stats";
import { TopProducts } from "@/components/dashboard/analytics/top-products";
import { RevenueChart } from "@/components/dashboard/analytics/revenue-chart";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights and performance metrics
        </p>
      </div>

      <AnalyticsStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <AnalyticsCharts />
      </div>

      <TopProducts />
    </div>
  );
}
