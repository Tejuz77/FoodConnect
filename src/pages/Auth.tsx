import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Building, HandHeart, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "signup";
type UserRole = "provider" | "ngo" | "volunteer";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState<AuthMode>(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [role, setRole] = useState<UserRole | null>(
    searchParams.get("role") === "ngo" ? "ngo" : 
    searchParams.get("role") === "provider" ? "provider" : null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === "login") {
        await signIn(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        navigate("/");
      } else {
        if (!role) {
          toast({
            title: "Please select a role",
            description: "Choose whether you're a food provider or NGO/volunteer.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        await signUp(formData.email, formData.password, role, formData.name);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        navigate(role === "provider" ? "/provider" : "/ngo");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-60 h-60 border border-primary-foreground rounded-full" />
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-primary-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 border border-primary-foreground rounded-full" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-20">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">FoodConnect</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-primary-foreground mb-6 leading-tight">
            Join the movement to end food waste and hunger
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Connect with food providers and NGOs in your area. Together, we can ensure no meal goes to waste.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <span>500+ Food Providers</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <HandHeart className="w-5 h-5" />
              </div>
              <span>200+ NGOs & Volunteers</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FoodConnect</span>
          </div>
          
          <Card variant="bordered" className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1 px-0 lg:px-6">
              <CardTitle className="text-2xl font-bold">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription>
                {mode === "login" 
                  ? "Enter your credentials to access your account" 
                  : "Join FoodConnect to start making a difference"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-0 lg:px-6">
              {/* Role Selection for Signup */}
              {mode === "signup" && !role && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">I want to join as:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRole("provider")}
                      className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <Building className="w-7 h-7 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground">Food Provider</p>
                      <p className="text-xs text-muted-foreground mt-1">Hostel, Canteen, Events</p>
                    </button>
                    
                    <button
                      onClick={() => setRole("ngo")}
                      className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <HandHeart className="w-7 h-7 text-accent" />
                      </div>
                      <p className="font-semibold text-foreground">NGO / Volunteer</p>
                      <p className="text-xs text-muted-foreground mt-1">Collect & Distribute</p>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Auth Form */}
              {(mode === "login" || role) && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="organization">
                          {role === "provider" ? "Organization Name" : "NGO / Organization Name"}
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="organization"
                            name="organization"
                            placeholder={role === "provider" ? "ABC Hostel" : "Helping Hands NGO"}
                            value={formData.organization}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {mode === "login" && (
                    <div className="flex justify-end">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                  </Button>
                  
                  {mode === "signup" && role && (
                    <button
                      type="button"
                      onClick={() => setRole(null)}
                      className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Change role
                    </button>
                  )}
                </form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => {
                      setMode(mode === "login" ? "signup" : "login");
                      if (mode === "login") setRole(null);
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
