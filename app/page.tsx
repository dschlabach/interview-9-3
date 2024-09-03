"use client";

import OnboardingFlow from "@/app/components/OnboardingFlow";
import ResetButton from "@/app/components/ResetButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <OnboardingFlow />
      <ResetButton />
    </main>
  );
}
