import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Lightbulb,
  Target,
  Users,
  ArrowRight,
  Building,
  HandHeart,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";

const About = () => {
  const team = [
    { role: "Technology", description: "Building the platform that connects surplus food with those in need." },
    { role: "Partnerships", description: "Onboarding food providers and NGOs across India." },
    { role: "Operations", description: "Ensuring smooth coordination between all stakeholders." },
    { role: "Impact", description: "Measuring and maximizing our social and environmental impact." },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Priority",
      description: "Our AI analyzes food freshness and assigns urgency levels for optimal distribution.",
    },
    {
      icon: Clock,
      title: "Real-Time Matching",
      description: "Instant notifications connect surplus food with nearby volunteers within minutes.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Strict quality guidelines ensure only safe, consumable food is distributed.",
    },
    {
      icon: Target,
      title: "Impact Tracking",
      description: "Track every meal rescued and see your contribution to reducing food waste.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="soft" className="mb-4">About FoodConnect</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              On a Mission to End{" "}
              <span className="text-primary">Food Waste</span> and{" "}
              <span className="text-accent">Hunger</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              India wastes nearly 40% of its food while millions go hungry. 
              FoodConnect is changing this by creating a real-time bridge between 
              surplus food and those who need it most.
            </p>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="bg-muted/30 py-20 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="destructive" className="mb-4">The Problem</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  40% of Food is Wasted While Millions Go Hungry
                </h2>
                <p className="text-muted-foreground mb-6">
                  Every day, tons of perfectly good food from hostels, canteens, events, 
                  and households ends up in landfills. Meanwhile, 190 million Indians 
                  don't have enough to eat.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-urgent" />
                    68 million tonnes of food wasted annually in India
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-urgent" />
                    Worth ₹92,000 crores of economic loss
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-urgent" />
                    Contributes to 6% of global greenhouse emissions
                  </li>
                </ul>
              </div>
              
              <div>
                <Badge variant="success" className="mb-4">Our Solution</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Real-Time Food Rescue Network
                </h2>
                <p className="text-muted-foreground mb-6">
                  FoodConnect is a technology platform that instantly connects surplus 
                  food with nearby NGOs and volunteers. Our AI-powered system ensures 
                  food reaches those in need before it expires.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">For Food Providers</h4>
                      <p className="text-sm text-muted-foreground">Post surplus food in seconds and make a difference</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <HandHeart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">For NGOs & Volunteers</h4>
                      <p className="text-sm text-muted-foreground">Get notified about nearby food and collect instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="soft" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Technology Powering Change
            </h2>
            <p className="text-muted-foreground">
              Our platform combines cutting-edge technology with community action.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={feature.title} variant="elevated" className="text-center p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mx-auto">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="soft" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="bordered" className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Compassion</h3>
              <p className="text-muted-foreground">
                Every meal matters. We believe no one should go hungry when food is available.
              </p>
            </Card>
            
            <Card variant="bordered" className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Technology can solve age-old problems. We use AI and real-time data to maximize impact.
              </p>
            </Card>
            
            <Card variant="bordered" className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground">
                Change happens together. We're building a network of caring individuals and organizations.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <Card variant="elevated" className="gradient-hero text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Whether you have surplus food to share or want to help distribute it, 
              join FoodConnect today and be part of the solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  Join FoodConnect
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
