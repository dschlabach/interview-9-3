import EmailLogin from "@/app/components/EmailLogin";
import OnboardingForms from "@/app/components/OnboardingForms";
import PlaceholderStep from "@/app/components/PlaceholderStep";
import StepIndicator from "@/app/components/StepIndicator";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const OnboardingFlow = () => {
  const [step, setStep] = useState(2);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const userId = localStorage.getItem("userId");
  const { data: user, isLoading } = trpc.users.getUser.useQuery(
    {
      userId: userId ?? "",
    },
    // Probably would do this better in production
    { retry: false, enabled: !!userId }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-10 bg-white rounded-lg shadow-xl px-10 py-20">
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        {step === 1 && <EmailLogin nextStep={nextStep} />}
        {step === 2 && (
          <OnboardingForms
            // TODO: make this dynamic
            config={["aboutMe", "address"]}
            onChange={(field, value) => {
              console.log(field, value);
            }}
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
        <StepIndicator totalSteps={3} currentStep={step} />
      </div>
    </div>
  );
};

export default OnboardingFlow;
