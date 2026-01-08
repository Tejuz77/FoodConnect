import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Users,
  MapPin,
  Clock,
  Heart,
  Utensils,
  Building,
  HandHeart,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const stats = [
    { icon: Utensils, value: "50,000+", label: "Meals Rescued", trend: "+12% this month" },
    { icon: Users, value: "500+", label: "Active Partners", trend: "+8% this month" },
    { icon: MapPin, value: "25", label: "Cities Covered", trend: "Growing" },
    { icon: Leaf, value: "120 tons", label: "CO₂ Saved", trend: "+15% this month" },
  ];

  const howItWorks = [
    {
      step: 1,
      icon: Building,
      title: "Providers Post Surplus",
      description: "Hostels, canteens, and event organizers post details about surplus food in seconds.",
    },
    {
      step: 2,
      icon: Sparkles,
      title: "AI Analyzes Freshness",
      description: "Our AI instantly assesses food quality and assigns priority for urgent pickups.",
    },
    {
      step: 3,
      icon: HandHeart,
      title: "NGOs Get Notified",
      description: "Nearby volunteers and NGOs receive real-time alerts about available food.",
    },
    {
      step: 4,
      icon: Heart,
      title: "Food Reaches Those in Need",
      description: "Collected food is distributed to communities fighting hunger.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <Badge variant="soft" className="px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                Fighting Food Waste in India
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Connect Surplus Food with{" "}
                <span className="text-primary">Those in Need</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                FoodConnect bridges the gap between food providers and NGOs in real-time. 
                Together, we're reducing waste and fighting hunger across India.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/auth?mode=signup">
                    Start Donating Food
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/auth?mode=signup&role=ngo">
                    Join as NGO/Volunteer
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">500+</span> partners already making a difference
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Volunteers distributing food in India"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">50K+</p>
                    <p className="text-xs text-muted-foreground">Meals Saved</p>
                  </div>
                </div>
              </div>
              
              {/* Urgent Alert Card */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border/50 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-urgent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-urgent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Urgent</p>
                    <p className="text-xs text-muted-foreground">3 pickups nearby</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="soft" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Steps to Save Food
            </h2>
            <p className="text-muted-foreground">
              Our platform makes it effortless to connect surplus food with people who need it most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <Card
                key={item.step}
                variant="elevated"
                className="text-center p-6 group animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}
              >
                <CardContent className="p-0 space-y-4">
                  <div className="relative inline-flex">
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto group-hover:shadow-glow transition-shadow">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-primary-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-primary-foreground rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Whether you have surplus food to share or want to help distribute it, 
            join FoodConnect today and be part of the solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="xl" asChild>
              <Link to="/auth?mode=signup&role=provider">
                I Have Surplus Food
              </Link>
            </Button>
            <Button 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/auth?mode=signup&role=ngo">
                I Want to Help Distribute
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
