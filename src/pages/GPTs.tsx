import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import GPTCard from "@/components/GPTCard";
import GPTCategoryList from "@/components/GPTCategoryList";
import { gptsApi } from "@/apis/gpts";

const GPTs = () => {
  const [categories, setCategories] = useState([]);
  const [gpts, setGPTs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchGPTs();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("gpt_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  const fetchGPTs = async () => {
    try {
      const data = await gptsApi.getAll(selectedCategory);
      setGPTs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch GPTs",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGPTs();
  }, [selectedCategory]);

  const handleDelete = async (id: string) => {
    try {
      await gptsApi.delete(id);
      toast({
        title: "Success",
        description: "GPT deleted successfully",
      });
      fetchGPTs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete GPT",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeature = async (id: string, featured: boolean) => {
    try {
      await gptsApi.toggleFeature(id, featured);
      toast({
        title: "Success",
        description: `GPT ${featured ? "featured" : "unfeatured"} successfully`,
      });
      fetchGPTs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update GPT",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopNav />
      <GPTCategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main className="ml-[32rem] pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">GPTs</h1>
            <Button onClick={() => navigate("/create-gpt")}>
              <Plus className="w-5 h-5 mr-2" />
              Create GPT
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gpts.map((gpt) => (
              <GPTCard
                key={gpt.id}
                {...gpt}
                onDelete={handleDelete}
                onToggleFeature={handleToggleFeature}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GPTs;