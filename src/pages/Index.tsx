import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BrandShowcase } from "@/components/BrandShowcase";
import { FeaturedCars } from "@/components/FeaturedCars";
import { CarCategories } from "@/components/CarCategories";
import { CompareSection } from "@/components/CompareSection";
import { EMICalculator } from "@/components/EMICalculator";
import { TrustBadges } from "@/components/TrustBadges";
import { SellCarCTA } from "@/components/SellCarCTA";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrandShowcase />
      <FeaturedCars />
      <CarCategories />
      <CompareSection />
      <EMICalculator />
      <TrustBadges />
      <SellCarCTA />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
