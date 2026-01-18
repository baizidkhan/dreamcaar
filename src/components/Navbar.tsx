import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Car, User, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Buy Cars", href: "#" },
  { label: "Sell Car", href: "#" },
  { label: "Compare", href: "#" },
  { label: "EMI Calculator", href: "#" },
  { label: "News", href: "#" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-heading">
            Car<span className="text-primary">Vault</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <Button variant="outline" size="sm" className="gap-2">
            <User className="w-4 h-4" />
            Login
          </Button>
          <Button size="sm">Post Your Car</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background border-b border-border"
        >
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <Button variant="outline" className="w-full gap-2">
                <User className="w-4 h-4" />
                Login
              </Button>
              <Button className="w-full">Post Your Car</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
