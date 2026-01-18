import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, MapPin, Fuel, Gauge, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/carsData";

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
          <Link to="/cars">
            <Button variant="outline" className="self-start md:self-auto">
              View All Cars →
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/car/${car.id}`}>
                <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
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
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
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
                          {car.location.split(",")[0]}
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
