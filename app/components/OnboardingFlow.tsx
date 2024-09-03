"use client";

import EmailLogin from "@/app/components/EmailLogin";
import React from "react";
import OnboardingForms from "@/app/components/OnboardingForms";
import StepIndicator from "@/app/components/StepIndicator";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import FinishedOnboarding from "@/app/components/FinishedOnboarding";

const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
};

const OnboardingFlow = () => {
  const savedUserId = getUserId();
  const { data: user, isLoading } = trpc.users.getUser.useQuery(
    {
      userId: savedUserId ?? "",
    },
    // Probably would do this better in production
    { retry: false, enabled: !!savedUserId }
  );

  const [step, setStep] = useState(user?.onboardingStep ?? 1);
  const nextStep = () => setStep(step + 1);

  React.useEffect(() => {
    if (user) {
      setStep(user.onboardingStep ?? 1);
    }
  }, [user]);

  const { data: onboardingConfig } = trpc.admin.getOnboardingConfig.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-10 bg-white rounded-lg shadow-xl px-10 py-20">
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        {step === 1 && <EmailLogin nextStep={nextStep} />}
        {step === 2 && (
          <OnboardingForms
            currentStep={step}
            config={onboardingConfig?.[0]?.components ?? []}
            userId={user?.id ?? ""}
            nextStep={nextStep}
          />
        )}
        {step === 3 && (
          <OnboardingForms
            currentStep={step}
            config={onboardingConfig?.[1]?.components ?? []}
            userId={user?.id ?? ""}
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
