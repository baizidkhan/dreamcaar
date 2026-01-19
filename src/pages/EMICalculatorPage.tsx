import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, DollarSign, Percent, Calendar, TrendingUp,
  PiggyBank, CreditCard, Building, CheckCircle, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const banks = [
  { name: "HDFC Bank", rate: 8.5, logo: "🏦" },
  { name: "ICICI Bank", rate: 8.75, logo: "🏛️" },
  { name: "SBI", rate: 8.25, logo: "🏪" },
  { name: "Axis Bank", rate: 8.9, logo: "🏢" },
  { name: "Kotak Bank", rate: 8.65, logo: "💳" },
];

const EMICalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(48);
  const [downPayment, setDownPayment] = useState(5000);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const calculations = useMemo(() => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    // Create amortization schedule (simplified)
    const schedule = [];
    let balance = principal;
    for (let i = 1; i <= Math.min(12, months); i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      schedule.push({
        month: i,
        emi: emi,
        principal: principalPaid,
        interest: interest,
        balance: Math.max(0, balance)
      });
    }
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal,
      schedule
    };
  }, [loanAmount, interestRate, loanTenure, downPayment]);

  const selectBank = (bank: typeof banks[0]) => {
    setSelectedBank(bank.name);
    setInterestRate(bank.rate);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              <Calculator className="w-4 h-4" />
              Financial Planning Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Car Loan <span className="gradient-text">EMI Calculator</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your car purchase with our advanced EMI calculator. Compare rates from top banks
              and find the best financing option for your budget.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Main Calculator Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Loan Details
                </h2>

                <div className="space-y-8">
                  {/* Car Price / Loan Amount */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="flex items-center gap-2 font-medium">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Car Price
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${loanAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={([value]) => setLoanAmount(value)}
                      min={5000}
                      max={150000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>$5,000</span>
                      <span>$150,000</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="flex items-center gap-2 font-medium">
                        <PiggyBank className="w-4 h-4 text-primary" />
                        Down Payment
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${downPayment.toLocaleString()}</span>
                        <Badge variant="secondary">
                          {Math.round((downPayment / loanAmount) * 100)}%
                        </Badge>
                      </div>
                    </div>
                    <Slider
                      value={[downPayment]}
                      onValueChange={([value]) => setDownPayment(value)}
                      min={0}
                      max={loanAmount * 0.5}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>$0</span>
                      <span>${(loanAmount * 0.5).toLocaleString()} (50%)</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="flex items-center gap-2 font-medium">
                        <Percent className="w-4 h-4 text-primary" />
                        Interest Rate (p.a.)
                      </label>
                      <span className="text-2xl font-bold text-primary">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={([value]) => {
                        setInterestRate(value);
                        setSelectedBank(null);
                      }}
                      min={5}
                      max={20}
                      step={0.25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
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
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{loanTenure}</span>
                        <span className="text-muted-foreground">months</span>
                        <Badge variant="secondary">{Math.round(loanTenure / 12)} years</Badge>
                      </div>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={([value]) => setLoanTenure(value)}
                      min={12}
                      max={84}
                      step={6}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1 year</span>
                      <span>7 years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Comparison */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Compare Bank Rates
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {banks.map((bank) => (
                    <button
                      key={bank.name}
                      onClick={() => selectBank(bank)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedBank === bank.name
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{bank.logo}</div>
                      <div className="font-medium text-sm">{bank.name}</div>
                      <div className="text-primary font-bold">{bank.rate}%</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amortization Schedule */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Payment Schedule (First 12 Months)
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Month</th>
                        <th className="text-right py-3 px-4 font-semibold">EMI</th>
                        <th className="text-right py-3 px-4 font-semibold">Principal</th>
                        <th className="text-right py-3 px-4 font-semibold">Interest</th>
                        <th className="text-right py-3 px-4 font-semibold">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.schedule.map((row, idx) => (
                        <tr key={row.month} className={idx % 2 === 0 ? "bg-secondary/30" : ""}>
                          <td className="py-3 px-4">{row.month}</td>
                          <td className="py-3 px-4 text-right font-medium">${Math.round(row.emi).toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-green-600">${Math.round(row.principal).toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-orange-500">${Math.round(row.interest).toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">${Math.round(row.balance).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Result Card - Sticky */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card-hover">
                  <div className="text-center mb-6">
                    <span className="text-muted-foreground text-sm">Your Monthly EMI</span>
                    <motion.div
                      key={calculations.emi}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-bold gradient-text mt-2"
                    >
                      ${calculations.emi.toLocaleString()}
                    </motion.div>
                    <span className="text-muted-foreground text-sm">per month</span>
                  </div>

                  {/* Loan Summary */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Principal Amount</span>
                      <span className="font-semibold">${calculations.principal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Total Interest</span>
                      <span className="font-semibold text-orange-500">${calculations.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="font-medium">Total Amount Payable</span>
                      <span className="font-bold text-lg">${calculations.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="mb-6">
                    <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-primary rounded-l-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(calculations.principal / calculations.totalAmount) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="bg-orange-400 rounded-r-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(calculations.totalInterest / calculations.totalAmount) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary" />
                        Principal ({Math.round((calculations.principal / calculations.totalAmount) * 100)}%)
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-400" />
                        Interest ({Math.round((calculations.totalInterest / calculations.totalAmount) * 100)}%)
                      </span>
                    </div>
                  </div>

                  <Button className="w-full gap-2" size="lg">
                    <CreditCard className="w-5 h-5" />
                    Apply for Car Loan
                  </Button>
                </div>

                {/* Tips Card */}
                <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Higher down payment reduces monthly EMI and total interest
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Shorter loan tenure saves money on interest
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Compare rates from multiple banks before applying
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      Maintain good credit score for better rates
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EMICalculatorPage;
