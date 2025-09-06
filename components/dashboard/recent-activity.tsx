import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    type: "order",
    message: "New order #1234 received",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "user",
    message: "New user registration: john@example.com",
    time: "5 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "product",
    message: "Product 'iPhone 15' stock low (5 remaining)",
    time: "10 minutes ago",
    status: "warning",
  },
  {
    id: 4,
    type: "order",
    message: "Order #1230 shipped",
    time: "15 minutes ago",
    status: "success",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-card-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge
              variant={
                activity.status === "success"
                  ? "default"
                  : activity.status === "warning"
                    ? "secondary"
                    : "outline"
              }
            >
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
