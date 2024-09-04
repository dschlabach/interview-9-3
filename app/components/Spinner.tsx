import { motion } from "framer-motion";
import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 24, color = "#000000" }: SpinnerProps) => (
  <motion.div className="spinner" style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="32"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </motion.div>
);

export default Spinner;
