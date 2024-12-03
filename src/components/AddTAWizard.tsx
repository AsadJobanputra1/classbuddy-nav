import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAddTAForm } from "@/hooks/useAddTAForm";
import BasicInfoStep from "./wizard-steps/BasicInfoStep";
import WelcomeStep from "./wizard-steps/WelcomeStep";
import PromptStep from "./wizard-steps/PromptStep";
import DatasourceStep from "./wizard-steps/DatasourceStep";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import { ProgressIndicator } from "./wizard/ProgressIndicator";

const AddTAWizard = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const editId = new URLSearchParams(location.search).get('edit');
  
  const {
    formData,
    handleInputChange,
    handlePromptQuestionChange,
    addPromptQuestion,
    handleSubmit,
    fetchTAData,
  } = useAddTAForm(editId);

  useEffect(() => {
    if (editId) {
      fetchTAData();
    }
  }, [editId]);

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
            <ProgressIndicator currentStep={step} totalSteps={4} />
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