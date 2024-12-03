import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTAWizard from "./components/AddTAWizard";
import AddGPTWizard from "./components/AddGPTWizard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import GPTs from "./pages/GPTs";
import VirtualTAs from "./pages/VirtualTAs";
import Chat from "./pages/Chat";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<VirtualTAs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-ta" element={<AddTAWizard />} />
          <Route path="/create-gpt" element={<AddGPTWizard />} />
          <Route path="/add-gpt" element={<AddGPTWizard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gpts" element={<GPTs />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;