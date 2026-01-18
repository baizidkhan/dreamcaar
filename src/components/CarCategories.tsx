import { motion } from "framer-motion";
import { Car } from "lucide-react";

const bodyTypes = [
  { name: "Sedan", icon: "🚗", count: 1250 },
  { name: "SUV", icon: "🚙", count: 2340 },
  { name: "Hatchback", icon: "🚘", count: 890 },
  { name: "Coupe", icon: "🏎️", count: 456 },
  { name: "Pickup", icon: "🛻", count: 678 },
  { name: "Electric", icon: "⚡", count: 345 },
  { name: "Luxury", icon: "✨", count: 234 },
  { name: "Convertible", icon: "🚐", count: 123 },
];

export const CarCategories = () => {
  return (
    <section className="py-20 bg-gradient-premium text-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Browse by Body Type</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">
            Find the perfect style that matches your lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bodyTypes.map((type, index) => (
            <motion.button
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-4xl md:text-5xl mb-4 block">{type.icon}</span>
              <h3 className="font-bold text-lg mb-1">{type.name}</h3>
              <p className="text-white/50 text-sm">{type.count.toLocaleString()} cars</p>
              
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <Car className="w-4 h-4 text-primary" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
