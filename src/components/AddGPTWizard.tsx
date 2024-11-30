import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import GPTBasicInfoStep from "./wizard-steps/GPTBasicInfoStep";
import GPTWelcomeStep from "./wizard-steps/GPTWelcomeStep";
import GPTPromptStep from "./wizard-steps/GPTPromptStep";
import GPTKnowledgebaseStep from "./wizard-steps/GPTKnowledgebaseStep";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

const AddGPTWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const editId = new URLSearchParams(location.search).get('edit');
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    billing_code: "",
    welcome_message: "",
    prompt_questions: [""],
    default_prompt: "",
    ai_guardrails: "",
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (editId) {
      fetchGPTData();
      fetchFiles();
    }
  }, [editId]);

  const fetchGPTData = async () => {
    try {
      const { data, error } = await supabase
        .from("gpts")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          ...data,
          prompt_questions: data.prompt_questions || [""],
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch GPT data",
        variant: "destructive",
      });
      navigate("/gpts");
    }
  };

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from("gpt_files")
        .select("*")
        .eq("gpt_id", editId);

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromptQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formData.prompt_questions];
    newQuestions[index] = value;
    setFormData((prev) => ({
      ...prev,
      prompt_questions: newQuestions,
    }));
  };

  const addPromptQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      prompt_questions: [...prev.prompt_questions, ""],
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = editId
        ? await supabase
            .from("gpts")
            .update(formData)
            .eq("id", editId)
        : await supabase.from("gpts").insert([formData]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `GPT has been ${editId ? 'updated' : 'created'} successfully`,
      });
      
      navigate("/gpts");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editId ? 'update' : 'create'} GPT`,
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GPTBasicInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <GPTWelcomeStep
            formData={formData}
            handleInputChange={handleInputChange}
            handlePromptQuestionChange={handlePromptQuestionChange}
            addPromptQuestion={addPromptQuestion}
          />
        );
      case 3:
        return (
          <GPTPromptStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <GPTKnowledgebaseStep
            gptId={editId}
            files={files}
            onFileUpload={fetchFiles}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Sidebar />
      <TopNav />
      <div className="ml-64 pt-16 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {editId ? 'Edit' : 'Add New'} GPT
            </h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-1/4 h-2 rounded ${
                    i <= step ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 4) handleSubmit();
              else setStep(step + 1);
            }}
            className="space-y-6"
          >
            {renderStep()}

            <div className="flex justify-between pt-4">
              <div>
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
              </div>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/gpts")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {step === 4 ? (editId ? 'Update' : 'Submit') : 'Next'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGPTWizard;