import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Truck, Zap, Sparkles, CircleDot } from "lucide-react";
import { bodyTypes } from "@/data/carsData";

const categoryIcons: Record<string, React.ReactNode> = {
  "Sedan": <Car className="w-8 h-8" />,
  "SUV": <Truck className="w-8 h-8" />,
  "Hatchback": <Car className="w-8 h-8" />,
  "Coupe": <CircleDot className="w-8 h-8" />,
  "Pickup": <Truck className="w-8 h-8" />,
  "Electric": <Zap className="w-8 h-8" />,
  "Luxury": <Sparkles className="w-8 h-8" />,
  "Convertible": <Car className="w-8 h-8" />,
};

const categoryImages: Record<string, string> = {
  "Sedan": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format&fit=crop",
  "SUV": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&auto=format&fit=crop",
  "Hatchback": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&auto=format&fit=crop",
  "Coupe": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop",
  "Pickup": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
  "Electric": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&auto=format&fit=crop",
  "Luxury": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop",
  "Convertible": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop",
};

export const CarCategories = () => {
  return (
    <section className="py-20 bg-gradient-premium text-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Categories</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Browse by Body Type</h2>
            <p className="text-white/60 mt-3 max-w-lg">
              Find the perfect style that matches your lifestyle and needs
            </p>
          </div>
          <Link 
            to="/cars" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bodyTypes.filter(bt => bt.count > 0).map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/cars?bodyType=${encodeURIComponent(type.name)}`}>
                <div className="group relative h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <img 
                    src={categoryImages[type.name]}
                    alt={type.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-primary/90 group-hover:via-primary/40 group-hover:to-transparent transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        {categoryIcons[type.name] || <Car className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{type.name}</h3>
                        <p className="text-white/60 text-sm">{type.count} cars</p>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      <ArrowRight className="w-4 h-4 text-white" />
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
