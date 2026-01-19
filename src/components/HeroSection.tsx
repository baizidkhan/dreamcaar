import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, DollarSign, ChevronDown, Sparkles, TrendingUp, MapPin, Fuel, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-car.jpg";
import { carsData } from "@/data/carsData";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return carsData
      .filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.bodyType.toLowerCase().includes(query) ||
        car.fuel.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query) ||
        car.features.some(f => f.toLowerCase().includes(query))
      )
      .slice(0, 6); // Limit to 6 results
  }, [searchQuery]);

  // Get search suggestions (brands, body types, features)
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const allSuggestions: { type: string; value: string; icon: string }[] = [];
    
    // Matching brands
    brands.filter(b => b.toLowerCase().includes(query))
      .forEach(b => allSuggestions.push({ type: "Brand", value: b, icon: "🏷️" }));
    
    // Matching body types
    const bodyTypes = [...new Set(carsData.map(c => c.bodyType))];
    bodyTypes.filter(bt => bt.toLowerCase().includes(query))
      .forEach(bt => allSuggestions.push({ type: "Category", value: bt, icon: "🚗" }));
    
    // Matching locations
    const locations = [...new Set(carsData.map(c => c.location.split(",")[0]))];
    locations.filter(l => l.toLowerCase().includes(query))
      .forEach(l => allSuggestions.push({ type: "Location", value: l, icon: "📍" }));
    
    return allSuggestions.slice(0, 4);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
    } else {
      handleFilterSearch();
    }
    setShowSearchResults(false);
  };

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
    setShowSearchResults(false);
  };

  const handleSuggestionClick = (suggestion: { type: string; value: string }) => {
    if (suggestion.type === "Brand") {
      navigate(`/cars?brand=${encodeURIComponent(suggestion.value)}`);
    } else if (suggestion.type === "Category") {
      navigate(`/cars?bodyType=${encodeURIComponent(suggestion.value)}`);
    } else if (suggestion.type === "Location") {
      navigate(`/cars?search=${encodeURIComponent(suggestion.value)}`);
    }
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleFilterSearch = () => {
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

            {/* Live Search Input */}
            <div className="relative mb-4" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search cars, brands, features, locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                  className="w-full pl-12 pr-10 py-3 h-auto rounded-xl bg-secondary border-border focus:border-primary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && (searchResults.length > 0 || suggestions.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-card-hover overflow-hidden z-30 max-h-[400px] overflow-y-auto"
                  >
                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="p-2 border-b border-border">
                        <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">Suggestions</p>
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={`${suggestion.type}-${suggestion.value}-${idx}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <span className="text-lg">{suggestion.icon}</span>
                            <div className="text-left">
                              <p className="font-medium text-foreground">{suggestion.value}</p>
                              <p className="text-xs text-muted-foreground">{suggestion.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Car Results */}
                    {searchResults.length > 0 && (
                      <div className="p-2">
                        <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">Cars</p>
                        {searchResults.map((car) => (
                          <button
                            key={car.id}
                            onClick={() => handleCarClick(car.id)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 text-left">
                              <p className="font-medium text-foreground line-clamp-1">{car.name}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {car.year}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Fuel className="w-3 h-3" />
                                  {car.fuel}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {car.location.split(",")[0]}
                                </span>
                              </div>
                            </div>
                            <p className="font-bold text-primary">${car.price.toLocaleString()}</p>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* View All Results */}
                    {searchQuery.trim() && (
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full p-3 text-center text-primary font-medium hover:bg-primary/10 border-t border-border transition-colors"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                onClick={handleFilterSearch}
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
