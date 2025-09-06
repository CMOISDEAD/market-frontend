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

export function ProfileButton() {
  const { isAuth, user, logout } = useMarketStore((state) => state);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleLogOut = () => {
    logout();
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
                <DropdownMenuLabel>Admin Options</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuLabel>Profile Options</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuLabel>Auth Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOpenLogin}>Login</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register">Register</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Contact</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </>
  );
}
