import { Link } from "react-router-dom";
import { Leaf, Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Food<span className="text-primary">Connect</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm">
              Connecting surplus food with those in need. Together, we can reduce waste and fight hunger.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Our Impact</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Join Us</Link></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-semibold mb-4">For Partners</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/auth?role=provider" className="hover:text-primary transition-colors">Food Providers</Link></li>
              <li><Link to="/auth?role=ngo" className="hover:text-primary transition-colors">NGOs & Volunteers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@foodconnect.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © 2024 FoodConnect. Made with <Heart className="w-4 h-4 inline text-urgent" /> in India
          </p>
          <div className="flex items-center gap-6 text-sm text-background/50">
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
