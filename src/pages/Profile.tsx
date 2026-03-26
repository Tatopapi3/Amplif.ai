import { useState } from "react";
import { ArrowRight, ArrowLeft, User, Wrench, Music, Heart, MapPin, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const steps = [
  { id: 1, title: "About You", icon: User, description: "Basic info" },
  { id: 2, title: "Skills", icon: Wrench, description: "What you offer & need" },
  { id: 3, title: "Interests", icon: Heart, description: "Hobbies & music" },
  { id: 4, title: "Visibility", icon: Shield, description: "Connection scope" },
];

const allSkills = [
  "Plumbing", "Carpentry", "Cooking", "Baking", "Coding", "Tutoring",
  "Photography", "Graphic Design", "Gardening", "Painting", "DJ",
  "Event Planning", "Yoga", "Pet Sitting", "Babysitting", "Meal Prep",
  "PC Repair", "Networking", "Furniture Repair", "Catering", "Sewing",
  "Music Lessons", "Language Tutoring", "Tax Help", "Legal Advice",
];

const allHobbies = [
  "Running", "Basketball", "Cycling", "Yoga", "Reading", "Gaming",
  "Cooking", "Gardening", "Photography", "Painting", "Dancing",
  "Board Games", "Movies", "Hiking", "Fishing", "Knitting",
  "Volunteering", "Travel", "Podcasts", "Thrifting",
];

const musicGenres = [
  "Hip Hop", "R&B", "Reggaeton", "Salsa", "Bachata", "Jazz",
  "Rock", "Pop", "Indie", "Classical", "Gospel", "Afrobeats",
  "House", "Techno", "Country", "K-Pop", "Latin Trap", "Dancehall",
];

const boroughs = [
  { value: "manhattan", label: "Manhattan" },
  { value: "brooklyn", label: "Brooklyn" },
  { value: "queens", label: "Queens" },
  { value: "bronx", label: "The Bronx" },
  { value: "staten-island", label: "Staten Island" },
];

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [borough, setBorough] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [block, setBlock] = useState("");
  const [skillsHave, setSkillsHave] = useState<string[]>([]);
  const [skillsNeed, setSkillsNeed] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [music, setMusic] = useState<string[]>([]);
  const [connectionScope, setConnectionScope] = useState("neighborhood");
  const [openToConnect, setOpenToConnect] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <motion.div
            className="text-center max-w-lg mx-auto px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-display text-4xl font-bold mb-4">You're in, neighbor!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Our AI is now crunching your profile to find your best matches across{" "}
              {connectionScope === "block" ? "your block" : connectionScope === "neighborhood" ? "your neighborhood" : connectionScope === "borough" ? "your borough" : "all of NYC"}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/matches">
                  See my matches <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/directory">Browse directory</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-display text-4xl md:text-5xl font-bold mb-4">Build Your Profile</h1>
            <p className="text-muted-foreground text-lg">Tell us about yourself so we can match you with the right neighbors.</p>
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
                    <step.icon className="h-4 w-4" />
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
                    <h2 className="text-display text-2xl font-bold mb-2">About You</h2>
                    <p className="text-muted-foreground mb-6">Let your neighbors know who you are.</p>
                    <div className="space-y-5">
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Full name</Label>
                        <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Short bio</Label>
                        <Textarea
                          placeholder="Tell your neighbors a little about yourself..."
                          value={bio}
                          onChange={e => setBio(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Borough</Label>
                        <div className="flex flex-wrap gap-2">
                          {boroughs.map(b => (
                            <button
                              key={b.value}
                              onClick={() => setBorough(b.value)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                borough === b.value
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-foreground border-border hover:border-primary/50"
                              )}
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Neighborhood</Label>
                        <Input placeholder="e.g. Bed-Stuy, Astoria, Washington Heights..." value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Block (optional)</Label>
                        <Input placeholder="e.g. Dekalb Ave between Nostrand & Marcy" value={block} onChange={e => setBlock(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Your Skills</h2>
                    <p className="text-muted-foreground mb-6">What can you offer the community, and what do you need?</p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" /> Skills I Have
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map(skill => (
                          <button
                            key={skill}
                            onClick={() => toggleItem(skill, skillsHave, setSkillsHave)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                              skillsHave.includes(skill)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-foreground border-border hover:border-primary/50"
                            )}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent" /> Skills I Need
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map(skill => (
                          <button
                            key={skill}
                            onClick={() => toggleItem(skill, skillsNeed, setSkillsNeed)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                              skillsNeed.includes(skill)
                                ? "bg-accent text-accent-foreground border-accent"
                                : "bg-background text-foreground border-border hover:border-accent/50"
                            )}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Interests & Vibes</h2>
                    <p className="text-muted-foreground mb-6">What do you do for fun? This helps us find neighbors you'll click with.</p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold mb-3">Hobbies</h3>
                      <div className="flex flex-wrap gap-2">
                        {allHobbies.map(hobby => (
                          <button
                            key={hobby}
                            onClick={() => toggleItem(hobby, hobbies, setHobbies)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                              hobbies.includes(hobby)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-foreground border-border hover:border-primary/50"
                            )}
                          >
                            {hobby}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Music className="h-4 w-4" /> Music Taste
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {musicGenres.map(genre => (
                          <button
                            key={genre}
                            onClick={() => toggleItem(genre, music, setMusic)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                              music.includes(genre)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-foreground border-border hover:border-primary/50"
                            )}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="bg-card rounded-2xl border p-8">
                    <h2 className="text-display text-2xl font-bold mb-2">Connection Scope</h2>
                    <p className="text-muted-foreground mb-6">Control who can discover and connect with you.</p>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-background border">
                        <div>
                          <p className="font-medium text-sm">Open to connections</p>
                          <p className="text-xs text-muted-foreground">Allow neighbors to find and message you</p>
                        </div>
                        <Switch checked={openToConnect} onCheckedChange={setOpenToConnect} />
                      </div>

                      {openToConnect && (
                        <div>
                          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Who can see your profile?
                          </h3>
                          <RadioGroup value={connectionScope} onValueChange={setConnectionScope} className="space-y-3">
                            <label className="flex items-center gap-3 p-4 rounded-xl bg-background border cursor-pointer hover:border-primary/50 transition-colors">
                              <RadioGroupItem value="block" id="block" />
                              <div>
                                <p className="font-medium text-sm">My Block Only</p>
                                <p className="text-xs text-muted-foreground">Only neighbors on your specific block can find you</p>
                              </div>
                            </label>
                            <label className="flex items-center gap-3 p-4 rounded-xl bg-background border cursor-pointer hover:border-primary/50 transition-colors">
                              <RadioGroupItem value="neighborhood" id="neighborhood" />
                              <div>
                                <p className="font-medium text-sm">My Neighborhood</p>
                                <p className="text-xs text-muted-foreground">Anyone in your neighborhood (e.g. Bed-Stuy, Astoria)</p>
                              </div>
                            </label>
                            <label className="flex items-center gap-3 p-4 rounded-xl bg-background border cursor-pointer hover:border-primary/50 transition-colors">
                              <RadioGroupItem value="borough" id="borough" />
                              <div>
                                <p className="font-medium text-sm">My Borough</p>
                                <p className="text-xs text-muted-foreground">All of {boroughs.find(b => b.value === borough)?.label || "your borough"}</p>
                              </div>
                            </label>
                            <label className="flex items-center gap-3 p-4 rounded-xl bg-background border cursor-pointer hover:border-primary/50 transition-colors">
                              <RadioGroupItem value="citywide" id="citywide" />
                              <div>
                                <p className="font-medium text-sm">All of NYC</p>
                                <p className="text-xs text-muted-foreground">Connect with New Yorkers across all five boroughs</p>
                              </div>
                            </label>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentStep < 4 ? (
                <Button onClick={() => setCurrentStep(s => Math.min(4, s + 1))}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Sparkles className="mr-2 h-4 w-4" /> Find my matches
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
