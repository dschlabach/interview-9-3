"use client";

import React from "react";

const ResetButton = () => {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center space-x-2 rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white">
      <button
        onClick={() => {
          localStorage.removeItem("userId");
          window.location.reload();
        }}
      >
        Reset user
      </button>
    </div>
  );
};

export default ResetButton;
