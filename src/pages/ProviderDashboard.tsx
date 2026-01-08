import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FoodCard, FoodListing } from "@/components/FoodCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Leaf,
  Plus,
  Clock,
  MapPin,
  Utensils,
  Users,
  LogOut,
  Bell,
  CheckCircle,
  Timer,
  Package,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProviderDashboard = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    servings: "",
    preparedAt: "",
    expiresIn: "",
    location: "",
    notes: "",
  });

  // Mock data for listings
  const [listings] = useState<FoodListing[]>([
    {
      id: "1",
      foodType: "Dal Rice & Sabzi",
      quantity: "15 kg",
      servings: 50,
      preparedAt: "12:00 PM",
      expiresAt: "6:00 PM",
      location: "Andheri East, Mumbai",
      provider: "ABC Hostel",
      priority: "high",
      status: "available",
    },
    {
      id: "2",
      foodType: "Biryani",
      quantity: "10 kg",
      servings: 35,
      preparedAt: "1:00 PM",
      expiresAt: "7:00 PM",
      location: "Andheri East, Mumbai",
      provider: "ABC Hostel",
      priority: "medium",
      status: "accepted",
    },
    {
      id: "3",
      foodType: "Roti & Curry",
      quantity: "8 kg",
      servings: 30,
      preparedAt: "11:00 AM",
      expiresAt: "3:00 PM",
      location: "Andheri East, Mumbai",
      provider: "ABC Hostel",
      priority: "low",
      status: "collected",
    },
  ]);

  const stats = [
    { icon: Package, label: "Total Posts", value: "24", color: "text-primary" },
    { icon: CheckCircle, label: "Collected", value: "18", color: "text-success" },
    { icon: Timer, label: "Pending", value: "3", color: "text-warning" },
    { icon: Users, label: "Meals Served", value: "720", color: "text-accent" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Food Posted Successfully!",
      description: "Nearby NGOs have been notified about your surplus food.",
    });
    setShowForm(false);
    setFormData({
      foodType: "",
      quantity: "",
      servings: "",
      preparedAt: "",
      expiresIn: "",
      location: "",
      notes: "",
    });
  };

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
                <Badge variant="soft" className="ml-2">Provider</Badge>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-urgent rounded-full" />
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome, ABC Hostel! 👋</h1>
          <p className="text-muted-foreground">Manage your surplus food donations and track their impact.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="default" className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
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

        {/* Post Food Button */}
        {!showForm && (
          <Button 
            variant="hero" 
            size="lg" 
            className="mb-8"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Post Surplus Food
          </Button>
        )}

        {/* Post Food Form */}
        {showForm && (
          <Card variant="elevated" className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Post Surplus Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foodType">Food Type</Label>
                    <Input
                      id="foodType"
                      placeholder="e.g., Dal Rice, Biryani, Roti Sabzi"
                      value={formData.foodType}
                      onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 10 kg, 5 containers"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="servings">Estimated Servings</Label>
                    <Input
                      id="servings"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preparedAt">Preparation Time</Label>
                    <Input
                      id="preparedAt"
                      type="time"
                      value={formData.preparedAt}
                      onChange={(e) => setFormData({ ...formData, preparedAt: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiresIn">Best Before (Hours)</Label>
                    <Select
                      value={formData.expiresIn}
                      onValueChange={(value) => setFormData({ ...formData, expiresIn: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter address"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or dietary information..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" variant="hero" size="lg">
                    Post Food
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Listings */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Your Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <FoodCard key={listing.id} listing={listing} showActions={false} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
