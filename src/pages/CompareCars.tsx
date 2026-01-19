import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Check, Plus, Search, ChevronDown, ArrowLeftRight,
  Gauge, Fuel, Settings, Users, Box, Shield, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { carsData, Car } from "@/data/carsData";

const specCategories = [
  {
    id: "performance",
    title: "Engine & Performance",
    icon: Gauge,
    specs: [
      { key: "engine", label: "Engine" },
      { key: "power", label: "Power" },
      { key: "torque", label: "Torque" },
      { key: "transmission", label: "Transmission" },
      { key: "fuel", label: "Fuel Type" },
    ]
  },
  {
    id: "dimensions",
    title: "Dimensions & Capacity",
    icon: Box,
    specs: [
      { key: "seating", label: "Seating Capacity" },
      { key: "bodyType", label: "Body Type" },
    ]
  },
  {
    id: "ownership",
    title: "Ownership Details",
    icon: Shield,
    specs: [
      { key: "owners", label: "Previous Owners" },
      { key: "insurance", label: "Insurance" },
      { key: "registration", label: "Registration" },
      { key: "mileage", label: "Kilometers Driven" },
    ]
  },
];

const CompareCars = () => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["performance"]);

  const availableCars = useMemo(() => {
    const selectedIds = selectedCars.map(c => c.id);
    return carsData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const notSelected = !selectedIds.includes(car.id);
      return matchesSearch && notSelected;
    });
  }, [searchQuery, selectedCars]);

  const addCar = (car: Car) => {
    if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, car]);
      setShowCarSelector(false);
      setSearchQuery("");
    }
  };

  const removeCar = (carId: number) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getSpecValue = (car: Car, key: string) => {
    const value = car[key as keyof Car];
    if (typeof value === "number") return value.toString();
    if (typeof value === "string") return value;
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return "-";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              <ArrowLeftRight className="w-4 h-4" />
              Car Comparison Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Compare <span className="gradient-text">Cars</span> Side by Side
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select up to 4 cars to compare their specifications, features, and prices. 
              Make an informed decision with our detailed comparison.
            </p>
          </motion.div>

          {/* Car Selection Slots */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, index) => {
              const car = selectedCars[index];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl border-2 border-dashed transition-all ${
                    car ? "border-primary bg-card" : "border-border hover:border-primary/50"
                  }`}
                >
                  {car ? (
                    <div className="p-4">
                      <button
                        onClick={() => removeCar(car.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full aspect-[4/3] object-cover rounded-xl mb-3"
                      />
                      <h3 className="font-bold text-sm line-clamp-1">{car.name}</h3>
                      <p className="text-lg font-bold text-primary mt-1">
                        ${car.price.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">{car.fuel}</Badge>
                        <Badge variant="secondary" className="text-xs">{car.transmission}</Badge>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCarSelector(true)}
                      className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors p-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium">Add Car {index + 1}</span>
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Car Selector Modal */}
          <AnimatePresence>
            {showCarSelector && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowCarSelector(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Select a Car</h2>
                      <button
                        onClick={() => setShowCarSelector(false)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or brand..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {availableCars.slice(0, 12).map((car) => (
                        <button
                          key={car.id}
                          onClick={() => addCar(car)}
                          className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all text-left"
                        >
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-1">{car.name}</h3>
                            <p className="text-primary font-bold text-sm">
                              ${car.price.toLocaleString()}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {availableCars.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No cars found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comparison Table */}
          {selectedCars.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Detailed Comparison
              </h2>

              <div className="space-y-4">
                {specCategories.map((category) => {
                  const Icon = category.icon;
                  const isExpanded = expandedCategories.includes(category.id);
                  
                  return (
                    <div key={category.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-bold">{category.title}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0">
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b border-border">
                                      <th className="text-left py-3 px-4 text-muted-foreground font-medium min-w-[150px]">
                                        Specification
                                      </th>
                                      {selectedCars.map((car) => (
                                        <th key={car.id} className="text-center py-3 px-4 font-medium min-w-[120px]">
                                          {car.brand}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.specs.map((spec, idx) => (
                                      <tr key={spec.key} className={idx % 2 === 0 ? "bg-secondary/30" : ""}>
                                        <td className="py-3 px-4 text-muted-foreground">{spec.label}</td>
                                        {selectedCars.map((car) => (
                                          <td key={car.id} className="py-3 px-4 text-center font-medium">
                                            {getSpecValue(car, spec.key)}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Features Comparison */}
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  <button
                    onClick={() => toggleCategory("features")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-bold">Features</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories.includes("features") ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategories.includes("features") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedCars.map((car) => (
                              <div key={car.id} className="bg-secondary/30 rounded-xl p-4">
                                <h4 className="font-bold mb-3">{car.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {car.features.map((feature, idx) => (
                                    <Badge key={idx} variant="outline" className="gap-1">
                                      <Check className="w-3 h-3 text-green-500" />
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {selectedCars.length < 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-2xl border border-border"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ArrowLeftRight className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Select at least 2 cars to compare</h3>
              <p className="text-muted-foreground mb-6">
                Click "Add Car" above to start comparing specifications
              </p>
              <Button onClick={() => setShowCarSelector(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Car
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompareCars;
