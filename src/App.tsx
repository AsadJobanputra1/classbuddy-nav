import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTAWizard from "./components/AddTAWizard";
import AddGPTWizard from "./components/AddGPTWizard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-ta" element={<AddTAWizard />} />
        <Route path="/add-gpt" element={<AddGPTWizard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
