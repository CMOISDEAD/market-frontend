/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, MapPin, Shield, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { ProfileInfoForm } from "@/components/profile/profile-info-form";
import { AddressCard } from "@/components/profile/address-card";
import { AddressDialog } from "@/components/profile/address-dialog";
import { AddressType, UserType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { useMarketStore } from "@/store/useMarketStore";

export default function ProfilePage() {
  const { logout } = useMarketStore((state) => state);
  const [user, setUser] = useState<UserType | null>(null);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch("/users/me");
        setUser(data);
        setAddresses(data.addresses);
      } catch (error) {
        toast.error("Error fetching user");
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = (data: any) => {
    setUser({ ...user, ...data });
  };

  const handleAddAddress = (data: any) => {
    setAddresses([...addresses, data]);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
  };

  const handleUpdateAddress = (data: any) => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...data } : addr,
        ),
      );
      setEditingAddress(null);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await apiFetch(`/address/${addressId}`, {
        method: "DELETE",
      });
      setAddresses(addresses.filter((addr) => addr.id !== addressId));
      toast.success("Dirección eliminada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error removing address");
    }
  };

  const handleDeactivateAccount = async () => {
    if (!user) return;
    try {
      await apiFetch(`/auth/deactivate/${user.id}`, {
        method: "POST",
      });
      logout();
      toast.error("Account desactivated");
    } catch (error) {
      console.error(error);
      toast.error("Error desactivating your account");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl my-36">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback>{user.name!.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {user.activated ? (
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Cuenta Activada
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <ShieldAlert className="h-3 w-3 mr-1" />
                  Cuenta Pendiente
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <ProfileInfoForm user={user} onUpdate={handleProfileUpdate} />

        {/* Addresses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Direcciones de Envío
              </CardTitle>
              <CardDescription>
                Gestiona tus direcciones de envío para tus pedidos
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddingAddress(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Dirección
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))}
              {addresses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tienes direcciones guardadas</p>
                  <p className="text-sm">
                    Agrega una dirección para facilitar tus compras
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
            <CardDescription>
              Acciones irreversibles que afectan tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Desactivar Cuenta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción desactivará tu cuenta. No podrás acceder a tu
                    perfil ni realizar compras. Puedes reactivar tu cuenta
                    contactando con nuestro equipo de soporte.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeactivateAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Desactivar Cuenta
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Address Dialogs */}
        <AddressDialog
          userId={user.id}
          isOpen={isAddingAddress}
          setIsOpen={setIsAddingAddress}
          onSave={handleAddAddress}
        />

        <AddressDialog
          userId={user.id}
          isOpen={!!editingAddress}
          setIsOpen={() => setEditingAddress(null)}
          address={editingAddress || undefined}
          onSave={handleUpdateAddress}
        />
      </div>
    </div>
  );
}
