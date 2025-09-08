"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserType } from "@/types/types";
import { apiFetch } from "@/lib/api";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

interface ProfileInfoFormProps {
  user: UserType;
  onUpdate: (data: z.infer<typeof profileSchema>) => void;
}

export function ProfileInfoForm({ user, onUpdate }: ProfileInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
      city: user.city || "",
      country: user.country || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsLoading(true);
      const data = await apiFetch(`/users/${user.id}`, {
        method: "PATCH",
        data: values,
      });
      onUpdate(data);
      setIsEditing(false);
      toast.success("Profile successfully updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Gestiona tu información personal y de contacto
          </CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) {
              form.reset();
            }
          }}
        >
          {isEditing ? "Cancelar" : "Editar"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+34 123 456 789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu país" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="size-4 animate-spin mr-2" />
                  )}
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p>{user.phone || "No especificado"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ciudad</p>
              <p>{user.city || "No especificada"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">País</p>
              <p>{user.country || "No especificado"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
