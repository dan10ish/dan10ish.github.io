import { useRef } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ShortcutKey = ({ children, className = "" }) => (
  <kbd className={`shortcut-key ${className}`}>{children}</kbd>
);

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="keyboard-shortcuts-overlay">
      <motion.div 
        className="keyboard-shortcuts-modal" 
        ref={modalRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="keyboard-shortcuts-header">
          <h3>keyboard shortcuts</h3>
        </div>
        <div className="keyboard-shortcuts-content">
          <div className="shortcut-group">
            <div className="shortcut-row">
              <div className="arrow-keys-grid">
                <ShortcutKey className="arrow-key up-key"><ArrowUp size={12} /></ShortcutKey>
                <div className="arrow-key-bottom-row">
                  <ShortcutKey className="arrow-key"><ArrowLeft size={12} /></ShortcutKey>
                  <ShortcutKey className="arrow-key"><ArrowDown size={12} /></ShortcutKey>
                  <ShortcutKey className="arrow-key"><ArrowRight size={12} /></ShortcutKey>
                </div>
              </div>
              <span className="shortcut-description">navigate projects & photos</span>
            </div>
            
            <div className="shortcut-row">
              <ShortcutKey className="text-key">enter</ShortcutKey>
              <span className="shortcut-description">open selected item</span>
            </div>
            
            <div className="shortcut-row">
              <ShortcutKey className="text-key">esc</ShortcutKey>
              <span className="shortcut-description">close or exit</span>
            </div>
            
            <div className="shortcut-row">
              <ShortcutKey className="text-key">tab</ShortcutKey>
              <span className="shortcut-description">switch tabs</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KeyboardShortcutsModal; 