import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface GPTBasicInfoStepProps {
  formData: {
    name: string;
    description: string;
    icon: string;
    billing_code: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

const GPTBasicInfoStep = ({ formData, handleInputChange }: GPTBasicInfoStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Step 1: Define GPT</h3>
    <p className="text-gray-600 mb-4">Enter the basic information about your GPT.</p>
    
    <div>
      <Label>GPT Name</Label>
      <Input
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        placeholder="Enter GPT name"
      />
    </div>
    <div>
      <Label>Description</Label>
      <Textarea
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Describe what your GPT does"
      />
    </div>
    <div>
      <Label>Icon URL</Label>
      <Input
        value={formData.icon}
        onChange={(e) => handleInputChange("icon", e.target.value)}
        placeholder="Enter icon URL"
      />
    </div>
    <div>
      <Label>Billing Code</Label>
      <Input
        value={formData.billing_code}
        onChange={(e) => handleInputChange("billing_code", e.target.value)}
        placeholder="Enter billing code"
      />
    </div>
  </div>
);

export default GPTBasicInfoStep;