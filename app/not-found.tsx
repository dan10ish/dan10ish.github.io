"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const bouncy = { type: "spring" as const, stiffness: 500, damping: 25 };

export default function NotFound() {
  return (
    <div className="home-container">
      <div className="island" style={{ borderRadius: 100, minWidth: 320 }}>
        <div className="island-content island-expanded">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>404</span>
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>Page Not Found</span>
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
      </div>
    </div>
  );
}
