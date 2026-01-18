export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  location: string;
  fuel: string;
  mileage: string;
  transmission: string;
  bodyType: string;
  verified: boolean;
  featured: boolean;
  color: string;
  owners: number;
  insurance: string;
  registration: string;
  engine: string;
  power: string;
  torque: string;
  seating: number;
  description: string;
  features: string[];
  seller: {
    name: string;
    type: "Dealer" | "Individual";
    rating: number;
    responseTime: string;
    avatar: string;
  };
}

export const carsData: Car[] = [
  {
    id: 1,
    name: "BMW 3 Series 320d M Sport",
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    price: 42500,
    originalPrice: 48000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80",
      "https://images.unsplash.com/photo-1520050206757-4deaed3b5a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    ],
    location: "Mumbai, Maharashtra",
    fuel: "Petrol",
    mileage: "15,000 km",
    transmission: "Automatic",
    bodyType: "Sedan",
    verified: true,
    featured: true,
    color: "Alpine White",
    owners: 1,
    insurance: "Comprehensive till Dec 2025",
    registration: "MH-02",
    engine: "2.0L TwinPower Turbo",
    power: "255 HP",
    torque: "400 Nm",
    seating: 5,
    description: "Immaculate BMW 3 Series in Alpine White. Single owner, full service history with BMW. All original accessories included. Recently serviced with new brake pads and filters.",
    features: ["Sunroof", "Leather Seats", "360 Camera", "Wireless Charging", "Apple CarPlay", "Harman Kardon Sound", "Ambient Lighting", "Heated Seats"],
    seller: {
      name: "Premium Motors",
      type: "Dealer",
      rating: 4.8,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
    }
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class C200",
    brand: "Mercedes",
    model: "C-Class",
    year: 2022,
    price: 38900,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80",
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80"
    ],
    location: "Delhi NCR",
    fuel: "Diesel",
    mileage: "22,000 km",
    transmission: "Automatic",
    bodyType: "Sedan",
    verified: true,
    featured: false,
    color: "Obsidian Black",
    owners: 1,
    insurance: "Comprehensive till Aug 2025",
    registration: "DL-3C",
    engine: "2.0L Turbo Diesel",
    power: "268 HP",
    torque: "400 Nm",
    seating: 5,
    description: "Stunning Mercedes C-Class in pristine condition. Company maintained with all records. Extended warranty available.",
    features: ["Panoramic Sunroof", "MBUX System", "Burmester Sound", "Memory Seats", "Keyless Go", "LED Headlights"],
    seller: {
      name: "Rajesh Kumar",
      type: "Individual",
      rating: 4.5,
      responseTime: "Usually responds within 2 hours",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    }
  },
  {
    id: 3,
    name: "Audi A4 Premium Plus",
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 35500,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"
    ],
    location: "Bangalore, Karnataka",
    fuel: "Petrol",
    mileage: "12,000 km",
    transmission: "Automatic",
    bodyType: "Sedan",
    verified: true,
    featured: true,
    color: "Glacier White",
    owners: 1,
    insurance: "Comprehensive till Mar 2026",
    registration: "KA-01",
    engine: "2.0L TFSI",
    power: "248 HP",
    torque: "370 Nm",
    seating: 5,
    description: "Well-maintained Audi A4 with all original accessories. Regularly serviced at authorized center.",
    features: ["Virtual Cockpit", "Matrix LED", "B&O Sound", "Quattro AWD", "Adaptive Cruise", "Lane Assist"],
    seller: {
      name: "Audi Approved Plus",
      type: "Dealer",
      rating: 4.9,
      responseTime: "Usually responds within 30 minutes",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80"
    }
  },
  {
    id: 4,
    name: "Toyota Camry Hybrid",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28500,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80"
    ],
    location: "Chennai, Tamil Nadu",
    fuel: "Hybrid",
    mileage: "18,000 km",
    transmission: "CVT",
    bodyType: "Sedan",
    verified: true,
    featured: false,
    color: "Platinum White Pearl",
    owners: 1,
    insurance: "Comprehensive till Nov 2025",
    registration: "TN-09",
    engine: "2.5L Hybrid",
    power: "218 HP",
    torque: "221 Nm",
    seating: 5,
    description: "Fuel-efficient Toyota Camry Hybrid. Perfect for long drives with excellent mileage.",
    features: ["JBL Audio", "Heads Up Display", "Ventilated Seats", "Wireless Charging", "Toyota Safety Sense"],
    seller: {
      name: "Toyota Trust",
      type: "Dealer",
      rating: 4.7,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
    }
  },
  {
    id: 5,
    name: "Honda Accord 2.0T",
    brand: "Honda",
    model: "Accord",
    year: 2023,
    price: 26900,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"
    ],
    location: "Pune, Maharashtra",
    fuel: "Petrol",
    mileage: "8,000 km",
    transmission: "Automatic",
    bodyType: "Sedan",
    verified: true,
    featured: true,
    color: "Crystal Black Pearl",
    owners: 1,
    insurance: "Comprehensive till Jun 2026",
    registration: "MH-12",
    engine: "2.0L Turbo VTEC",
    power: "252 HP",
    torque: "370 Nm",
    seating: 5,
    description: "Almost new Honda Accord with very low mileage. All features working perfectly.",
    features: ["Honda Sensing", "Premium Audio", "Android Auto", "Apple CarPlay", "Dual Climate", "Leather Interior"],
    seller: {
      name: "Honda Certified",
      type: "Dealer",
      rating: 4.6,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    }
  },
  {
    id: 6,
    name: "Tesla Model 3 Long Range",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 52000,
    originalPrice: 58000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80"
    ],
    location: "Hyderabad, Telangana",
    fuel: "Electric",
    mileage: "5,000 km",
    transmission: "Auto",
    bodyType: "Sedan",
    verified: true,
    featured: true,
    color: "Midnight Silver",
    owners: 1,
    insurance: "Comprehensive till Sep 2026",
    registration: "TS-08",
    engine: "Dual Motor AWD",
    power: "366 HP",
    torque: "493 Nm",
    seating: 5,
    description: "Premium Tesla Model 3 with Full Self-Driving capability. Supercharger network access included.",
    features: ["Autopilot", "Full Self-Driving", "Premium Interior", "Glass Roof", "15\" Touchscreen", "Sentry Mode"],
    seller: {
      name: "Electric Dreams",
      type: "Dealer",
      rating: 4.9,
      responseTime: "Usually responds within 30 minutes",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    }
  },
  {
    id: 7,
    name: "Range Rover Sport HSE",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2022,
    price: 78500,
    originalPrice: 92000,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80"
    ],
    location: "Mumbai, Maharashtra",
    fuel: "Diesel",
    mileage: "25,000 km",
    transmission: "Automatic",
    bodyType: "SUV",
    verified: true,
    featured: true,
    color: "Santorini Black",
    owners: 1,
    insurance: "Comprehensive till Apr 2025",
    registration: "MH-01",
    engine: "3.0L V6 Diesel",
    power: "350 HP",
    torque: "700 Nm",
    seating: 5,
    description: "Commanding presence Range Rover Sport. All-terrain capability with luxury features.",
    features: ["Air Suspension", "Terrain Response", "Meridian Sound", "Panoramic Roof", "360 Camera", "Massage Seats"],
    seller: {
      name: "Luxury Wheels",
      type: "Dealer",
      rating: 4.8,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    }
  },
  {
    id: 8,
    name: "Porsche Cayenne S",
    brand: "Porsche",
    model: "Cayenne",
    year: 2023,
    price: 95000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    ],
    location: "Bangalore, Karnataka",
    fuel: "Petrol",
    mileage: "10,000 km",
    transmission: "Automatic",
    bodyType: "SUV",
    verified: true,
    featured: true,
    color: "Carrara White",
    owners: 1,
    insurance: "Comprehensive till Dec 2026",
    registration: "KA-05",
    engine: "2.9L V6 Twin Turbo",
    power: "434 HP",
    torque: "550 Nm",
    seating: 5,
    description: "Stunning Porsche Cayenne S with sport chrono package. Track-ready performance with daily comfort.",
    features: ["Sport Chrono", "PASM", "Bose Surround", "Sport Exhaust", "21\" Wheels", "Night Vision"],
    seller: {
      name: "Porsche Centre",
      type: "Dealer",
      rating: 5.0,
      responseTime: "Usually responds within 15 minutes",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80"
    }
  },
  {
    id: 9,
    name: "Ford Mustang GT",
    brand: "Ford",
    model: "Mustang",
    year: 2022,
    price: 62000,
    originalPrice: 70000,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d718b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5f82d718b?w=800&q=80"
    ],
    location: "Delhi NCR",
    fuel: "Petrol",
    mileage: "12,000 km",
    transmission: "Automatic",
    bodyType: "Coupe",
    verified: true,
    featured: false,
    color: "Race Red",
    owners: 1,
    insurance: "Comprehensive till Jul 2025",
    registration: "DL-4C",
    engine: "5.0L V8",
    power: "460 HP",
    torque: "569 Nm",
    seating: 4,
    description: "Iconic American muscle car. Powerful V8 with throaty exhaust note. Turn heads everywhere.",
    features: ["Performance Pack", "Recaro Seats", "Launch Control", "Line Lock", "Track Apps", "B&O Premium Audio"],
    seller: {
      name: "American Classics",
      type: "Dealer",
      rating: 4.7,
      responseTime: "Usually responds within 2 hours",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
    }
  },
  {
    id: 10,
    name: "Volkswagen Polo GT TSI",
    brand: "Volkswagen",
    model: "Polo",
    year: 2023,
    price: 12500,
    originalPrice: 14000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
    ],
    location: "Pune, Maharashtra",
    fuel: "Petrol",
    mileage: "20,000 km",
    transmission: "Automatic",
    bodyType: "Hatchback",
    verified: true,
    featured: false,
    color: "Sunset Red",
    owners: 2,
    insurance: "Comprehensive till Feb 2025",
    registration: "MH-14",
    engine: "1.0L TSI Turbo",
    power: "115 HP",
    torque: "200 Nm",
    seating: 5,
    description: "Fun-to-drive hot hatch with peppy turbo engine. Perfect city car with highway capability.",
    features: ["Touchscreen Infotainment", "Cruise Control", "Rain Sensing Wipers", "Auto Headlights", "Rear Parking Sensors"],
    seller: {
      name: "VW Das WeltAuto",
      type: "Dealer",
      rating: 4.5,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
    }
  },
  {
    id: 11,
    name: "Hyundai Creta SX(O)",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 18500,
    originalPrice: 21000,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80"
    ],
    location: "Chennai, Tamil Nadu",
    fuel: "Diesel",
    mileage: "15,000 km",
    transmission: "Automatic",
    bodyType: "SUV",
    verified: true,
    featured: false,
    color: "Phantom Black",
    owners: 1,
    insurance: "Comprehensive till Aug 2026",
    registration: "TN-07",
    engine: "1.5L CRDi",
    power: "115 HP",
    torque: "250 Nm",
    seating: 5,
    description: "Feature-loaded Creta with panoramic sunroof. Best-in-class features and reliability.",
    features: ["Panoramic Sunroof", "Ventilated Seats", "BlueLink Connected", "ADAS Level 2", "Bose Sound", "Digital Cluster"],
    seller: {
      name: "Hyundai Certified",
      type: "Dealer",
      rating: 4.6,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    }
  },
  {
    id: 12,
    name: "Mahindra Thar LX",
    brand: "Mahindra",
    model: "Thar",
    year: 2023,
    price: 16500,
    originalPrice: 18500,
    image: "https://images.unsplash.com/photo-1625231334168-22a4b266f7a1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1625231334168-22a4b266f7a1?w=800&q=80"
    ],
    location: "Jaipur, Rajasthan",
    fuel: "Diesel",
    mileage: "18,000 km",
    transmission: "Manual",
    bodyType: "SUV",
    verified: true,
    featured: true,
    color: "Aquamarine",
    owners: 1,
    insurance: "Comprehensive till May 2026",
    registration: "RJ-14",
    engine: "2.2L mHawk Diesel",
    power: "130 HP",
    torque: "300 Nm",
    seating: 4,
    description: "Adventure-ready Mahindra Thar with 4x4 capability. Perfect for off-road enthusiasts.",
    features: ["4x4 with Low Range", "Removable Roof", "Touchscreen", "Front Facing Rear Seats", "LED DRLs", "Cruise Control"],
    seller: {
      name: "Mahindra First Choice",
      type: "Dealer",
      rating: 4.4,
      responseTime: "Usually responds within 2 hours",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    }
  },
  {
    id: 13,
    name: "Lexus ES 300h",
    brand: "Lexus",
    model: "ES",
    year: 2022,
    price: 55000,
    originalPrice: 62000,
    image: "https://images.unsplash.com/photo-1622195701018-f5a05cbe6f34?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622195701018-f5a05cbe6f34?w=800&q=80"
    ],
    location: "Mumbai, Maharashtra",
    fuel: "Hybrid",
    mileage: "20,000 km",
    transmission: "CVT",
    bodyType: "Sedan",
    verified: true,
    featured: false,
    color: "Sonic Titanium",
    owners: 1,
    insurance: "Comprehensive till Oct 2025",
    registration: "MH-04",
    engine: "2.5L Hybrid",
    power: "215 HP",
    torque: "221 Nm",
    seating: 5,
    description: "Luxurious Lexus ES with hybrid efficiency. Whisper-quiet cabin with premium materials.",
    features: ["Mark Levinson Audio", "Heads Up Display", "Memory Seats", "Wireless Charging", "Lexus Safety System+"],
    seller: {
      name: "Lexus Mumbai",
      type: "Dealer",
      rating: 4.9,
      responseTime: "Usually responds within 30 minutes",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80"
    }
  },
  {
    id: 14,
    name: "Jeep Compass Trailhawk",
    brand: "Jeep",
    model: "Compass",
    year: 2023,
    price: 32000,
    originalPrice: 36000,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
    ],
    location: "Hyderabad, Telangana",
    fuel: "Diesel",
    mileage: "14,000 km",
    transmission: "Automatic",
    bodyType: "SUV",
    verified: true,
    featured: false,
    color: "Exotica Red",
    owners: 1,
    insurance: "Comprehensive till Jul 2026",
    registration: "TS-09",
    engine: "2.0L Multijet II",
    power: "170 HP",
    torque: "350 Nm",
    seating: 5,
    description: "Trail Rated Jeep Compass with serious off-road capability. Adventure awaits.",
    features: ["Trail Rated Badge", "Rock Mode", "Panoramic Sunroof", "9-Speed Auto", "UConnect 5", "Alpine Audio"],
    seller: {
      name: "Jeep Hyderabad",
      type: "Dealer",
      rating: 4.5,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
    }
  },
  {
    id: 15,
    name: "Maruti Suzuki Swift ZXi+",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2023,
    price: 8500,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80"
    ],
    location: "Delhi NCR",
    fuel: "Petrol",
    mileage: "25,000 km",
    transmission: "Manual",
    bodyType: "Hatchback",
    verified: true,
    featured: false,
    color: "Pearl Arctic White",
    owners: 1,
    insurance: "Comprehensive till Mar 2025",
    registration: "DL-8C",
    engine: "1.2L DualJet",
    power: "90 HP",
    torque: "113 Nm",
    seating: 5,
    description: "Popular Maruti Swift in excellent condition. Low running cost and high resale value.",
    features: ["SmartPlay Studio", "Auto Climate", "Push Start", "Cruise Control", "LED Projector Headlamps"],
    seller: {
      name: "Maruti True Value",
      type: "Dealer",
      rating: 4.3,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
    }
  },
  {
    id: 16,
    name: "Kia Seltos GTX+",
    brand: "Kia",
    model: "Seltos",
    year: 2023,
    price: 19500,
    originalPrice: 22000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
    ],
    location: "Bangalore, Karnataka",
    fuel: "Petrol",
    mileage: "12,000 km",
    transmission: "DCT",
    bodyType: "SUV",
    verified: true,
    featured: true,
    color: "Gravity Grey",
    owners: 1,
    insurance: "Comprehensive till Nov 2026",
    registration: "KA-03",
    engine: "1.4L Turbo GDi",
    power: "140 HP",
    torque: "242 Nm",
    seating: 5,
    description: "Feature-rich Kia Seltos with connected car technology. Best-in-segment infotainment.",
    features: ["10.25\" HD Display", "Bose Premium Audio", "360 Camera", "Ventilated Seats", "UVO Connect", "ADAS"],
    seller: {
      name: "Kia Certified Pre-Owned",
      type: "Dealer",
      rating: 4.7,
      responseTime: "Usually responds within 1 hour",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    }
  }
];

export const brands = [
  "BMW", "Mercedes", "Audi", "Toyota", "Honda", 
  "Ford", "Tesla", "Porsche", "Lexus", "Volkswagen",
  "Hyundai", "Mahindra", "Kia", "Maruti Suzuki", "Jeep", "Land Rover"
];

export const bodyTypes = [
  { name: "Sedan", icon: "🚗", count: 8 },
  { name: "SUV", icon: "🚙", count: 6 },
  { name: "Hatchback", icon: "🚘", count: 2 },
  { name: "Coupe", icon: "🏎️", count: 1 },
  { name: "Pickup", icon: "🛻", count: 0 },
  { name: "Electric", icon: "⚡", count: 1 },
  { name: "Luxury", icon: "✨", count: 5 },
  { name: "Convertible", icon: "🚐", count: 0 },
];

export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];

export const transmissionTypes = ["Automatic", "Manual", "CVT", "DCT"];

export const priceRanges = [
  { label: "Under $10,000", min: 0, max: 10000 },
  { label: "$10,000 - $20,000", min: 10000, max: 20000 },
  { label: "$20,000 - $35,000", min: 20000, max: 35000 },
  { label: "$35,000 - $50,000", min: 35000, max: 50000 },
  { label: "$50,000 - $75,000", min: 50000, max: 75000 },
  { label: "$75,000+", min: 75000, max: Infinity },
];

export const locations = [
  "Mumbai, Maharashtra",
  "Delhi NCR", 
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Kolkata, West Bengal"
];
