import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BasicInfoStepProps {
  formData: {
    course: string;
    name: string;
    instructor_name: string;
    instructor_email: string;
    ta_email: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

const BasicInfoStep = ({ formData, handleInputChange }: BasicInfoStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Step 1: Basic Information</h3>
    <p className="text-gray-600 mb-4">Enter the core details about the virtual teaching assistant and associated course.</p>
    
    <div>
      <Label>Course Name</Label>
      <Input
        value={formData.course}
        onChange={(e) => handleInputChange("course", e.target.value)}
        placeholder="MicroEconomics 101"
      />
    </div>
    <div>
      <Label>Virtual TA Name</Label>
      <Input
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        placeholder="tabatha"
      />
    </div>
    <div>
      <Label>Instructor Name</Label>
      <Input
        value={formData.instructor_name}
        onChange={(e) => handleInputChange("instructor_name", e.target.value)}
        placeholder="Dr. Peter Parker"
      />
    </div>
    <div>
      <Label>Instructor Email</Label>
      <Input
        type="email"
        value={formData.instructor_email}
        onChange={(e) => handleInputChange("instructor_email", e.target.value)}
        placeholder="peter.parker@marveluniversity.edu"
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

export default BasicInfoStep;