import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, MapPin, Users, Utensils } from "lucide-react";

export interface FoodListing {
  id: string;
  foodType: string;
  quantity: string;
  servings: number;
  preparedAt: string;
  expiresAt: string;
  location: string;
  distance?: string;
  provider: string;
  priority: "high" | "medium" | "low";
  status: "available" | "accepted" | "collected";
  image?: string;
}

interface FoodCardProps {
  listing: FoodListing;
  showActions?: boolean;
  onAccept?: (id: string) => void;
}

export function FoodCard({ listing, showActions = true, onAccept }: FoodCardProps) {
  const priorityVariant = {
    high: "urgent" as const,
    medium: "warning" as const,
    low: "success" as const,
  };

  const statusVariant = {
    available: "success" as const,
    accepted: "warning" as const,
    collected: "default" as const,
  };

  const statusLabel = {
    available: "Available",
    accepted: "Accepted",
    collected: "Collected",
  };

  return (
    <Card variant="elevated" className="overflow-hidden group">
      {listing.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.foodType}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={priorityVariant[listing.priority]}>
              {listing.priority.toUpperCase()} Priority
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant={statusVariant[listing.status]}>
              {statusLabel[listing.status]}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{listing.foodType}</h3>
            <p className="text-sm text-muted-foreground">by {listing.provider}</p>
          </div>
          {!listing.image && (
            <Badge variant={priorityVariant[listing.priority]}>
              {listing.priority.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Utensils className="w-4 h-4 text-primary" />
            <span>{listing.quantity}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{listing.servings} servings</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-warning" />
            <span>Expires: {listing.expiresAt}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{listing.distance || listing.location}</span>
          </div>
        </div>
      </CardContent>

      {showActions && listing.status === "available" && (
        <CardFooter className="pt-2">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={() => onAccept?.(listing.id)}
          >
            Accept & Collect
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
