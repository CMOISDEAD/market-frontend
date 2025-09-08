"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import type { AddressType } from "@/types/types";

interface AddressCardProps {
  address: AddressType;
  onEdit: (address: AddressType) => void;
  onDelete: (addressId: string) => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{address.label}</h4>
            {address.isDefault && (
              <Badge variant="secondary" className="text-xs">
                Predeterminada
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{address.street}</p>
          <p className="text-sm text-muted-foreground">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-sm text-muted-foreground">{address.country}</p>
          {address.phone && (
            <p className="text-sm text-muted-foreground">
              Tel: {address.phone}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(address.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
