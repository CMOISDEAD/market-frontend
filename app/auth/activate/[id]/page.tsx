"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function ActivateAccountPage() {
  const params = useParams();
  const userId = params.id as string;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await apiFetch(`/auth/activate/${userId}`, {
          method: "POST",
        });

        setStatus("success");
      } catch (error) {
        console.error("Error activating account:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Error desconocido",
        );
      }
    };

    if (userId) {
      activateAccount();
    }
  }, [userId]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Activating account...
            </h1>
            <p className="text-muted-foreground">
              Please wait until we verify your account.
            </p>
          </>
        );

      case "success":
        return (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Account Verified
            </h1>
            <p className="text-muted-foreground mb-6">
              Your account has been successfully activated. Now you can accces
              to all the functions.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Continue</Link>
            </Button>
          </>
        );

      case "error":
        return (
          <>
            <div className="flex justify-center mb-6">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Error with the activation
            </h1>
            <p className="text-muted-foreground mb-6">
              {errorMessage ||
                "No se pudo activar tu cuenta. Por favor intenta nuevamente."}
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/contact">Support Contact</Link>
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
