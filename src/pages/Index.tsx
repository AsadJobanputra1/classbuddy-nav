import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import TACard from "../components/TACard";
import { Plus } from "lucide-react";

const Index = () => {
  // Mock data - will be replaced with database data later
  const tas = [
    {
      name: "Dr. Sarah Johnson",
      course: "Introduction to Computer Science",
      email: "sarah.johnson@university.edu",
      schedule: "Mon, Wed 2-4 PM",
    },
    {
      name: "Prof. Michael Chen",
      course: "Data Structures",
      email: "m.chen@university.edu",
      schedule: "Tue, Thu 1-3 PM",
    },
    {
      name: "Dr. Emily Brown",
      course: "Artificial Intelligence",
      email: "e.brown@university.edu",
      schedule: "Wed, Fri 10-12 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopNav />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Virtual Teaching Assistants</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Add New TA
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tas.map((ta, index) => (
              <TACard key={index} {...ta} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;