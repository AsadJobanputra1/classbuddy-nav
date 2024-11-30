import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface WelcomeStepProps {
  formData: {
    welcome_message: string;
    prompt_questions: string[];
  };
  handleInputChange: (field: string, value: any) => void;
  handlePromptQuestionChange: (index: number, value: string) => void;
  addPromptQuestion: () => void;
}

const WelcomeStep = ({
  formData,
  handleInputChange,
  handlePromptQuestionChange,
  addPromptQuestion,
}: WelcomeStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Step 2: Welcome Configuration</h3>
    <p className="text-gray-600 mb-4">Configure the welcome message and prompt questions for student interactions.</p>
    
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

export default WelcomeStep;