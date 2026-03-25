import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-display text-xl font-bold text-primary">amplif.ai</span>
          <p className="text-sm text-muted-foreground mt-1">Your neighborhood, amplified.</p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/directory" className="hover:text-foreground transition-colors">Directory</Link>
          <Link to="/messages" className="hover:text-foreground transition-colors">Messages</Link>
          <Link to="/block-party" className="hover:text-foreground transition-colors">Block Party</Link>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
        © 2026 Amplif.ai. Built for neighbors, by neighbors.
      </div>
    </div>
  </footer>
);

export default Footer;
