import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Search, Filter, X, Heart, MapPin, Fuel, Gauge, Calendar, 
  Shield, ChevronDown, Grid3X3, List, SlidersHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { carsData, brands, bodyTypes, fuelTypes, transmissionTypes, locations } from "@/data/carsData";

const CarsListing = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  
  // Get URL params
  const urlBrand = searchParams.get("brand");
  const urlBodyType = searchParams.get("bodyType");
  const urlType = searchParams.get("type"); // "new" or "used"
  const urlMinPrice = searchParams.get("minPrice");
  const urlMaxPrice = searchParams.get("maxPrice");
  
  // Filter states - initialize from URL params
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    urlBrand ? [urlBrand] : []
  );
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>(
    urlBodyType ? [urlBodyType] : []
  );
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([
    urlMinPrice ? parseInt(urlMinPrice) : 0,
    urlMaxPrice ? parseInt(urlMaxPrice) : 100000
  ]);
  const [yearRange, setYearRange] = useState([2018, 2024]);
  const [carType, setCarType] = useState<"all" | "new" | "used">(
    urlType === "new" || urlType === "used" ? urlType : "all"
  );

  const toggleFilter = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSelectedTransmission([]);
    setSelectedLocations([]);
    setPriceRange([0, 100000]);
    setYearRange([2018, 2024]);
    setSearchQuery("");
    setCarType("all");
  };

  const filteredCars = useMemo(() => {
    let cars = [...carsData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      cars = cars.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      cars = cars.filter(car => selectedBrands.includes(car.brand));
    }

    // Body type filter
    if (selectedBodyTypes.length > 0) {
      cars = cars.filter(car => selectedBodyTypes.includes(car.bodyType));
    }

    // Fuel type filter
    if (selectedFuelTypes.length > 0) {
      cars = cars.filter(car => selectedFuelTypes.includes(car.fuel));
    }

    // Transmission filter
    if (selectedTransmission.length > 0) {
      cars = cars.filter(car => selectedTransmission.includes(car.transmission));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      cars = cars.filter(car => selectedLocations.includes(car.location));
    }

    // Price filter
    cars = cars.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);

    // Year filter
    cars = cars.filter(car => car.year >= yearRange[0] && car.year <= yearRange[1]);

    // Sorting
    switch (sortBy) {
      case "price-low":
        cars.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        cars.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        cars.sort((a, b) => b.year - a.year);
        break;
      case "featured":
      default:
        cars.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return cars;
  }, [searchQuery, selectedBrands, selectedBodyTypes, selectedFuelTypes, selectedTransmission, selectedLocations, priceRange, yearRange, sortBy]);

  const activeFiltersCount = selectedBrands.length + selectedBodyTypes.length + selectedFuelTypes.length + selectedTransmission.length + selectedLocations.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-heading">
                {selectedBrands.length === 1 ? `${selectedBrands[0]} Cars` : 
                 selectedBodyTypes.length === 1 ? `${selectedBodyTypes[0]} Cars` : 
                 "All Cars"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredCars.length} cars found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
              </select>

              {/* View Toggle */}
              <div className="hidden md:flex border border-input rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1">{activeFiltersCount}</Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-72 shrink-0`}>
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={100000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <h3 className="font-semibold mb-3">Year</h3>
                  <Slider
                    value={yearRange}
                    onValueChange={setYearRange}
                    min={2015}
                    max={2024}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-3">Brand</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <h3 className="font-semibold mb-3">Body Type</h3>
                  <div className="space-y-2">
                    {bodyTypes.filter(bt => bt.count > 0).map((type) => (
                      <label key={type.name} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedBodyTypes.includes(type.name)}
                          onCheckedChange={() => toggleFilter(type.name, selectedBodyTypes, setSelectedBodyTypes)}
                        />
                        <span className="text-sm">{type.icon} {type.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">({type.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <h3 className="font-semibold mb-3">Fuel Type</h3>
                  <div className="space-y-2">
                    {fuelTypes.map((fuel) => (
                      <label key={fuel} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedFuelTypes.includes(fuel)}
                          onCheckedChange={() => toggleFilter(fuel, selectedFuelTypes, setSelectedFuelTypes)}
                        />
                        <span className="text-sm">{fuel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h3 className="font-semibold mb-3">Transmission</h3>
                  <div className="space-y-2">
                    {transmissionTypes.map((trans) => (
                      <label key={trans} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedTransmission.includes(trans)}
                          onCheckedChange={() => toggleFilter(trans, selectedTransmission, setSelectedTransmission)}
                        />
                        <span className="text-sm">{trans}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-3">Location</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {locations.map((loc) => (
                      <label key={loc} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedLocations.includes(loc)}
                          onCheckedChange={() => toggleFilter(loc, selectedLocations, setSelectedLocations)}
                        />
                        <span className="text-sm">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Car Grid */}
            <div className="flex-1">
              {filteredCars.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No cars found matching your criteria</p>
                  <Button onClick={clearAllFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {filteredCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/car/${car.id}`}>
                        <div className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 ${viewMode === "list" ? "flex" : ""}`}>
                          {/* Image */}
                          <div className={`relative overflow-hidden ${viewMode === "list" ? "w-72 shrink-0" : "aspect-[4/3]"}`}>
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                              {car.featured && (
                                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                              )}
                              {car.verified && (
                                <Badge variant="secondary" className="gap-1">
                                  <Shield className="w-3 h-3" /> Verified
                                </Badge>
                              )}
                            </div>

                            <button 
                              onClick={(e) => e.preventDefault()}
                              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                            </button>

                            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                              Save ${(car.originalPrice - car.price).toLocaleString()}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                              {car.name}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {car.year}
                              <span className="mx-1">•</span>
                              <MapPin className="w-3.5 h-3.5" />
                              {car.location.split(",")[0]}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                <Fuel className="w-3 h-3" />
                                {car.fuel}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                <Gauge className="w-3 h-3" />
                                {car.mileage}
                              </span>
                              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                {car.transmission}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                              <div>
                                <span className="text-xs text-muted-foreground line-through">
                                  ${car.originalPrice.toLocaleString()}
                                </span>
                                <div className="text-xl font-bold text-primary">
                                  ${car.price.toLocaleString()}
                                </div>
                              </div>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarsListing;
