import { motion } from "framer-motion";
import React from "react";

const animations = {
  initial: { opacity: 0.5, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export const AnimatePage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
