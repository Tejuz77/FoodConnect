import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FoodCard, FoodListing } from "@/components/FoodCard";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  MapPin,
  List,
  Map,
  LogOut,
  Bell,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NGODashboard = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for available listings
  const [listings, setListings] = useState<FoodListing[]>([
    {
      id: "1",
      foodType: "Dal Rice & Sabzi",
      quantity: "15 kg",
      servings: 50,
      preparedAt: "12:00 PM",
      expiresAt: "6:00 PM",
      location: "Andheri East, Mumbai",
      distance: "1.2 km",
      provider: "ABC Hostel",
      priority: "high",
      status: "available",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      foodType: "Veg Biryani",
      quantity: "10 kg",
      servings: 35,
      preparedAt: "1:00 PM",
      expiresAt: "7:00 PM",
      location: "Bandra West, Mumbai",
      distance: "2.5 km",
      provider: "Green Leaf Canteen",
      priority: "medium",
      status: "available",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      foodType: "Roti & Mixed Curry",
      quantity: "8 kg",
      servings: 30,
      preparedAt: "11:30 AM",
      expiresAt: "4:00 PM",
      location: "Powai, Mumbai",
      distance: "3.8 km",
      provider: "Tech Park Cafeteria",
      priority: "high",
      status: "available",
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=300&fit=crop",
    },
    {
      id: "4",
      foodType: "Idli Sambar",
      quantity: "5 kg",
      servings: 25,
      preparedAt: "8:00 AM",
      expiresAt: "12:00 PM",
      location: "Kurla, Mumbai",
      distance: "4.2 km",
      provider: "South Indian Kitchen",
      priority: "low",
      status: "available",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
    },
  ]);

  const stats = [
    { icon: CheckCircle, label: "Collected Today", value: "5", color: "text-success" },
    { icon: Clock, label: "Pending Pickup", value: "2", color: "text-warning" },
    { icon: Users, label: "Meals Distributed", value: "180", color: "text-primary" },
  ];

  const handleAccept = (id: string) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: "accepted" as const } : l
    ));
    toast({
      title: "Food Request Accepted!",
      description: "The provider has been notified. Please collect within the specified time.",
    });
  };

  const availableListings = listings.filter(l => l.status === "available");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">FoodConnect</span>
                <Badge variant="warning" className="ml-2">NGO</Badge>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-urgent rounded-full animate-pulse" />
              </button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome, Helping Hands NGO! 👋</h1>
          <p className="text-muted-foreground">Find and collect surplus food from nearby providers.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="default" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Urgent Alert */}
        <Card variant="bordered" className="mb-8 border-urgent/30 bg-urgent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-urgent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-urgent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">2 High Priority Pickups Nearby!</p>
                <p className="text-sm text-muted-foreground">Food expiring in less than 4 hours. Act now!</p>
              </div>
              <Button variant="destructive" size="sm">View Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by food type, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "map" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Available Food Count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Available Near You 
            <Badge variant="soft" className="ml-2">{availableListings.length}</Badge>
          </h2>
          <p className="text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 inline mr-1" />
            Mumbai, Maharashtra
          </p>
        </div>

        {/* Listings View */}
        {viewMode === "list" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableListings.map((listing) => (
              <FoodCard 
                key={listing.id} 
                listing={listing} 
                onAccept={handleAccept}
              />
            ))}
          </div>
        ) : (
          <Card variant="bordered" className="h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Map View</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Connect Google Maps API to see food listings on an interactive map.
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default NGODashboard;
