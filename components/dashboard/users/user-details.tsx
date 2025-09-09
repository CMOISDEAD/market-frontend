"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, Calendar, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginAuditType, UserType } from "@/types/types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useMarketStore } from "@/store/useMarketStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface UserDetailsProps {
  userId: string;
}

export function UserDetails({ userId }: UserDetailsProps) {
  const { user: loggedInUser } = useMarketStore((state) => state);
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  const fetchUser = async () => {
    try {
      toast.loading("Loading user data...");
      const data = await apiFetch(`/users/${userId}`);
      setUser(data);
      console.log("data", data);
      console.log("Fetching user:", userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data.");
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  // Delete user
  const deleteUser = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await apiFetch(`/users/${userId}`, { method: "DELETE" });
      toast.success("User deleted successfully.");
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  // Toggle activation
  const toggleActivation = async () => {
    if (loggedInUser?.id === userId)
      return toast.error("You cannot change your own activation status.");
    const url = user?.activated ? "/auth/deactivate" : "/auth/activate";
    try {
      const data = await apiFetch(`${url}/${userId}`, {
        method: "POST",
      });
      toast.success("User activation status updated.");
      setUser(data.user);
    } catch (error) {
      console.error("Error toggling user activation:", error);
      toast.error("Failed to update activation status.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Profile */}
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <Phone className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">{user.name || "No Name"}</CardTitle>
          <p className="text-muted-foreground">{user.email}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            <Badge variant={user.activated ? "default" : "destructive"}>
              {user.activated ? "Active" : "Inactive"}
            </Badge>
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.city && user.country && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {user.city}, {user.country}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button
              onClick={toggleActivation}
              variant="outline"
              className="w-full bg-transparent"
            >
              {user.activated ? "Deactivate Account" : "Activate Account"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Information & Actions */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Account Information</CardTitle>
            <div className="flex gap-2">
              <Link href={`/dashboard/users/${userId}/edit`}>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              {/* <Button variant="destructive" size="sm" onClick={deleteUser}> */}
              {/*   <Trash2 className="h-4 w-4 mr-2" /> */}
              {/*   Delete */}
              {/* </Button> */}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-card-foreground">User ID</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  {user.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                {" "}
                <h3 className="font-semibold text-card-foreground">
                  Account Created
                </h3>
                <p className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Last Updated
                </h3>
                <p className="text-muted-foreground">
                  {new Date(user.updatedAt!).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">Orders</h3>
                  <Badge variant="outline">{user.orders.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total orders placed by this user
                </p>
                {user.orders.length > 0 && (
                  <Link href={`/dashboard/users/${userId}/orders`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 bg-transparent"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Orders
                    </Button>
                  </Link>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">
                    Addresses
                  </h3>
                  <Badge variant="outline">{user.addresses.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Saved shipping addresses
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 bg-transparent"
                  disabled
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View Addresses
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Login Audits</CardTitle>
            <CardDescription>Login Audits history</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginAuditList audits={user.loginAudits} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoginAuditList({ audits }: { audits?: LoginAuditType[] }) {
  if (!audits || audits.length === 0) {
    return (
      <p className="text-muted-foreground text-sm italic">
        No login audits found
      </p>
    );
  }

  return (
    <ScrollArea className="h-40 rounded-md border p-2">
      <div className="space-y-2">
        {audits.map((audit, idx) => (
          <div key={audit.id}>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted-foreground">
                  {new Date(audit.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">IP:</span> {audit.ip ?? "N/A"}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-xs">
                  {audit.userAgent ?? "Unknown"}
                </p>
              </div>
              <Badge
                variant={audit.success ? "default" : "destructive"}
                className={cn("whitespace-nowrap")}
              >
                {audit.success ? "Success" : "Failed"}
              </Badge>
            </div>
            {idx < audits.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
