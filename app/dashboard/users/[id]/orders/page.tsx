import { UserOrdersList } from "@/components/dashboard/users/user-orders-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface UserOrdersPageProps {
  params: {
    id: string;
  };
}

export default function UserOrdersPage({ params }: UserOrdersPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/users/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Orders</h1>
          <p className="text-muted-foreground">View all orders for this user</p>
        </div>
      </div>

      <UserOrdersList userId={params.id} />
    </div>
  );
}
