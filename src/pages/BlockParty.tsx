import { useState } from "react";
import { Check, FileText, DollarSign, UtensilsCrossed, Music, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Legalities", icon: FileText, description: "Get your permits sorted" },
  { id: 2, title: "Funding", icon: DollarSign, description: "Collect neighborhood dues" },
  { id: 3, title: "Logistics", icon: UtensilsCrossed, description: "Organize food & equipment" },
  { id: 4, title: "Entertainment", icon: Music, description: "Book vendors & activities" },
];

const permits = [
  { id: "street", label: "Street closure permit", link: "#" },
  { id: "noise", label: "Noise ordinance exemption", link: "#" },
  { id: "food", label: "Food handling permit", link: "#" },
  { id: "liability", label: "Liability insurance", link: "#" },
];

const foodItems = [
  { id: "grill", label: "Grill / BBQ", claimed: "Tom K." },
  { id: "salad", label: "Green salad", claimed: "" },
  { id: "dessert", label: "Desserts", claimed: "Maria S." },
  { id: "drinks", label: "Drinks & ice", claimed: "" },
  { id: "plates", label: "Plates & utensils", claimed: "Priya P." },
  { id: "tables", label: "Folding tables (2+)", claimed: "" },
];

const vendors = [
  { name: "DJ Mike", category: "Music", rating: "4.8", price: "$150" },
  { name: "Bounce Town", category: "Kids Activities", rating: "4.9", price: "$200" },
  { name: "Taco Truck Maria", category: "Catering", rating: "4.7", price: "$300" },
  { name: "Face Paint Fiona", category: "Kids Activities", rating: "5.0", price: "$75" },
];

const BlockParty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkedPermits, setCheckedPermits] = useState<string[]>([]);

  const togglePermit = (id: string) => {
    setCheckedPermits((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-display text-4xl md:text-5xl font-bold mb-4">Block Party Hub</h1>
            <p className="text-muted-foreground text-lg">Plan your neighborhood event in four easy steps.</p>
          </div>

          {/* Step indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>
                  {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Permits & Legalities</h2>
                    <p className="text-muted-foreground mb-6">Check off each item as you complete it. Links go to your local government forms.</p>
                    <div className="space-y-4">
                      {permits.map((p) => (
                        <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                          <Checkbox checked={checkedPermits.includes(p.id)} onCheckedChange={() => togglePermit(p.id)} />
                          <span className={cn("flex-1", checkedPermits.includes(p.id) && "line-through text-muted-foreground")}>{p.label}</span>
                          <a href={p.link} className="text-xs text-primary hover:underline">Get form →</a>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Funding</h2>
                    <p className="text-muted-foreground mb-6">Set up a payment link for collecting neighborhood contributions.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Event budget goal</label>
                        <Input placeholder="$500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Suggested contribution per household</label>
                        <Input placeholder="$25" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Payment link (Venmo, Stripe, etc.)</label>
                        <Input placeholder="https://venmo.com/your-link" />
                      </div>
                      <Button className="w-full">Generate shareable link</Button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Logistics</h2>
                    <p className="text-muted-foreground mb-6">Sign up for potluck items and equipment. Click to claim open items.</p>
                    <div className="space-y-3">
                      {foodItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background border">
                          <span className="font-medium text-sm">{item.label}</span>
                          {item.claimed ? (
                            <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">✓ {item.claimed}</span>
                          ) : (
                            <Button size="sm" variant="outline">Claim</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Entertainment</h2>
                    <p className="text-muted-foreground mb-6">Browse community-approved vendors for your event.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {vendors.map((v) => (
                        <div key={v.name} className="p-4 rounded-xl bg-background border hover:shadow-md transition-shadow">
                          <h3 className="font-semibold text-sm">{v.name}</h3>
                          <p className="text-xs text-muted-foreground">{v.category}</p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-primary">⭐ {v.rating}</span>
                            <span className="text-sm font-semibold">{v.price}</span>
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-3">Book</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
                disabled={currentStep === 4}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlockParty;
