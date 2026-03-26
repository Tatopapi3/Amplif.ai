import { motion } from "framer-motion";
import { Sparkles, Search, MessageSquare, PartyPopper } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Fill out your profile and our AI finds neighbors who share your skills, hobbies, and music taste — from your block to your borough.",
  },
  {
    icon: Search,
    title: "Neighbor Directory",
    description: "Browse New Yorkers in your area. Search by skill, filter by borough, and reach out with a single click.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messages",
    description: "Coordinate skill swaps, plan meetups, or just say what's good. Simple 1-on-1 chat that keeps it moving.",
  },
  {
    icon: PartyPopper,
    title: "Block Party Hub",
    description: "Our guided wizard walks you through permits, funding, food sign-ups, and entertainment. From Flatbush to Flushing.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">How it works</span>
          <h2 className="text-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Everything your block needs
          </h2>
          <p className="text-muted-foreground text-lg">
            Four tools to turn five boroughs of strangers into one connected city.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-background rounded-2xl p-8 border hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-display text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
