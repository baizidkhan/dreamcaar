import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Car, DollarSign, ChevronDown, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-car.jpg";

const budgetRanges = [
  { label: "Under $10,000", min: 0, max: 10000 },
  { label: "$10,000 - $20,000", min: 10000, max: 20000 },
  { label: "$20,000 - $35,000", min: 20000, max: 35000 },
  { label: "$35,000 - $50,000", min: 35000, max: 50000 },
  { label: "$50,000 - $75,000", min: 50000, max: 75000 },
  { label: "$75,000+", min: 75000, max: 200000 },
];

const brands = [
  "BMW", "Mercedes", "Audi", "Toyota", "Honda", 
  "Ford", "Tesla", "Porsche", "Lexus", "Volkswagen",
  "Hyundai", "Mahindra", "Land Rover"
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"new" | "used">("used");
  const [selectedBudget, setSelectedBudget] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Add car type filter
    params.set("type", activeTab);
    
    // Add brand if selected
    if (selectedBrand) {
      params.set("brand", selectedBrand);
    }
    
    // Add price range if selected
    if (selectedBudget) {
      params.set("minPrice", selectedBudget.min.toString());
      params.set("maxPrice", selectedBudget.max.toString());
    }
    
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Luxury car" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
          >
            🚗 India's #1 Trusted Car Marketplace
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
            Find Your{" "}
            <span className="gradient-text">Perfect</span>
            <br />
            Dream Car
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Discover certified pre-owned vehicles with transparent pricing, 
            verified sellers, and comprehensive inspection reports.
          </p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card/95 backdrop-blur-xl rounded-2xl p-6 shadow-card-hover border border-border/50"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === "new"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                New Cars
              </button>
              <button
                onClick={() => setActiveTab("used")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === "used"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Used Cars
              </button>
            </div>

            {/* Tab Description */}
            <motion.p 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-4"
            >
              {activeTab === "new" 
                ? "Browse brand new cars with manufacturer warranty and latest features"
                : "Find certified pre-owned cars with verified history and great savings"
              }
            </motion.p>

            {/* Search Filters */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Budget Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowBudgetDropdown(!showBudgetDropdown);
                    setShowBrandDropdown(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className={selectedBudget ? "text-foreground" : "text-muted-foreground"}>
                      {selectedBudget?.label || "Select Budget"}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBudgetDropdown ? "rotate-180" : ""}`} />
                </button>
                
                {showBudgetDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-card-hover overflow-hidden z-20"
                  >
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget.label}
                        onClick={() => {
                          setSelectedBudget(budget);
                          setShowBudgetDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors ${
                          selectedBudget?.label === budget.label ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Brand Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowBrandDropdown(!showBrandDropdown);
                    setShowBudgetDropdown(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    <span className={selectedBrand ? "text-foreground" : "text-muted-foreground"}>
                      {selectedBrand || "Select Brand"}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBrandDropdown ? "rotate-180" : ""}`} />
                </button>
                
                {showBrandDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-card-hover overflow-hidden z-20 max-h-60 overflow-y-auto"
                  >
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setSelectedBrand(brand);
                          setShowBrandDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors ${
                          selectedBrand === brand ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="h-auto py-3 px-6 rounded-xl font-semibold text-base gap-2"
              >
                <Search className="w-5 h-5" />
                Search {activeTab === "new" ? "New" : "Used"} Cars
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">50K+</span>
                <span className="text-sm text-muted-foreground">Verified Cars</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">10K+</span>
                <span className="text-sm text-muted-foreground">Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">150+</span>
                <span className="text-sm text-muted-foreground">Cities</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
