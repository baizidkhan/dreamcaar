import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, X, MessageSquare, Headphones, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const contactReasons = [
  { label: "Buy a Car", icon: "🚗" },
  { label: "Sell a Car", icon: "💰" },
  { label: "General Inquiry", icon: "❓" },
  { label: "Support", icon: "🛠️" },
];

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email is required";
    if (!message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowThankYou(true);
  };

  const closeThankYou = () => {
    setShowThankYou(false);
    setName(""); setEmail(""); setPhone(""); setReason(""); setMessage("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a question or need help? We'd love to hear from you. Our team is ready to assist.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Phone, label: "Call Us", value: "+91 98765 43210", color: "text-primary" },
              { icon: Mail, label: "Email Us", value: "hello@carvault.com", color: "text-primary" },
              { icon: MapPin, label: "Visit Us", value: "Mumbai, India", color: "text-primary" },
              { icon: Clock, label: "Working Hours", value: "Mon–Sat, 9AM–7PM", color: "text-primary" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center hover:border-primary/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-sm mt-1">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Form + Side */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card space-y-5"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Send Us a Message
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                  <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <Input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Select a reason</option>
                    {contactReasons.map((r) => (
                      <option key={r.label} value={r.label}>{r.icon} {r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Message *</label>
                <Textarea
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </motion.form>

            {/* Side Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">24/7 Customer Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our dedicated support team is available round the clock to help you with any queries about buying or selling cars.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Visit Our Showroom</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Come visit us to explore our collection of verified cars in person.
                </p>
                <p className="text-sm font-medium">
                  CarVault HQ<br />
                  Bandra Kurla Complex<br />
                  Mumbai, Maharashtra 400051
                </p>
              </div>

              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 text-center">
                <p className="text-3xl mb-2">🚀</p>
                <h3 className="font-bold mb-1">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within <span className="text-primary font-semibold">2 hours</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeThankYou}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl border border-border p-8 md:p-10 max-w-md w-full text-center shadow-2xl relative"
            >
              <button
                onClick={closeThankYou}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-primary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold font-heading mb-3"
              >
                Thank You! 🎉
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                Your message has been received. Our team will get back to you within <span className="text-primary font-semibold">2 hours</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={closeThankYou} size="lg" className="w-full">
                  Got it!
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUs;
