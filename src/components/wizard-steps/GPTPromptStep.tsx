import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface GPTPromptStepProps {
  formData: {
    default_prompt: string;
    ai_guardrails: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

const GPTPromptStep = ({ formData, handleInputChange }: GPTPromptStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Step 3: Prompt Template</h3>
    <p className="text-gray-600 mb-4">Configure the base prompt and AI guardrails for your GPT.</p>
    
    <div>
      <Label>Default Prompt</Label>
      <Textarea
        value={formData.default_prompt}
        onChange={(e) => handleInputChange("default_prompt", e.target.value)}
        className="h-32"
        placeholder="Enter the base prompt for your GPT"
      />
    </div>
    <div>
      <Label>AI Guardrails</Label>
      <Textarea
        value={formData.ai_guardrails}
        onChange={(e) => handleInputChange("ai_guardrails", e.target.value)}
        className="h-32"
        placeholder="Define scenarios where you don't want the AI to answer"
      />
    </div>
  </div>
);

export default GPTPromptStep;