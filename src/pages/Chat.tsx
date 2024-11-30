import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement message sending logic
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopNav />
      <div className="ml-64 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Chat list sidebar */}
          <div className="w-80 border-r border-gray-200 bg-white p-4">
            <Button className="w-full mb-4" variant="default">
              + New Chat
            </Button>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-2">
                <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h3 className="font-medium">My first class notes</h3>
                  <p className="text-sm text-gray-500 truncate">
                    What was covered in the last lecture?
                  </p>
                </div>
                {/* Add more chat items here */}
              </div>
            </ScrollArea>
          </div>

          {/* Chat main area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Sample messages */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700">
                      Hello! How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Chat input */}
            <div className="border-t border-gray-200 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's in your mind?"
                    className="pl-12 pr-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <div className="absolute right-2 flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button size="icon" onClick={handleSend}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;