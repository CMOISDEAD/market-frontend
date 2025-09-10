"use client";

import { useState } from "react";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LoginDialog } from "../auth/login-dialog";
import { useMarketStore } from "@/store/useMarketStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileButton() {
  const { isAuth, user, logout } = useMarketStore((state) => state);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <User2 className="size-6" />
            <span className="sr-only">Profile</span>
          </Button>
        </DropdownMenuTrigger>
        {isAuth && user ? (
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === "ADMIN" && (
              <>
                <DropdownMenuLabel>Opciones de Administrador</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuLabel>Opciones de Perfil</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="/profile">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/orders">Ordenes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Configuracion</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuLabel>Opciones de Autenticacion</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOpenLogin}>Login</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register">Registrarse</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Contacto</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </>
  );
}
