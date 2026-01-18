import { motion } from "framer-motion";
import { X, Check, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const compareCars = [
  {
    id: 1,
    name: "BMW 3 Series",
    price: 42500,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80",
    specs: {
      engine: "2.0L Turbo",
      power: "255 HP",
      torque: "400 Nm",
      transmission: "8-Speed Auto",
      mileage: "14 km/l",
      fuelType: "Petrol",
      seating: "5",
      bootSpace: "480L",
      groundClearance: "143mm",
      airbags: "8",
      sunroof: true,
      parkingSensors: true,
      cruiseControl: true,
      appleCarPlay: true,
      ventilatedSeats: true,
    },
  },
  {
    id: 2,
    name: "Mercedes C-Class",
    price: 48900,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
    specs: {
      engine: "2.0L Turbo",
      power: "268 HP",
      torque: "400 Nm",
      transmission: "9-Speed Auto",
      mileage: "12 km/l",
      fuelType: "Petrol",
      seating: "5",
      bootSpace: "455L",
      groundClearance: "140mm",
      airbags: "9",
      sunroof: true,
      parkingSensors: true,
      cruiseControl: true,
      appleCarPlay: true,
      ventilatedSeats: true,
    },
  },
  {
    id: 3,
    name: "Audi A4",
    price: 45500,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80",
    specs: {
      engine: "2.0L TFSI",
      power: "248 HP",
      torque: "370 Nm",
      transmission: "7-Speed DCT",
      mileage: "15 km/l",
      fuelType: "Petrol",
      seating: "5",
      bootSpace: "460L",
      groundClearance: "145mm",
      airbags: "8",
      sunroof: true,
      parkingSensors: true,
      cruiseControl: true,
      appleCarPlay: true,
      ventilatedSeats: false,
    },
  },
];

const specLabels: Record<string, string> = {
  engine: "Engine",
  power: "Power",
  torque: "Torque",
  transmission: "Transmission",
  mileage: "Mileage",
  fuelType: "Fuel Type",
  seating: "Seating Capacity",
  bootSpace: "Boot Space",
  groundClearance: "Ground Clearance",
  airbags: "Airbags",
  sunroof: "Sunroof",
  parkingSensors: "Parking Sensors",
  cruiseControl: "Cruise Control",
  appleCarPlay: "Apple CarPlay",
  ventilatedSeats: "Ventilated Seats",
};

export const CompareSection = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("basic");

  const renderValue = (value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      );
    }
    return value;
  };

  const basicSpecs = ["engine", "power", "torque", "transmission", "mileage", "fuelType"];
  const dimensionSpecs = ["seating", "bootSpace", "groundClearance", "airbags"];
  const featureSpecs = ["sunroof", "parkingSensors", "cruiseControl", "appleCarPlay", "ventilatedSeats"];

  const sections = [
    { id: "basic", title: "Engine & Performance", specs: basicSpecs },
    { id: "dimensions", title: "Dimensions & Capacity", specs: dimensionSpecs },
    { id: "features", title: "Features", specs: featureSpecs },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Compare</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">
            Side-by-Side <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Compare specs, features, and prices to find your perfect match
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Car Headers */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4" /> {/* Empty cell for labels */}
              {compareCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-4 border border-border text-center"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
                  />
                  <h3 className="font-bold text-lg">{car.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${car.price.toLocaleString()}
                  </p>
                  <Button size="sm" className="mt-4 w-full">View Details</Button>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            {sections.map((section) => (
              <div key={section.id} className="mb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  <span className="font-semibold">{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === section.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 space-y-1"
                  >
                    {section.specs.map((spec) => (
                      <div
                        key={spec}
                        className="grid grid-cols-4 gap-4 p-4 bg-card rounded-xl border border-border/50"
                      >
                        <span className="text-muted-foreground font-medium">
                          {specLabels[spec]}
                        </span>
                        {compareCars.map((car) => (
                          <div key={car.id} className="text-center font-medium">
                            {renderValue(car.specs[spec as keyof typeof car.specs])}
                          </div>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
