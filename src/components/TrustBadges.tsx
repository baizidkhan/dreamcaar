import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock, CreditCard, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "217-Point Inspection",
    description: "Every car undergoes rigorous quality checks for your peace of mind"
  },
  {
    icon: CheckCircle,
    title: "Verified Sellers",
    description: "All sellers are ID-verified to ensure safe and transparent transactions"
  },
  {
    icon: Clock,
    title: "7-Day Return Policy",
    description: "Not satisfied? Return the car within 7 days, no questions asked"
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    description: "Get instant loan approval with competitive interest rates"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always ready to assist you"
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "We ensure you get the best deal on every purchase"
  }
];

export const TrustBadges = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            The CarVault <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We've reimagined the car buying experience with trust, transparency, and technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
