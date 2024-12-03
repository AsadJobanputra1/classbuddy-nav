interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-1/4 h-2 rounded ${
            i < currentStep ? "bg-primary" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};