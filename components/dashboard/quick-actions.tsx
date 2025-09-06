import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingCart } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Add Product",
    description: "Create a new product",
    href: "/dashboard/products/new",
    icon: Package,
  },
  {
    title: "Add User",
    description: "Create a new user account",
    href: "/dashboard/users/new",
    icon: Users,
  },
  {
    title: "View Orders",
    description: "Manage customer orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4 bg-transparent"
            >
              <action.icon className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
