import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const neighbors = [
  { id: 1, name: "Maria Santos", bio: "Retired teacher. Love gardening and baking sourdough.", avatar: "MS", skillsHave: ["Baking", "Tutoring", "Gardening"], skillsNeed: ["Plumbing", "Tech Help"] },
  { id: 2, name: "James Chen", bio: "Software engineer. Happy to help with anything tech.", avatar: "JC", skillsHave: ["Coding", "Networking", "PC Repair"], skillsNeed: ["Carpentry", "Baking"] },
  { id: 3, name: "Aisha Johnson", bio: "Licensed plumber and weekend DJ. Block party ready!", avatar: "AJ", skillsHave: ["Plumbing", "DJ", "Event Planning"], skillsNeed: ["Gardening"] },
  { id: 4, name: "Tom Kowalski", bio: "Carpenter by trade. Building things is my therapy.", avatar: "TK", skillsHave: ["Carpentry", "Painting", "Furniture Repair"], skillsNeed: ["Coding", "Photography"] },
  { id: 5, name: "Priya Patel", bio: "Photographer and yoga instructor. New to the block!", avatar: "PP", skillsHave: ["Photography", "Yoga", "Graphic Design"], skillsNeed: ["Carpentry", "Cooking"] },
  { id: 6, name: "David Okafor", bio: "Chef at a downtown restaurant. Will cook for favors!", avatar: "DO", skillsHave: ["Cooking", "Catering", "Meal Prep"], skillsNeed: ["Tech Help", "Gardening"] },
];

const Directory = () => {
  const [search, setSearch] = useState("");

  const filtered = neighbors.filter((n) => {
    const q = search.toLowerCase();
    return (
      n.name.toLowerCase().includes(q) ||
      n.skillsHave.some((s) => s.toLowerCase().includes(q)) ||
      n.skillsNeed.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-display text-4xl md:text-5xl font-bold mb-4">Neighbor Directory</h1>
            <p className="text-muted-foreground text-lg mb-8">Find skills, make connections, build community.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((neighbor, i) => (
              <motion.div
                key={neighbor.id}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {neighbor.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{neighbor.name}</h3>
                    <p className="text-xs text-muted-foreground">{neighbor.bio}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Skills I Have</p>
                  <div className="flex flex-wrap gap-1.5">
                    {neighbor.skillsHave.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Skills I Need</p>
                  <div className="flex flex-wrap gap-1.5">
                    {neighbor.skillsNeed.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/messages">
                    <MessageCircle className="mr-2 h-4 w-4" /> Message
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">No neighbors found. Try a different search.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Directory;
