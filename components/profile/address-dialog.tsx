"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { ResponsiveDialog } from "@/components/layout/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddressType } from "@/types/types";
import { apiFetch } from "@/lib/api";

const addressSchema = z.object({
  label: z.string().min(1, { message: "La etiqueta es requerida." }),
  street: z
    .string()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  city: z
    .string()
    .min(2, { message: "La ciudad debe tener al menos 2 caracteres." }),
  state: z.string().min(2, {
    message: "La provincia/estado debe tener al menos 2 caracteres.",
  }),
  postalCode: z
    .string()
    .min(3, { message: "El código postal debe tener al menos 3 caracteres." }),
  country: z
    .string()
    .min(2, { message: "El país debe tener al menos 2 caracteres." }),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
});

interface AddressDialogProps {
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  address?: AddressType;
  onSave: (data: z.infer<typeof addressSchema>) => void;
}

export function AddressDialog({
  userId,
  isOpen,
  setIsOpen,
  address,
  onSave,
}: AddressDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!address;

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: address?.label ?? "",
      street: address?.street ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      postalCode: address?.postalCode ?? "",
      country: address?.country ?? "",
      phone: address?.phone ?? "",
      isDefault: address?.isDefault ?? false,
    },
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    try {
      setIsLoading(true);
      const route = address ? `/address/${address.id}` : "/address";
      const data = await apiFetch(route, {
        method: address ? "PATCH" : "POST",
        data: {
          ...values,
          userId,
        },
      });
      onSave(data);
      setIsOpen(false);
      form.reset();
      toast.success(isEditing ? "Dirección actualizada" : "Dirección agregada");
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Error al guardar la dirección");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isEditing ? "Editar Dirección" : "Agregar Nueva Dirección"}
      description={
        isEditing
          ? "Modifica los datos de tu dirección de envío"
          : "Completa los datos de tu nueva dirección de envío"
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiqueta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una etiqueta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Trabajo">Trabajo</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+34 123 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Calle, número, piso, puerta..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provincia/Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu provincia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="28001" {...field} />
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
                    <Input placeholder="España" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Establecer como dirección predeterminada
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="size-4 animate-spin mr-2" />}
              {isEditing ? "Actualizar" : "Agregar"} Dirección
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
