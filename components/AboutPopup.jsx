import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  ArrowUpRight,
  Plane,
  ChartCandlestick,
  Briefcase,
  GraduationCap,
  Star,
  Hammer,
  BookText,
  Images,
} from "lucide-react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { motion, AnimatePresence } from "framer-motion";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

const AboutPopup = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const details = [
    {
      label: <LucideIcon icon={GraduationCap} />,
      content: "Mechatronics Engineering",
    },
    {
      label: <LucideIcon icon={Hammer} />,
      content: "ML, Robotics, CS",
    },
    {
      label: <LucideIcon icon={Briefcase} />,
      content: "Modelling and programming of 3 & 4-DOF robotic arms",
    },
    {
      label: <LucideIcon icon={Star} />,
      content: (
        <div className="about-interest">
          <Link href="/planes" className="detail-link">
            <LucideIcon icon={Plane} size={14} /> Planes
          </Link>
          <Link href="/finance" className="detail-link">
            <LucideIcon icon={ChartCandlestick} size={14} /> Finance
          </Link>
        </div>
      ),
    },
    {
      label: <LucideIcon icon={BookText} />,
      content: (
        <a
          href="https://press.stripe.com/the-art-of-doing-science-and-engineering"
          target="_blank"
          rel="noopener noreferrer"
          className="detail-link"
        >
          The Art of Doing Science and Engineering <LucideIcon icon={ArrowUpRight} size={12} />
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="title-wrapper">
        <span className="site-title">Danish</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="about-overlay"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <button className="about-close" onClick={() => setIsOpen(false)}>
              <LucideIcon icon={X} size={20} />
            </button>
            <div
              className="about-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="about-content">
                <div className="about-details">
                  {details.map((detail, index) => (
                    <div key={index} className="detail-item">
                      <span className="detail-label">{detail.label}</span>
                      <span className="detail-content">{detail.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-header">
              <div
                className="about-header-links"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href="/notes" className="footer-link">
                  <LucideIcon icon={BookText} size={16} />
                  Notes
                </Link>
                <Link href="/photos" className="footer-link">
                  <LucideIcon icon={Images} size={16} />
                  Photos
                </Link>
              </div>
              <div
                className="footer-socials"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href="https://x.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-icon"
                  aria-label="Visit my X profile"
                >
                  <LucideIcon icon={SiX} size={20} />
                </a>
                <a
                  href="https://github.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-icon header-icon-github"
                  aria-label="Visit my GitHub profile"
                >
                  <LucideIcon icon={SiGithub} size={22} />
                </a>
                <a
                  href="https://instagram.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-icon header-icon-github"
                  aria-label="Visit my Instagram profile"
                >
                  <LucideIcon icon={SiInstagram} size={20} />
                </a>
                <a
                  href="mailto:aansaridan@gmail.com"
                  className="header-icon email-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect via email"
                >
                  <LucideIcon icon={Mail} size={24} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutPopup;
