import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import {
  Utensils,
  Users,
  Leaf,
  TrendingUp,
  MapPin,
  Building,
  HandHeart,
  ArrowUpRight,
} from "lucide-react";

const Impact = () => {
  const mainStats = [
    { icon: Utensils, value: "52,480", label: "Meals Rescued", trend: "+12.5% this month" },
    { icon: Users, value: "8,200+", label: "People Fed", trend: "+18% this month" },
    { icon: Leaf, value: "126 tons", label: "CO₂ Reduced", trend: "+15% this month" },
    { icon: Building, value: "542", label: "Partner Organizations", trend: "+8% this month" },
  ];

  const cityData = [
    { city: "Mumbai", meals: 18500, partners: 145, co2: 42 },
    { city: "Delhi", meals: 12200, partners: 98, co2: 28 },
    { city: "Bangalore", meals: 8900, partners: 76, co2: 21 },
    { city: "Chennai", meals: 6400, partners: 54, co2: 15 },
    { city: "Hyderabad", meals: 4200, partners: 42, co2: 10 },
    { city: "Pune", meals: 2280, partners: 28, co2: 5 },
  ];

  const recentCollections = [
    {
      id: 1,
      food: "Rice & Dal (25kg)",
      provider: "Grand Hotel Mumbai",
      ngo: "Akshaya Patra",
      servings: 85,
      time: "2 hours ago",
    },
    {
      id: 2,
      food: "Biryani (15kg)",
      provider: "Tech Park Canteen",
      ngo: "Feeding India",
      servings: 52,
      time: "3 hours ago",
    },
    {
      id: 3,
      food: "Mixed Vegetables (10kg)",
      provider: "ABC Hostel",
      ngo: "Robin Hood Army",
      servings: 40,
      time: "4 hours ago",
    },
    {
      id: 4,
      food: "Chapati & Curry (20kg)",
      provider: "City Convention Center",
      ngo: "No Food Waste",
      servings: 70,
      time: "5 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="soft" className="mb-4">Impact Dashboard</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Together, We're Making a{" "}
              <span className="text-primary">Difference</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Track our collective impact in reducing food waste and fighting hunger across India.
            </p>
          </div>
          
          {/* Main Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {mainStats.map((stat, i) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                trend={stat.trend}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>

        {/* City-wise Impact */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">City-wise Impact</h2>
              <p className="text-muted-foreground">Our reach across major Indian cities</p>
            </div>
            <Badge variant="outline">
              <MapPin className="w-4 h-4 mr-1" />
              25 Cities Active
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityData.map((city, i) => (
              <Card 
                key={city.city} 
                variant="elevated" 
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {city.city}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-success" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{city.meals.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Meals</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{city.partners}</p>
                      <p className="text-xs text-muted-foreground">Partners</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{city.co2}t</p>
                      <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Collections */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Recent Collections</h2>
              <p className="text-muted-foreground">Live feed of successful food rescues</p>
            </div>
            <Badge variant="success">
              <TrendingUp className="w-4 h-4 mr-1" />
              Live
            </Badge>
          </div>
          
          <Card variant="bordered">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentCollections.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.food}</p>
                        <p className="text-sm text-muted-foreground">
                          <Building className="w-3 h-3 inline mr-1" />
                          {item.provider}
                          <span className="mx-2">→</span>
                          <HandHeart className="w-3 h-3 inline mr-1" />
                          {item.ngo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="soft">{item.servings} servings</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Environmental Impact */}
        <section className="container mx-auto px-4">
          <Card variant="elevated" className="gradient-hero text-primary-foreground overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-40 h-40 border border-primary-foreground rounded-full" />
              <div className="absolute bottom-10 left-10 w-60 h-60 border border-primary-foreground rounded-full" />
            </div>
            
            <CardContent className="p-8 md:p-12 relative">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 mb-4">
                    <Leaf className="w-4 h-4 mr-1" />
                    Environmental Impact
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    Saving the Planet, One Meal at a Time
                  </h2>
                  <p className="text-primary-foreground/80 mb-6">
                    Every meal rescued not only feeds someone in need but also prevents greenhouse gas 
                    emissions from food waste in landfills. Together, we're making a measurable 
                    difference for our planet.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-primary-foreground/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl font-bold mb-2">126</p>
                    <p className="text-sm text-primary-foreground/80">Tons CO₂ Prevented</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl font-bold mb-2">48K</p>
                    <p className="text-sm text-primary-foreground/80">kg Food Saved</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl font-bold mb-2">2.4M</p>
                    <p className="text-sm text-primary-foreground/80">Liters Water Saved</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-2xl p-6 text-center">
                    <p className="text-4xl font-bold mb-2">15K</p>
                    <p className="text-sm text-primary-foreground/80">Trees Equivalent</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Impact;
