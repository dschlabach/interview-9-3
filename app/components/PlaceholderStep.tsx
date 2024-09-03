interface PlaceholderStepProps {
  stepName: string;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep?: boolean;
}

const PlaceholderStep: React.FC<PlaceholderStepProps> = ({
  stepName,
  nextStep,
  prevStep,
  isLastStep = false,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{stepName}</h2>
      <p className="text-gray-600">This is a placeholder for {stepName}.</p>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PlaceholderStep;
