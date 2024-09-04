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
import { DEFAULT_ANIMATION, FADE_IN_ANIMATION } from "@/utils/animations";
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

  if (!isMounted) return null;

  return (
    <div className="max-w-3xl w-full mx-auto px-10 py-20">
      <Card
        className="flex overflow-hidden flex-col gap-8 max-w-xl mx-auto p-16"
        withAnimation
      >
        <AnimatePresence
          {...DEFAULT_ANIMATION}
          mode="popLayout"
          initial={false}
        >
          {step === 1 && !isLoading && !localUserId && (
            <motion.div
              key="email"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <EmailLogin incrementStep={incrementStep} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <OnboardingForms
                currentStep={step}
                config={onboardingConfig?.[0]?.components ?? []}
                userId={user?.id ?? ""}
                incrementStep={incrementStep}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <OnboardingForms
                currentStep={step}
                config={onboardingConfig?.[1]?.components ?? []}
                userId={user?.id ?? ""}
                incrementStep={incrementStep}
              />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="finished"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <FinishedOnboarding />
            </motion.div>
          )}
        </AnimatePresence>

        <StepIndicator totalSteps={4} currentStep={step} />
      </Card>
    </div>
  );
};

export default OnboardingFlow;
