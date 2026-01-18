import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Heart, Share2, MapPin, Calendar, Fuel, Gauge, 
  Shield, Star, Clock, Phone, Mail, ChevronLeft, ChevronRight,
  Check, Car, Palette, Users, Package, FileText, Award, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { carsData } from "@/data/carsData";
import { toast } from "sonner";

const CarDetails = () => {
  const { id } = useParams();
  const car = carsData.find(c => c.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Link to="/cars">
            <Button>Browse All Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleContact = () => {
    toast.success("Contact request sent! Seller will reach out soon.");
    setShowContactForm(false);
  };

  const specs = [
    { icon: Car, label: "Engine", value: car.engine },
    { icon: Gauge, label: "Power", value: car.power },
    { icon: Fuel, label: "Fuel Type", value: car.fuel },
    { icon: Package, label: "Transmission", value: car.transmission },
    { icon: Palette, label: "Color", value: car.color },
    { icon: Users, label: "Seating", value: `${car.seating} Seats` },
    { icon: FileText, label: "Registration", value: car.registration },
    { icon: Award, label: "Owners", value: `${car.owners} Owner${car.owners > 1 ? "s" : ""}` },
  ];

  const similarCars = carsData
    .filter(c => c.id !== car.id && (c.brand === car.brand || c.bodyType === car.bodyType))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-foreground">Cars</Link>
            <span>/</span>
            <Link to={`/cars?brand=${car.brand}`} className="hover:text-foreground">{car.brand}</Link>
            <span>/</span>
            <span className="text-foreground">{car.model}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl overflow-hidden border border-border"
              >
                {/* Main Image */}
                <div className="relative aspect-[16/10]">
                  <img
                    src={car.images[activeImage]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.featured && (
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    )}
                    {car.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="w-3 h-3" /> 217-Point Verified
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm text-sm font-medium">
                    {activeImage + 1} / {car.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {car.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {car.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                          idx === activeImage ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Car Info Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-heading">{car.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {car.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" />
                        {car.mileage}
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        {car.fuel}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {car.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground line-through">
                      ${car.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-3xl font-bold text-primary">
                      ${car.price.toLocaleString()}
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      Save ${(car.originalPrice - car.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-xl font-bold font-heading mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="p-4 bg-secondary/50 rounded-xl">
                      <spec.icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{spec.label}</p>
                      <p className="font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-xl font-bold font-heading mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Insurance:</strong> {car.insurance}
                  </p>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-xl font-bold font-heading mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Seller & Actions */}
            <div className="space-y-6">
              {/* Price Card (Sticky) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 space-y-6"
              >
                {/* EMI Calculator Quick */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-bold mb-4">Monthly EMI</h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${Math.round(car.price / 48).toLocaleString()}/mo*
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    *Based on 48 months @ 8.5% interest
                  </p>
                  <Link to="/#emi-calculator">
                    <Button variant="outline" className="w-full">Calculate EMI</Button>
                  </Link>
                </div>

                {/* Seller Card */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-bold mb-4">Seller Information</h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={car.seller.avatar}
                      alt={car.seller.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{car.seller.name}</h4>
                      <Badge variant="secondary" className="mt-1">{car.seller.type}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{car.seller.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{car.seller.responseTime}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full gap-2" onClick={() => setShowContactForm(true)}>
                      <Phone className="w-4 h-4" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Safety Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Meet seller in a public place</li>
                    <li>• Check documents before payment</li>
                    <li>• Don't pay full amount in advance</li>
                    <li>• Verify car history report</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Similar Cars */}
          {similarCars.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold font-heading mb-6">Similar Cars</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {similarCars.map((similarCar) => (
                  <Link key={similarCar.id} to={`/car/${similarCar.id}`}>
                    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all">
                      <div className="relative aspect-[4/3]">
                        <img
                          src={similarCar.image}
                          alt={similarCar.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold group-hover:text-primary transition-colors">{similarCar.name}</h3>
                        <p className="text-sm text-muted-foreground">{similarCar.year} • {similarCar.mileage}</p>
                        <p className="text-xl font-bold text-primary mt-2">${similarCar.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-card-hover max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Contact Seller</h3>
            <p className="text-muted-foreground mb-4">
              Request contact details for {car.name}
            </p>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border mb-3"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border mb-3"
            />
            <textarea
              placeholder="Message (optional)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border mb-4 resize-none"
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowContactForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleContact} className="flex-1">
                Send Request
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarDetails;
