import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import { motion } from "framer-motion";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

const KeyboardIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = () => {
      setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.button 
        className={`keyboard-icon-button ${isModalOpen ? 'active' : ''}`}
        onMouseEnter={showModal}
        onMouseLeave={hideModal}
        title="Keyboard Shortcuts"
        aria-label="Show keyboard shortcuts"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Keyboard size={20} strokeWidth={2} />
      </motion.button>
      <KeyboardShortcutsModal isOpen={isModalOpen} onClose={hideModal} />
    </>
  );
};

export default KeyboardIcon; 