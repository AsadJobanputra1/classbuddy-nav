import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { virtualTAsApi } from "@/apis/virtualTAs";
import BasicInfoStep from "./wizard-steps/BasicInfoStep";
import WelcomeStep from "./wizard-steps/WelcomeStep";
import PromptStep from "./wizard-steps/PromptStep";
import DatasourceStep from "./wizard-steps/DatasourceStep";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

const AddTAWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const editId = new URLSearchParams(location.search).get('edit');
  
  const [formData, setFormData] = useState({
    course: "",
    name: "",
    instructor_name: "",
    instructor_email: "",
    ta_email: "",
    welcome_message: "",
    prompt_questions: [""],
    default_prompt: "",
    ai_guardrails: "",
    teaching_style: "by_the_book",
    no_answer_response: "",
    canvas_enabled: false,
    canvas_api_key: "",
    canvas_course_url: "",
    panopto_enabled: false,
    panopto_api_key: "",
    panopto_course_url: "",
    captioning_enabled: false,
  });

  useEffect(() => {
    if (editId) {
      fetchTAData();
    }
  }, [editId]);

  const fetchTAData = async () => {
    try {
      const data = await virtualTAsApi.getById(editId);
      if (data) {
        setFormData({
          ...data,
          prompt_questions: data.prompt_questions || [""],
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch TA data",
        variant: "destructive",
      });
      navigate("/");
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
      const { data: { user } } = await supabase.auth.getUser();
      
      const submissionData = {
        ...formData,
        last_modified_by: user?.id,
        last_modified: new Date().toISOString()
      };

      if (editId) {
        await virtualTAsApi.update(editId, submissionData);
      } else {
        await virtualTAsApi.create(submissionData);
      }
      
      toast({
        title: "Success",
        description: `Virtual TA has been ${editId ? 'updated' : 'created'} successfully`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editId ? 'update' : 'create'} Virtual TA`,
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <WelcomeStep
            formData={formData}
            handleInputChange={handleInputChange}
            handlePromptQuestionChange={handlePromptQuestionChange}
            addPromptQuestion={addPromptQuestion}
          />
        );
      case 3:
        return (
          <PromptStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <DatasourceStep
            formData={formData}
            handleInputChange={handleInputChange}
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
              {editId ? 'Edit' : 'Add New'} Virtual TA
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
                  onClick={() => navigate("/")}
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

export default AddTAWizard;
