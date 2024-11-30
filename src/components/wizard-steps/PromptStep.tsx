import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface PromptStepProps {
  formData: {
    default_prompt: string;
    ai_guardrails: string;
    teaching_style: string;
    no_answer_response: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

const PromptStep = ({ formData, handleInputChange }: PromptStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Step 3: AI Prompt Configuration</h3>
    <p className="text-gray-600 mb-4">Set up the AI behavior and response patterns for the virtual TA.</p>
    
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

export default PromptStep;