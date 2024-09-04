"use client";

import EmailLogin from "@/app/components/EmailLogin";
import React from "react";
import OnboardingForms from "@/app/components/OnboardingForms";
import StepIndicator from "@/app/components/StepIndicator";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import FinishedOnboarding from "@/app/components/FinishedOnboarding";
import Spinner from "@/app/components/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_ANIMATION } from "@/utils/animations";
import Card from "@/app/components/Card";

const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
};

const OnboardingFlow = () => {
  const localUserId = getUserId();
  const { data: user, isLoading } = trpc.users.getUser.useQuery(
    {
      userId: localUserId ?? "",
    },
    // Probably would do this better in production
    { retry: false, enabled: !!localUserId }
  );

  const [step, setStep] = useState(user?.onboardingStep ?? 1);
  const incrementStep = () => setStep(step + 1);
  const decrementStep = () => setStep(Math.max(1, step - 1));

  React.useEffect(() => {
    if (user) {
      setStep(user.onboardingStep ?? 1);
    }
  }, [user]);

  const { data: onboardingConfig } = trpc.admin.getOnboardingConfig.useQuery();

  // Prevent SSR
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-3xl w-full mx-auto px-10 py-20">
      <Card className="flex overflow-hidden flex-col gap-8 max-w-xl mx-auto p-16">
        <AnimatePresence {...DEFAULT_ANIMATION} mode="popLayout">
          {(isLoading && localUserId) || !isMounted ? (
            // {true || !isMounted ? (
            <motion.div
              className="flex min-h-[250px] items-center justify-center"
              key="loading"
            >
              <Spinner />
            </motion.div>
          ) : (
            <>
              {step === 1 && !isLoading && (
                <EmailLogin incrementStep={incrementStep} key="email" />
              )}
              {step === 2 && (
                <OnboardingForms
                  key="step1"
                  currentStep={step}
                  config={onboardingConfig?.[0]?.components ?? []}
                  userId={user?.id ?? ""}
                  incrementStep={incrementStep}
                />
              )}
              {step === 3 && (
                <OnboardingForms
                  key="step2"
                  currentStep={step}
                  config={onboardingConfig?.[1]?.components ?? []}
                  userId={user?.id ?? ""}
                  incrementStep={incrementStep}
                />
              )}
              {step === 4 && <FinishedOnboarding key="finished" />}
            </>
          )}
        </AnimatePresence>

        <StepIndicator totalSteps={4} currentStep={step} />
      </Card>
      <div className="fixed bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={decrementStep}
        >
          -
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={incrementStep}
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
