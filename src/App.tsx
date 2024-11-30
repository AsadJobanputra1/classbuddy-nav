import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GPTs from "./pages/GPTs";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import AddTAWizard from "./components/AddTAWizard";
import AddGPTWizard from "./components/AddGPTWizard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-ta" element={<AddTAWizard />} />
          <Route path="/gpts" element={<GPTs />} />
          <Route path="/create-gpt" element={<AddGPTWizard />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;