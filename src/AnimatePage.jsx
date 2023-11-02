import { motion } from "framer-motion";
import React from "react";

const animations = {
  initial: { opacity: 0.3, y: -6 },
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
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
