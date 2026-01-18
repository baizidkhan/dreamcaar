import { motion } from "framer-motion";
import { Car, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  "Quick Links": ["Buy Car", "Sell Car", "Compare Cars", "Car Reviews", "New Cars", "Used Cars"],
  "Popular Brands": ["BMW", "Mercedes", "Audi", "Toyota", "Honda", "Tesla"],
  "Help & Support": ["FAQs", "Contact Us", "Terms of Service", "Privacy Policy", "Sitemap"],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-primary/5 rounded-2xl border border-primary/10"
        >
          <div>
            <h3 className="text-xl font-bold font-heading mb-2">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get the latest deals and automotive news delivered to your inbox
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs"
            />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-heading">
                Car<span className="text-primary">Vault</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              India's most trusted car marketplace. Buy and sell verified pre-owned cars 
              with complete transparency and zero hassle.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+911234567890" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 1234 567 890
              </a>
              <a href="mailto:support@carvault.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                support@carvault.com
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra, India
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 CarVault. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
