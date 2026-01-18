export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "2024's Most Anticipated Electric Vehicles: What to Expect",
    slug: "2024-most-anticipated-electric-vehicles",
    excerpt: "From luxury EVs to affordable options, discover the exciting electric vehicles hitting the market this year.",
    content: `The electric vehicle revolution is in full swing, and 2024 promises to be a landmark year for EV enthusiasts. Here's everything you need to know about the most anticipated electric vehicles coming to market.

## Tesla Cybertruck
Finally hitting production, the Cybertruck has been one of the most talked-about vehicles in recent memory. Its futuristic design and impressive specs have generated massive interest.

## BMW i5
BMW's newest electric sedan combines luxury with sustainability. With a range of over 300 miles and cutting-edge technology, it's set to compete directly with the Tesla Model S.

## Chevrolet Equinox EV
Starting at around $30,000, the Equinox EV aims to make electric vehicles accessible to more buyers than ever before.

## What This Means for Buyers
The increased competition in the EV market is great news for consumers. Prices are becoming more competitive, ranges are improving, and charging infrastructure continues to expand.

Whether you're looking for luxury, performance, or affordability, 2024 has an electric vehicle for you.`,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop",
    category: "Electric Vehicles",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    featured: true,
    tags: ["Electric Vehicles", "Tesla", "BMW", "Chevrolet", "2024"]
  },
  {
    id: "2",
    title: "How to Get the Best Trade-In Value for Your Car",
    slug: "best-trade-in-value-car",
    excerpt: "Expert tips to maximize your car's trade-in value and get the best deal when buying your next vehicle.",
    content: `Trading in your car can be a convenient way to offset the cost of your next vehicle, but getting the best value requires some preparation.

## Clean and Detail Your Car
First impressions matter. A clean car suggests it's been well-maintained. Consider a professional detail before your appraisal.

## Gather Maintenance Records
Documented service history can add significant value. It shows you've taken care of the vehicle properly.

## Research Your Car's Value
Use tools like Kelley Blue Book and Edmunds to understand what your car is worth. Knowledge is power in negotiations.

## Fix Minor Issues
Small repairs like replacing worn wiper blades or fixing minor dents can pay for themselves in increased trade-in value.

## Time It Right
Some times of year are better for certain types of vehicles. Convertibles fetch more in spring, while SUVs are in demand before winter.`,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop",
    category: "Buying Guide",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-12",
    readTime: "4 min read",
    featured: false,
    tags: ["Trade-In", "Car Buying", "Tips", "Value"]
  },
  {
    id: "3",
    title: "SUV vs Sedan: Which is Right for Your Family?",
    slug: "suv-vs-sedan-family",
    excerpt: "Comparing the pros and cons of SUVs and sedans to help you make the best choice for your family's needs.",
    content: `Choosing between an SUV and a sedan is one of the most common dilemmas facing car buyers today. Let's break down the key considerations.

## Space and Practicality
SUVs generally offer more cargo space and passenger room. If you have a growing family or frequently carry large items, an SUV might be the better choice.

## Fuel Efficiency
Sedans typically get better gas mileage due to their lighter weight and more aerodynamic design. Over the life of the vehicle, this can mean significant savings.

## Safety Considerations
Both body styles offer excellent safety features. However, SUVs' higher ride height can provide better visibility, while sedans' lower center of gravity can mean better handling.

## Cost Comparison
Sedans are generally less expensive to purchase and maintain. Insurance rates also tend to be lower for sedans.

## The Verdict
There's no one-size-fits-all answer. Consider your daily commute, family size, and lifestyle before making your decision.`,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop",
    category: "Comparison",
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    featured: true,
    tags: ["SUV", "Sedan", "Family Cars", "Comparison"]
  },
  {
    id: "4",
    title: "Essential Car Maintenance Tips for Winter",
    slug: "car-maintenance-tips-winter",
    excerpt: "Keep your vehicle running smoothly through the coldest months with these essential winter maintenance tips.",
    content: `Winter can be tough on vehicles. Here's how to keep your car in top condition during the cold months.

## Check Your Battery
Cold weather puts extra strain on batteries. Have yours tested before winter hits and replace it if it's showing signs of weakness.

## Inspect Your Tires
Consider winter tires if you live in an area with heavy snow. At minimum, check your tire pressure regularly as it drops in cold weather.

## Top Off Fluids
Make sure your antifreeze is at the proper concentration. Also check your windshield washer fluid and use a winter-rated formula.

## Emergency Kit
Keep an emergency kit in your car including blankets, flashlight, snacks, and a phone charger.

## Wash Regularly
Salt and road chemicals can damage your car's finish. Wash your car regularly, paying attention to the undercarriage.`,
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&auto=format&fit=crop",
    category: "Maintenance",
    author: {
      name: "Emily Martinez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-08",
    readTime: "4 min read",
    featured: false,
    tags: ["Maintenance", "Winter", "Tips", "Car Care"]
  },
  {
    id: "5",
    title: "The Rise of Hybrid Vehicles: Are They Worth It?",
    slug: "rise-of-hybrid-vehicles",
    excerpt: "Exploring the benefits and drawbacks of hybrid vehicles to help you decide if one is right for you.",
    content: `Hybrid vehicles have come a long way since the original Prius. Today's hybrids offer impressive performance alongside excellent fuel efficiency.

## How Hybrids Work
Hybrid vehicles combine a traditional gasoline engine with an electric motor. This allows them to achieve better fuel economy than conventional vehicles.

## Types of Hybrids
- **Mild Hybrids**: Small electric motor assists the gas engine
- **Full Hybrids**: Can run on electric power alone at low speeds
- **Plug-in Hybrids**: Larger battery that can be charged externally

## Cost Considerations
While hybrids often cost more upfront, fuel savings can offset this over time. Many areas also offer tax incentives for hybrid purchases.

## Environmental Impact
Hybrids produce fewer emissions than traditional vehicles, making them a more environmentally friendly choice.

## Should You Buy One?
If you do a lot of city driving, a hybrid could be an excellent choice. For long highway commutes, a traditional fuel-efficient car might make more sense.`,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    category: "Technology",
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-05",
    readTime: "5 min read",
    featured: false,
    tags: ["Hybrid", "Technology", "Fuel Efficiency", "Green Cars"]
  },
  {
    id: "6",
    title: "Top 10 Safety Features to Look for in Your Next Car",
    slug: "top-safety-features-next-car",
    excerpt: "Modern cars come with advanced safety features. Here's what to prioritize when shopping for your next vehicle.",
    content: `Car safety technology has advanced dramatically in recent years. Here are the top features you should look for.

## 1. Automatic Emergency Braking
This system can detect obstacles and apply the brakes if you don't react in time.

## 2. Lane Departure Warning
Alerts you when you unintentionally drift out of your lane.

## 3. Blind Spot Monitoring
Uses sensors to detect vehicles in your blind spots.

## 4. Adaptive Cruise Control
Automatically adjusts your speed to maintain a safe following distance.

## 5. Rearview Camera
Now required on all new vehicles, cameras help you see what's behind you when reversing.

## 6. Forward Collision Warning
Warns you of potential front-end collisions.

## 7. Lane Keep Assist
Actively steers to keep you centered in your lane.

## 8. Pedestrian Detection
Identifies pedestrians and can automatically brake if necessary.

## 9. Rear Cross-Traffic Alert
Warns of vehicles approaching from the side when backing up.

## 10. Driver Attention Monitoring
Detects signs of drowsiness and suggests taking a break.`,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&auto=format&fit=crop",
    category: "Safety",
    author: {
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-03",
    readTime: "7 min read",
    featured: true,
    tags: ["Safety", "Technology", "Car Features", "Buying Guide"]
  },
  {
    id: "7",
    title: "Understanding Car Financing: A Complete Guide",
    slug: "understanding-car-financing-guide",
    excerpt: "Everything you need to know about financing your next car purchase, from credit scores to loan terms.",
    content: `Financing a car can seem complicated, but understanding the basics can help you get a better deal.

## Know Your Credit Score
Your credit score significantly impacts your interest rate. Check your score before shopping and work on improving it if needed.

## Types of Financing
- **Dealership Financing**: Convenient but not always the best rate
- **Bank Loans**: Often competitive rates, especially for existing customers
- **Credit Unions**: Frequently offer the best rates to members

## Understanding Loan Terms
Longer loan terms mean lower monthly payments but more interest paid overall. Aim for the shortest term you can comfortably afford.

## Down Payments
A larger down payment means less to finance and lower monthly payments. Aim for at least 20% down.

## Pre-Approval
Getting pre-approved before visiting a dealership gives you negotiating power and helps you stick to your budget.

## Hidden Costs
Don't forget to factor in taxes, registration, and insurance when calculating your total cost.`,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    category: "Finance",
    author: {
      name: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop"
    },
    publishedAt: "2024-01-01",
    readTime: "6 min read",
    featured: false,
    tags: ["Finance", "Car Buying", "Credit", "Loans"]
  },
  {
    id: "8",
    title: "Best Fuel-Efficient Cars of 2024",
    slug: "best-fuel-efficient-cars-2024",
    excerpt: "Save money at the pump with these top fuel-efficient vehicles available this year.",
    content: `With gas prices fluctuating, fuel efficiency remains a top priority for many car buyers. Here are the best options for 2024.

## Toyota Prius
The king of hybrids returns with a stunning redesign and even better fuel economy.

## Honda Civic
A perennial favorite, the Civic offers excellent efficiency in a practical package.

## Hyundai Ioniq 6
This sleek electric sedan offers impressive range and efficiency.

## Mazda 3
Proves that fuel efficiency doesn't mean sacrificing driving pleasure.

## Kia Niro
Available as a hybrid, plug-in hybrid, or full electric.

## Tips for Maximizing Fuel Economy
- Keep tires properly inflated
- Avoid aggressive acceleration
- Use cruise control on highways
- Remove unnecessary weight from your vehicle
- Keep up with regular maintenance`,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop",
    category: "Reviews",
    author: {
      name: "Amanda Foster",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
    },
    publishedAt: "2023-12-28",
    readTime: "5 min read",
    featured: false,
    tags: ["Fuel Efficiency", "2024", "Reviews", "Best Cars"]
  }
];

export const newsCategories = [
  "All",
  "Electric Vehicles",
  "Buying Guide",
  "Comparison",
  "Maintenance",
  "Technology",
  "Safety",
  "Finance",
  "Reviews"
];
