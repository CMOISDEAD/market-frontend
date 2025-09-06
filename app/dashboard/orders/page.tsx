import { OrdersTable } from "@/components/dashboard/orders/orders-table";
import { OrdersStats } from "@/components/dashboard/orders/orders-stats";

export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and fulfillment
        </p>
      </div>

      <OrdersStats />
      <OrdersTable />
    </div>
  );
}
