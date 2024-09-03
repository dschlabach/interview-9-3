import React from "react";
import AboutMe from "./AboutMe";
import AddressInputs from "./AddressInputs";

interface OnboardingFormsProps {
  config: string[];
  onChange: (field: string, value: string) => void;
}

const OnboardingForms: React.FC<OnboardingFormsProps> = ({
  config,
  onChange,
}) => {
  const componentMap = {
    aboutMe: <AboutMe onChange={() => {}} />,
    address: <AddressInputs onChange={onChange} />,
    birthdate: <></>,
    // TODO: Add birthdate input
    // birthdate: <BirthdateInput onChange={(value) => onChange("birthdate", value)} />,
  };

  return (
    <div className="space-y-4">
      {config.map((componentName, index) => (
        <React.Fragment key={index}>
          {componentMap[componentName as keyof typeof componentMap] || null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OnboardingForms;
