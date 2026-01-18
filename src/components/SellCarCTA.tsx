import { motion } from "framer-motion";
import { ArrowRight, Camera, FileCheck, DollarSign, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Camera, title: "Upload Photos", description: "Take quality photos of your car" },
  { icon: FileCheck, title: "Get Valuation", description: "Receive instant price estimate" },
  { icon: Car, title: "Free Inspection", description: "We inspect at your doorstep" },
  { icon: DollarSign, title: "Get Paid", description: "Instant payment upon approval" },
];

export const SellCarCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container relative">
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card-hover overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                💰 Sell Your Car
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Get the Best Price for{" "}
                <span className="gradient-text">Your Car</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Sell your car hassle-free in just 3 steps. No middlemen, no hidden charges. 
                Get instant payment with our verified buyer network.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  Sell My Car Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Get Free Valuation
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">24hrs</span>
                  <span className="text-sm text-muted-foreground">Quick Sale</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">100%</span>
                  <span className="text-sm text-muted-foreground">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">0%</span>
                  <span className="text-sm text-muted-foreground">Commission</span>
                </div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-5 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                    <step.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-xs font-medium text-primary mb-1">Step {index + 1}</div>
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
