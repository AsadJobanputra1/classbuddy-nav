import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

interface DatasourceStepProps {
  formData: {
    canvas_enabled: boolean;
    canvas_api_key: string;
    canvas_course_url: string;
    panopto_enabled: boolean;
    panopto_api_key: string;
    panopto_course_url: string;
    captioning_enabled: boolean;
  };
  handleInputChange: (field: string, value: any) => void;
}

const DatasourceStep = ({ formData, handleInputChange }: DatasourceStepProps) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold mb-4">Step 4: Data Source Integration</h3>
    <p className="text-gray-600 mb-4">Configure external learning platforms and tools integration.</p>
    
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

export default DatasourceStep;