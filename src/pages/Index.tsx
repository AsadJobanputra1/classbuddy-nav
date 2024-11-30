import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import TACard from "../components/TACard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [tas, setTAs] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchTAs();
  }, []);

  const fetchTAs = async () => {
    try {
      const { data, error } = await supabase
        .from("virtual_tas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTAs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch Virtual TAs",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("virtual_tas")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Virtual TA deleted successfully",
      });
      
      fetchTAs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete Virtual TA",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopNav />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Virtual Teaching Assistants
            </h1>
            <Button onClick={() => navigate("/add-ta")}>
              <Plus className="w-5 h-5 mr-2" />
              Add New TA
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tas.map((ta) => (
              <TACard
                key={ta.id}
                {...ta}
                onDelete={() => handleDelete(ta.id)}
                onEdit={() => navigate(`/edit-ta/${ta.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;