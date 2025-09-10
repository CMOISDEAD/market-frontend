import { UserForm } from "@/components/dashboard/users/user-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewUserPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a usuarios
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Crear nuevo usuario
          </h1>
          <p className="text-muted-foreground">Agregar nuevo usuario</p>
        </div>
      </div>

      <UserForm />
    </div>
  );
}
