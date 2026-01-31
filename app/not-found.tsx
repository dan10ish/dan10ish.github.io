"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const bouncy = { type: "spring" as const, stiffness: 500, damping: 25 };
const contentBounce = { type: "spring" as const, stiffness: 400, damping: 28 };

export default function NotFound() {
  return (
    <div className="home-container">
      <motion.div
        className="island"
        style={{ borderRadius: 100, minWidth: 320 }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={contentBounce}
      >
        <div className="island-content island-expanded">
          <div className="island-intro island-not-found">
            <span className="island-hello">404</span>
            <span className="island-name">Page Not Found</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={bouncy}
          >
            <Link
              href="/"
              className="icon-btn icon-btn-green"
              style={{ textDecoration: "none" }}
            >
              <Home size={20} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
