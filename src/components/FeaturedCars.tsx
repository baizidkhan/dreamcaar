import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, MapPin, Fuel, Gauge, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/carsData";
const featuredCars = [
  {
    id: 1,
    name: "BMW 3 Series",
    year: 2023,
    price: 42500,
    originalPrice: 48000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    location: "Mumbai",
    fuel: "Petrol",
    mileage: "15,000 km",
    transmission: "Automatic",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Mercedes C-Class",
    year: 2022,
    price: 38900,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    location: "Delhi",
    fuel: "Diesel",
    mileage: "22,000 km",
    transmission: "Automatic",
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Audi A4",
    year: 2023,
    price: 35500,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    location: "Bangalore",
    fuel: "Petrol",
    mileage: "12,000 km",
    transmission: "Automatic",
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "Toyota Camry",
    year: 2022,
    price: 28500,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    location: "Chennai",
    fuel: "Hybrid",
    mileage: "18,000 km",
    transmission: "CVT",
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "Honda Accord",
    year: 2023,
    price: 26900,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    location: "Pune",
    fuel: "Petrol",
    mileage: "8,000 km",
    transmission: "Automatic",
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: "Tesla Model 3",
    year: 2023,
    price: 52000,
    originalPrice: 58000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    location: "Hyderabad",
    fuel: "Electric",
    mileage: "5,000 km",
    transmission: "Auto",
    verified: true,
    featured: true,
  },
const featuredCars = carsData.filter(car => car.featured).slice(0, 6);

export const FeaturedCars = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Best Deals</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Featured Cars</h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Hand-picked selection of verified vehicles with the best value
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Cars →
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {car.featured && (
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  )}
                  {car.verified && (
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="w-3 h-3" /> Verified
                    </Badge>
                  )}
                </div>

                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Discount Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm font-semibold">
                  Save ${(car.originalPrice - car.price).toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      {car.year}
                      <span className="mx-1">•</span>
                      <MapPin className="w-4 h-4" />
                      {car.location}
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Gauge className="w-4 h-4" />
                    {car.mileage}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">
                      ${car.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-2xl font-bold text-primary">
                      ${car.price.toLocaleString()}
                    </div>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
