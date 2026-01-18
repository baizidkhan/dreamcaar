import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(48);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * loanTenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              <Calculator className="w-4 h-4" />
              Financial Tools
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              EMI Calculator
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Plan your car purchase with our easy EMI calculator. Get instant estimates 
              for monthly payments based on your budget.
            </p>

            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Loan Amount
                  </label>
                  <span className="font-bold text-primary">${loanAmount.toLocaleString()}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={5000}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>$5,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <Percent className="w-4 h-4 text-primary" />
                    Interest Rate (p.a.)
                  </label>
                  <span className="font-bold text-primary">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={5}
                  max={20}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    Loan Tenure
                  </label>
                  <span className="font-bold text-primary">{loanTenure} months</span>
                </div>
                <Slider
                  value={[loanTenure]}
                  onValueChange={([value]) => setLoanTenure(value)}
                  min={12}
                  max={84}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>12 months</span>
                  <span>84 months</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 shadow-card-hover border border-border"
          >
            <div className="text-center mb-8">
              <span className="text-muted-foreground text-sm">Your Monthly EMI</span>
              <motion.div
                key={emi}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-5xl md:text-6xl font-bold gradient-text mt-2"
              >
                ${emi.toLocaleString()}
              </motion.div>
              <span className="text-muted-foreground text-sm">per month</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Principal Amount</span>
                <span className="font-semibold">${loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-semibold text-primary">${totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium">Total Amount Payable</span>
                <span className="font-bold text-lg">${totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="mb-6">
              <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-primary rounded-l-full"
                  style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                />
                <div 
                  className="bg-primary/30 rounded-r-full"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Principal
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/30" />
                  Interest
                </span>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply for Car Loan
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
