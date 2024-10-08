import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import AboutMe from "@/app/components/inputs/AboutMe";
import AddressInputs from "@/app/components/inputs/AddressInputs";
import BirthdayInput from "@/app/components/inputs/BirthdayInput";
import Button from "@/app/components/Button";
import { motion } from "framer-motion";

interface OnboardingFormsProps {
  config: string[];
  userId: string;
  currentStep: number;
  incrementStep: () => void;
}

const OnboardingForms: React.FC<OnboardingFormsProps> = ({
  config,
  userId,
  currentStep,
  incrementStep,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const updateUserDataMutation = trpc.users.updateUserData.useMutation();

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const componentMap = {
    aboutMe: <AboutMe onChange={handleChange} />,
    address: <AddressInputs onChange={handleChange} />,
    birthdate: <BirthdayInput onChange={handleChange} />,
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserDataMutation.mutateAsync({
        userId,
        data: formData,
        onboardingStep: currentStep + 1,
      });
      incrementStep();
      return;
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const allFieldsFilled = () => {
    return config.every((componentName) => {
      switch (componentName) {
        case "aboutMe":
          return !!formData.aboutMe;
        case "address":
          return (
            !!formData.street &&
            !!formData.city &&
            !!formData.state &&
            !!formData.zip
          );
        case "birthdate":
          return !!formData.birthdate;
        default:
          return true;
      }
    });
  };

  const formIsValid = allFieldsFilled();

  return (
    <motion.div
      initial={{ opacity: 0.95, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <form onSubmit={handleSave} className="space-y-4">
        {config.map((componentName, index) => (
          <React.Fragment key={index}>
            {componentMap[componentName as keyof typeof componentMap] || null}
          </React.Fragment>
        ))}
        <Button type="submit" disabled={!formIsValid}>
          Save
        </Button>
      </form>
    </motion.div>
  );
};

export default OnboardingForms;
