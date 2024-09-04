import { FADE_IN_ANIMATION } from "@/utils/animations";
import { motion } from "framer-motion";
import React from "react";

const FinishedOnboarding = () => {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[250px]"
      {...FADE_IN_ANIMATION}
    >
      <h1 className="text-3xl font-bold mb-6">Welcome to the application!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900 transition-colors"
      >
        Logout & Restart
      </button>
    </motion.div>
  );
};

export default FinishedOnboarding;
