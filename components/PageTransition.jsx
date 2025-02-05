import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
};

export default PageTransition;
