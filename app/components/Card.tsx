import { cn } from "@/utils";
import { DEFAULT_ANIMATION, FADE_IN_ANIMATION } from "@/utils/animations";
import { motion } from "framer-motion";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  withAnimation?: boolean;
  className?: string;
}

const Card = ({
  children,
  className,
  withAnimation = false,
  ...props
}: CardProps) => {
  const sharedClassName = cn(
    "bg-white rounded-lg p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]",
    className
  );

  if (withAnimation) {
    return (
      <motion.div
        layout
        className={sharedClassName}
        {...DEFAULT_ANIMATION}
        {...FADE_IN_ANIMATION}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={sharedClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
