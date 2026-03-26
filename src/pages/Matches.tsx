import { useState, useEffect } from "react";
import { MessageCircle, Sparkles, Music, Heart, Wrench, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const matchedNeighbors = [
  {
    id: 1,
    name: "Maria Santos",
    avatar: "MS",
    bio: "Retired teacher. Love gardening and baking sourdough. Bed-Stuy for 20 years.",
    borough: "Brooklyn",
    neighborhood: "Bed-Stuy",
    matchScore: 94,
    matchReasons: ["You both love Gardening", "She has Baking — you need it", "Shared love for Salsa & Jazz"],
    skillsHave: ["Baking", "Tutoring", "Gardening"],
    hobbies: ["Gardening", "Cooking", "Reading"],
    music: ["Salsa", "Jazz", "Gospel"],
    scope: "neighborhood",
  },
  {
    id: 2,
    name: "James Chen",
    avatar: "JC",
    bio: "Software engineer in Astoria. Happy to help with anything tech. Big basketball fan.",
    borough: "Queens",
    neighborhood: "Astoria",
    matchScore: 87,
    matchReasons: ["He has Coding — you need it", "You both play Basketball", "Shared love for Hip Hop"],
    skillsHave: ["Coding", "Networking", "PC Repair"],
    hobbies: ["Basketball", "Gaming", "Podcasts"],
    music: ["Hip Hop", "R&B", "House"],
    scope: "citywide",
  },
  {
    id: 3,
    name: "Aisha Johnson",
    avatar: "AJ",
    bio: "Licensed plumber and weekend DJ from Harlem. Block party ready!",
    borough: "Manhattan",
    neighborhood: "Harlem",
    matchScore: 82,
    matchReasons: ["She has Plumbing — you need it", "She DJs the genres you love", "Both into Event Planning"],
    skillsHave: ["Plumbing", "DJ", "Event Planning"],
    hobbies: ["Dancing", "Volunteering", "Movies"],
    music: ["Hip Hop", "Afrobeats", "House", "Dancehall"],
    scope: "citywide",
  },
  {
    id: 4,
    name: "Priya Patel",
    avatar: "PP",
    bio: "Photographer and yoga instructor. Just moved to Park Slope from the Bronx!",
    borough: "Brooklyn",
    neighborhood: "Park Slope",
    matchScore: 78,
    matchReasons: ["She has Photography — you need it", "You both do Yoga", "Shared love for Indie & K-Pop"],
    skillsHave: ["Photography", "Yoga", "Graphic Design"],
    hobbies: ["Yoga", "Photography", "Hiking"],
    music: ["Indie", "K-Pop", "R&B"],
    scope: "borough",
  },
  {
    id: 5,
    name: "David Okafor",
    avatar: "DO",
    bio: "Chef at a downtown restaurant. Will cook for favors! Crown Heights native.",
    borough: "Brooklyn",
    neighborhood: "Crown Heights",
    matchScore: 75,
    matchReasons: ["He has Cooking — you need it", "Both love Afrobeats", "You both enjoy Volunteering"],
    skillsHave: ["Cooking", "Catering", "Meal Prep"],
    hobbies: ["Cooking", "Volunteering", "Travel"],
    music: ["Afrobeats", "R&B", "Dancehall", "Gospel"],
    scope: "neighborhood",
  },
];

const Matches = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-display text-2xl font-bold mb-2">Finding your people...</h2>
            <p className="text-muted-foreground">AI is matching you with neighbors across NYC</p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" /> AI-Powered Matches
            </div>
            <h1 className="text-display text-4xl md:text-5xl font-bold mb-4">Your Neighbor Matches</h1>
            <p className="text-muted-foreground text-lg">
              Based on your skills, hobbies, and music taste — here are the New Yorkers you should know.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {matchedNeighbors.map((neighbor, i) => (
              <motion.div
                key={neighbor.id}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    {neighbor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-display text-lg font-bold">{neighbor.name}</h3>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        neighbor.matchScore >= 90 ? "bg-primary/10 text-primary" :
                        neighbor.matchScore >= 80 ? "bg-accent/10 text-accent" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {neighbor.matchScore}% match
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{neighbor.bio}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {neighbor.neighborhood}, {neighbor.borough}
                    </div>
                  </div>
                </div>

                {/* Match reasons */}
                <div className="bg-primary/5 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Why you matched
                  </p>
                  <ul className="space-y-1">
                    {neighbor.matchReasons.map((reason, j) => (
                      <li key={j} className="text-xs text-foreground/80">• {reason}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Wrench className="h-3 w-3" /> Skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {neighbor.skillsHave.map(s => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Heart className="h-3 w-3" /> Hobbies
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {neighbor.hobbies.map(h => (
                        <Badge key={h} variant="outline" className="text-[10px]">{h}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Music className="h-3 w-3" /> Music
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {neighbor.music.map(m => (
                        <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/messages">
                    <MessageCircle className="mr-2 h-4 w-4" /> Message {neighbor.name.split(" ")[0]}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matches;
