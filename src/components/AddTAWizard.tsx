import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import BasicInfoStep from "./wizard-steps/BasicInfoStep";
import WelcomeStep from "./wizard-steps/WelcomeStep";
import PromptStep from "./wizard-steps/PromptStep";
import DatasourceStep from "./wizard-steps/DatasourceStep";
import TopNav from "./TopNav";

const AddTAWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromptQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formData.prompt_questions];
    newQuestions[index] = value;
    setFormData((prev) => ({ ...prev, prompt_questions: newQuestions }));
  };

  const addPromptQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      prompt_questions: [...prev.prompt_questions, ""],
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("virtual_tas").insert([formData]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Virtual TA has been created successfully",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Virtual TA",
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
      <TopNav />
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Add New Virtual TA</h2>
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
                {step === 4 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTAWizard;