import EmailLogin from "@/app/components/EmailLogin";
import React from "react";
import OnboardingForms from "@/app/components/OnboardingForms";
import StepIndicator from "@/app/components/StepIndicator";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import FinishedOnboarding from "@/app/components/FinishedOnboarding";

const getUserId = () => {
  return localStorage.getItem("userId");
};

const OnboardingFlow = () => {
  const [step, setStep] = useState(getUserId() ? 2 : 1);

  const nextStep = () => setStep(step + 1);
  const [userId, setUserId] = useState<string | null>(getUserId());

  const { data: user, isLoading } = trpc.users.getUser.useQuery(
    {
      userId: userId ?? "",
    },
    // Probably would do this better in production
    { retry: false, enabled: !!userId }
  );

  const { data: onboardingConfig, error } =
    trpc.admin.getOnboardingConfig.useQuery();

  console.log("onboardingConfig:", onboardingConfig);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-10 bg-white rounded-lg shadow-xl px-10 py-20">
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        {step === 1 && <EmailLogin nextStep={nextStep} />}
        {step === 2 && (
          <OnboardingForms
            config={onboardingConfig?.[0]?.components ?? []}
            onChange={(field, value) => {
              console.log(field, value);
            }}
            userId={userId ?? ""}
            nextStep={nextStep}
          />
        )}
        {step === 3 && (
          <OnboardingForms
            config={onboardingConfig?.[1]?.components ?? []}
            onChange={(field, value) => {
              console.log(field, value);
            }}
            userId={userId ?? ""}
            nextStep={nextStep}
          />
        )}
        {step === 4 && <FinishedOnboarding />}
        <StepIndicator totalSteps={4} currentStep={step} />
      </div>
    </div>
  );
};

export default OnboardingFlow;
