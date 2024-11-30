import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTAWizard from "./components/AddTAWizard";
import AddGPTWizard from "./components/AddGPTWizard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-ta" element={<AddTAWizard />} />
          <Route path="/add-gpt" element={<AddGPTWizard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;