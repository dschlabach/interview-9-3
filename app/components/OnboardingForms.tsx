import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import AboutMe from "@/app/components/AboutMe";
import AddressInputs from "@/app/components/AddressInputs";
import BirthdayInput from "@/app/components/BirthdayInput";

interface OnboardingFormsProps {
  config: string[];
  onChange: (field: string, value: string) => void;
  userId: string;
  currentStep: number;
  nextStep: () => void;
}

const OnboardingForms: React.FC<OnboardingFormsProps> = ({
  config,
  onChange,
  userId,
  currentStep,
  nextStep,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const updateUserDataMutation = trpc.users.updateUserData.useMutation();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange(field, value);
  };

  const componentMap = {
    aboutMe: <AboutMe onChange={handleChange} />,
    address: <AddressInputs onChange={handleChange} />,
    birthdate: <BirthdayInput onChange={handleChange} />,
  };

  const handleSave = async () => {
    try {
      await updateUserDataMutation.mutateAsync({
        userId,
        data: formData,
        onboardingStep: currentStep + 1,
      });
      nextStep();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {config.map((componentName, index) => (
        <React.Fragment key={index}>
          {componentMap[componentName as keyof typeof componentMap] || null}
        </React.Fragment>
      ))}
      <button
        onClick={handleSave}
        className="w-full bg-emerald-800 text-white py-2 px-4 rounded-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  );
};

export default OnboardingForms;
