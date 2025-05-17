"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const getInitialY = () => {
    switch (direction) {
      case "up":
        return 30;
      case "down":
        return -30;
      default:
        return 0;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: getInitialY() }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
} 