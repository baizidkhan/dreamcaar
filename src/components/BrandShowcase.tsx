import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/carsData";

const brandLogos: Record<string, string> = {
  "BMW": "https://www.carlogos.org/car-logos/bmw-logo-2020-grey.png",
  "Mercedes": "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png",
  "Audi": "https://www.carlogos.org/car-logos/audi-logo-2016.png",
  "Toyota": "https://www.carlogos.org/car-logos/toyota-logo-2019.png",
  "Honda": "https://www.carlogos.org/car-logos/honda-logo-2000.png",
  "Ford": "https://www.carlogos.org/car-logos/ford-logo-2017.png",
  "Tesla": "https://www.carlogos.org/car-logos/tesla-logo-2007.png",
  "Porsche": "https://www.carlogos.org/car-logos/porsche-logo-2014.png",
  "Lexus": "https://www.carlogos.org/car-logos/lexus-logo-1988.png",
  "Volkswagen": "https://www.carlogos.org/car-logos/volkswagen-logo-2019.png",
  "Chevrolet": "https://www.carlogos.org/car-logos/chevrolet-logo-2013.png",
  "Nissan": "https://www.carlogos.org/car-logos/nissan-logo-2020.png",
  "Hyundai": "https://www.carlogos.org/car-logos/hyundai-logo-2011.png",
  "Kia": "https://www.carlogos.org/car-logos/kia-logo-2021.png",
  "Mazda": "https://www.carlogos.org/car-logos/mazda-logo-2018.png",
  "Subaru": "https://www.carlogos.org/car-logos/subaru-logo-2003.png",
  "Jeep": "https://www.carlogos.org/car-logos/jeep-logo-1993.png",
  "Volvo": "https://www.carlogos.org/car-logos/volvo-logo-2014.png",
};

export const BrandShowcase = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Top Brands</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Explore by Brand</h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Choose from world-renowned manufacturers with certified quality vehicles
            </p>
          </div>
          <Link 
            to="/cars" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Brands <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4">
          {brands.slice(0, 18).map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <Link to={`/cars?brand=${encodeURIComponent(brand)}`}>
                <div className="group relative flex flex-col items-center gap-3 p-4 md:p-5 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                    <img 
                      src={brandLogos[brand] || `https://via.placeholder.com/80?text=${brand.charAt(0)}`}
                      alt={brand}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  
                  <span className="relative text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {brand}
                  </span>
                  
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
