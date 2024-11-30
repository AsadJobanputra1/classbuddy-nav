import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label>Course Name</Label>
        <Input
          value={formData.course}
          onChange={(e) => handleInputChange("course", e.target.value)}
        />
      </div>
      <div>
        <Label>Virtual TA Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div>
        <Label>Instructor Name</Label>
        <Input
          value={formData.instructor_name}
          onChange={(e) => handleInputChange("instructor_name", e.target.value)}
        />
      </div>
      <div>
        <Label>Instructor Email</Label>
        <Input
          type="email"
          value={formData.instructor_email}
          onChange={(e) => handleInputChange("instructor_email", e.target.value)}
        />
      </div>
      <div>
        <Label>Virtual TA Email</Label>
        <Input
          type="email"
          value={formData.ta_email}
          onChange={(e) => handleInputChange("ta_email", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label>Welcome Message</Label>
        <Textarea
          value={formData.welcome_message}
          onChange={(e) => handleInputChange("welcome_message", e.target.value)}
          className="h-32"
        />
      </div>
      <div className="space-y-2">
        <Label>Prompt Questions</Label>
        {formData.prompt_questions.map((question, index) => (
          <Input
            key={index}
            value={question}
            onChange={(e) => handlePromptQuestionChange(index, e.target.value)}
            placeholder={`Question ${index + 1}`}
          />
        ))}
        <Button type="button" variant="outline" onClick={addPromptQuestion}>
          Add Question
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label>Default Prompt</Label>
        <Textarea
          value={formData.default_prompt}
          onChange={(e) => handleInputChange("default_prompt", e.target.value)}
          className="h-32"
        />
      </div>
      <div>
        <Label>AI Guardrails</Label>
        <Textarea
          value={formData.ai_guardrails}
          onChange={(e) => handleInputChange("ai_guardrails", e.target.value)}
          className="h-32"
        />
      </div>
      <div>
        <Label>Teaching Style</Label>
        <RadioGroup
          value={formData.teaching_style}
          onValueChange={(value) => handleInputChange("teaching_style", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="by_the_book" id="by_the_book" />
            <Label htmlFor="by_the_book">By the Book</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in_between" id="in_between" />
            <Label htmlFor="in_between">In Between</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="interactive" id="interactive" />
            <Label htmlFor="interactive">Interactive</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>No Answer Response</Label>
        <Textarea
          value={formData.no_answer_response}
          onChange={(e) => handleInputChange("no_answer_response", e.target.value)}
          className="h-32"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Canvas as Datasource</Label>
          <Switch
            checked={formData.canvas_enabled}
            onCheckedChange={(checked) =>
              handleInputChange("canvas_enabled", checked)
            }
          />
        </div>
        {formData.canvas_enabled && (
          <div className="space-y-2 ml-4">
            <div>
              <Label>Canvas API Key</Label>
              <Input
                value={formData.canvas_api_key}
                onChange={(e) =>
                  handleInputChange("canvas_api_key", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Canvas Course URL</Label>
              <Input
                value={formData.canvas_course_url}
                onChange={(e) =>
                  handleInputChange("canvas_course_url", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Panopto as Datasource</Label>
          <Switch
            checked={formData.panopto_enabled}
            onCheckedChange={(checked) =>
              handleInputChange("panopto_enabled", checked)
            }
          />
        </div>
        {formData.panopto_enabled && (
          <div className="space-y-2 ml-4">
            <div>
              <Label>Panopto API Key</Label>
              <Input
                value={formData.panopto_api_key}
                onChange={(e) =>
                  handleInputChange("panopto_api_key", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Panopto Course URL</Label>
              <Input
                value={formData.panopto_course_url}
                onChange={(e) =>
                  handleInputChange("panopto_course_url", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Label>Enable Captioning Surface</Label>
        <Switch
          checked={formData.captioning_enabled}
          onCheckedChange={(checked) =>
            handleInputChange("captioning_enabled", checked)
          }
        />
      </div>
    </div>
  );

  return (
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
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

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
  );
};

export default AddTAWizard;