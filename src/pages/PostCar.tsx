import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Car, Camera, MapPin, Fuel, Gauge, Calendar, Shield, DollarSign,
  Users, Palette, FileText, Sparkles, ChevronRight, ChevronLeft,
  Check, Plus, X, Upload, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCarContext } from "@/context/CarContext";
import { brands, fuelTypes, transmissionTypes, locations } from "@/data/carsData";
import { toast } from "@/hooks/use-toast";

const bodyTypeOptions = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Pickup", "Van", "Wagon"];

const featureOptions = [
  "Sunroof", "Leather Seats", "360 Camera", "Wireless Charging", "Apple CarPlay",
  "Android Auto", "Cruise Control", "Heated Seats", "Ventilated Seats", "LED Headlights",
  "Panoramic Sunroof", "Keyless Entry", "Push Start", "Rain Sensing Wipers",
  "Rear Parking Sensors", "Front Parking Sensors", "Touchscreen Infotainment",
  "Navigation System", "Bluetooth", "USB Ports", "Premium Audio", "Ambient Lighting",
  "Memory Seats", "Power Tailgate", "Hill Assist", "Lane Assist", "Blind Spot Monitor"
];

const steps = [
  { id: 1, label: "Basic Info", icon: Car },
  { id: 2, label: "Details", icon: FileText },
  { id: 3, label: "Features & Photos", icon: Camera },
  { id: 4, label: "Review", icon: Check },
];

const PostCar = () => {
  const navigate = useNavigate();
  const { addCar } = useCarContext();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2024);
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [fuel, setFuel] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [color, setColor] = useState("");
  const [owners, setOwners] = useState(1);
  const [insurance, setInsurance] = useState("");
  const [registration, setRegistration] = useState("");
  const [engine, setEngine] = useState("");
  const [power, setPower] = useState("");
  const [torque, setTorque] = useState("");
  const [seating, setSeating] = useState(5);
  const [description, setDescription] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [sellerName, setSellerName] = useState("");
  const [sellerType, setSellerType] = useState<"Dealer" | "Individual">("Individual");

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const addImageUrl = () => {
    if (imageUrl.trim() && !imageUrls.includes(imageUrl.trim())) {
      setImageUrls((prev) => [...prev, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const removeImage = (url: string) => {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return name && brand && model && year && price > 0;
      case 2: return location && fuel && transmission && bodyType;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    const defaultImage = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80";
    addCar({
      name,
      brand,
      model,
      year,
      price,
      originalPrice: originalPrice || price,
      image: imageUrls[0] || defaultImage,
      images: imageUrls.length > 0 ? imageUrls : [defaultImage],
      location,
      fuel,
      mileage: mileage || "0 km",
      transmission,
      bodyType,
      verified: false,
      featured: false,
      color: color || "Not Specified",
      owners,
      insurance: insurance || "Not Available",
      registration: registration || "N/A",
      engine: engine || "N/A",
      power: power || "N/A",
      torque: torque || "N/A",
      seating,
      description: description || `${name} listed by ${sellerName || "Owner"}`,
      features: selectedFeatures,
      seller: {
        name: sellerName || "Car Owner",
        type: sellerType,
        rating: 4.0,
        responseTime: "Usually responds within 2 hours",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      },
    });

    toast({
      title: "🎉 Car Listed Successfully!",
      description: "Your car has been added to the marketplace.",
    });

    navigate("/cars");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold font-heading mb-3">
              Post Your <span className="text-primary">Car</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              List your car and reach thousands of buyers instantly
            </p>
          </motion.div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : currentStep > step.id
                      ? "bg-primary/20 text-primary cursor-pointer"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card"
            >
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Car className="w-6 h-6 text-primary" />
                    Basic Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1.5 block">Car Title *</label>
                      <Input
                        placeholder="e.g. BMW 3 Series 320d M Sport"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Brand *</label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select Brand</option>
                        {brands.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Model *</label>
                      <Input
                        placeholder="e.g. 3 Series"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Year *</label>
                      <Input
                        type="number"
                        min={2000}
                        max={2026}
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <DollarSign className="w-3.5 h-3.5 inline" /> Asking Price *
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g. 35000"
                        value={price || ""}
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Original Price</label>
                      <Input
                        type="number"
                        placeholder="e.g. 42000"
                        value={originalPrice || ""}
                        onChange={(e) => setOriginalPrice(parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Seller Name</label>
                      <Input
                        placeholder="Your name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Seller Type</label>
                      <div className="flex gap-3">
                        {(["Individual", "Dealer"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setSellerType(t)}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                              sellerType === t
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-input hover:border-primary/50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Car Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <MapPin className="w-3.5 h-3.5 inline" /> Location *
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select Location</option>
                        {locations.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Fuel className="w-3.5 h-3.5 inline" /> Fuel Type *
                      </label>
                      <select
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select Fuel</option>
                        {fuelTypes.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Transmission *</label>
                      <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select Transmission</option>
                        {transmissionTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Body Type *</label>
                      <select
                        value={bodyType}
                        onChange={(e) => setBodyType(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select Body Type</option>
                        {bodyTypeOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Gauge className="w-3.5 h-3.5 inline" /> Mileage
                      </label>
                      <Input
                        placeholder="e.g. 15,000 km"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Palette className="w-3.5 h-3.5 inline" /> Color
                      </label>
                      <Input
                        placeholder="e.g. Alpine White"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Users className="w-3.5 h-3.5 inline" /> Number of Owners
                      </label>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={owners}
                        onChange={(e) => setOwners(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Users className="w-3.5 h-3.5 inline" /> Seating Capacity
                      </label>
                      <Input
                        type="number"
                        min={2}
                        max={9}
                        value={seating}
                        onChange={(e) => setSeating(parseInt(e.target.value) || 5)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Engine</label>
                      <Input
                        placeholder="e.g. 2.0L Turbo"
                        value={engine}
                        onChange={(e) => setEngine(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Power</label>
                      <Input
                        placeholder="e.g. 255 HP"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Torque</label>
                      <Input
                        placeholder="e.g. 400 Nm"
                        value={torque}
                        onChange={(e) => setTorque(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Shield className="w-3.5 h-3.5 inline" /> Insurance
                      </label>
                      <Input
                        placeholder="e.g. Comprehensive till Dec 2025"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Registration</label>
                      <Input
                        placeholder="e.g. MH-02"
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1.5 block">Description</label>
                      <Textarea
                        placeholder="Describe your car's condition, history, and selling points..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Features & Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Features & Photos
                  </h2>

                  {/* Features */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Features</label>
                    <div className="flex flex-wrap gap-2">
                      {featureOptions.map((feature) => (
                        <button
                          key={feature}
                          onClick={() => toggleFeature(feature)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                            selectedFeatures.includes(feature)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-input hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          {selectedFeatures.includes(feature) && (
                            <Check className="w-3 h-3 inline mr-1" />
                          )}
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo URLs */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      <ImageIcon className="w-3.5 h-3.5 inline" /> Photo URLs
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Add image URLs for your car photos. First image will be the cover.
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Paste image URL here..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                      />
                      <Button onClick={addImageUrl} size="sm" className="gap-1 shrink-0">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </div>

                    {imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {imageUrls.map((url, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-border aspect-video">
                            <img
                              src={url}
                              alt={`Car photo ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=60";
                              }}
                            />
                            {idx === 0 && (
                              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">Cover</Badge>
                            )}
                            <button
                              onClick={() => removeImage(url)}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {imageUrls.length === 0 && (
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground">
                        <Upload className="w-10 h-10 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No images added yet</p>
                        <p className="text-xs mt-1">A default image will be used if none provided</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Check className="w-6 h-6 text-primary" />
                    Review Your Listing
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Preview Card */}
                    <div className="rounded-2xl overflow-hidden border border-border">
                      <div className="aspect-video">
                        <img
                          src={imageUrls[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80"}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{name || "Car Title"}</h3>
                        <p className="text-2xl font-bold text-primary mt-1">${price.toLocaleString()}</p>
                        <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                          <span>{year}</span>
                          <span>•</span>
                          <span>{fuel || "Fuel"}</span>
                          <span>•</span>
                          <span>{transmission || "Trans."}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details Summary */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          ["Brand", brand],
                          ["Model", model],
                          ["Year", year],
                          ["Location", location],
                          ["Body Type", bodyType],
                          ["Mileage", mileage || "N/A"],
                          ["Color", color || "N/A"],
                          ["Owners", owners],
                          ["Engine", engine || "N/A"],
                          ["Power", power || "N/A"],
                          ["Seller", `${sellerName || "Owner"} (${sellerType})`],
                        ].map(([label, value]) => (
                          <div key={String(label)} className="flex justify-between text-sm py-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">{String(label)}</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>

                      {selectedFeatures.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Features ({selectedFeatures.length})</p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedFeatures.map((f) => (
                              <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2 bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4" /> Post Your Car
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostCar;
