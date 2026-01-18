import { motion } from "framer-motion";

const brands = [
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-grey.png" },
  { name: "Mercedes", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png" },
  { name: "Audi", logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png" },
  { name: "Toyota", logo: "https://www.carlogos.org/car-logos/toyota-logo-2019.png" },
  { name: "Honda", logo: "https://www.carlogos.org/car-logos/honda-logo-2000.png" },
  { name: "Ford", logo: "https://www.carlogos.org/car-logos/ford-logo-2017.png" },
  { name: "Tesla", logo: "https://www.carlogos.org/car-logos/tesla-logo-2007.png" },
  { name: "Porsche", logo: "https://www.carlogos.org/car-logos/porsche-logo-2014.png" },
  { name: "Lexus", logo: "https://www.carlogos.org/car-logos/lexus-logo-1988.png" },
  { name: "Volkswagen", logo: "https://www.carlogos.org/car-logos/volkswagen-logo-2019.png" },
];

export const BrandShowcase = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold font-heading mb-2">Explore by Brand</h2>
          <p className="text-muted-foreground">Browse cars from top manufacturers</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <motion.button
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group flex flex-col items-center gap-3 p-4 md:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 w-24 md:w-32"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
