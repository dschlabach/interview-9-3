import EmailLogin from "@/app/components/EmailLogin";
import PlaceholderStep from "@/app/components/PlaceholderStep";
import { useState } from "react";

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData({ ...userData, ...data });
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-10 bg-white rounded-lg shadow-xl py-20">
      {step === 1 && (
        <EmailLogin updateUserData={updateUserData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <PlaceholderStep
          stepName="Step 2"
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <PlaceholderStep
          stepName="Step 3"
          nextStep={() => console.log("Onboarding complete", userData)}
          prevStep={prevStep}
          isLastStep
        />
      )}
    </div>
  );
};

export default OnboardingFlow;
