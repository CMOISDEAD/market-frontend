"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/orders");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-3">
            ¡Pago Exitoso!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your payment has been aproved successfully.
          </p>
          <div className="text-sm text-muted-foreground">
            Redirecting in {countdown} seconds...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
