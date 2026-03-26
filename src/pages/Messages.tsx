import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const conversations = [
  { id: 1, name: "Maria Santos", avatar: "MS", lastMessage: "I'd love to help with your garden!", time: "2m ago", unread: true },
  { id: 2, name: "Aisha Johnson", avatar: "AJ", lastMessage: "Can you DJ at the block party?", time: "1h ago", unread: false },
  { id: 3, name: "James Chen", avatar: "JC", lastMessage: "Fixed your WiFi router issue!", time: "3h ago", unread: false },
];

const chatMessages = [
  { id: 1, sender: "them", text: "Hey! I saw you need help with plumbing. I'm a licensed plumber — happy to take a look!", time: "10:30 AM" },
  { id: 2, sender: "me", text: "That would be amazing! It's the kitchen sink — it's been dripping for weeks.", time: "10:32 AM" },
  { id: 3, sender: "them", text: "Easy fix usually. I can come by Saturday morning if that works?", time: "10:33 AM" },
  { id: 4, sender: "me", text: "Perfect. And I noticed you need gardening help — I'd love to trade! I can help with your yard.", time: "10:35 AM" },
  { id: 5, sender: "them", text: "Deal! Community at its best 🤝", time: "10:36 AM" },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Sidebar */}
          <div className="w-80 border-r bg-card flex-shrink-0 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-display text-lg font-bold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c.id)}
                  className={cn(
                    "w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors border-b",
                    activeChat === c.id && "bg-muted"
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-sm">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread && <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {conversations.find((c) => c.id === activeChat)?.avatar}
              </div>
              <span className="font-semibold text-sm">
                {conversations.find((c) => c.id === activeChat)?.name}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2.5",
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn(
                      "text-[10px] mt-1",
                      msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"
                    )}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
