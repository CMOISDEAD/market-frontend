import { OrderEditForm } from "@/components/dashboard/orders/order-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditOrderPageProps {
  params: {
    id: string;
  };
}

export default function EditOrderPage({ params }: EditOrderPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/orders/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Order
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Order</h1>
          <p className="text-muted-foreground">
            Update order status and shipping information
          </p>
        </div>
      </div>

      <OrderEditForm orderId={params.id} />
    </div>
  );
}
