import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Mail,
  ArrowUpRight,
  Plane,
  ChartCandlestick,
  Briefcase,
  GraduationCap,
  Heart,
  Hammer,
  Book,
} from "lucide-react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

const AboutPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const details = [
    {
      label: <GraduationCap />,
      content: "Mechatronics Engineering",
    },
    {
      label: <Hammer />,
      content: "ML, Robotics, CS",
    },
    {
      label: <Briefcase />,
      content:
        "Mathematical modelling and programming of 3-DOF & 4-DOF robotic arms",
    },
    {
      label: <Heart />,
      content: (
        <div className="about-interest">
          <Link href="/planes" className="detail-link">
            <Plane size={14} /> Planes
          </Link>
          <Link href="/finance" className="detail-link">
            <ChartCandlestick size={14} /> Finance
          </Link>
        </div>
      ),
    },
    {
      label: <Book />,
      content: (
        <a
          href="https://press.stripe.com/the-art-of-doing-science-and-engineering"
          target="_blank"
          rel="noopener noreferrer"
          className="detail-link"
        >
          The Art of Doing Science and Engineering <ArrowUpRight size={12} />
        </a>
      ),
    },
  ];

  return (
    <>
      <div
        className="title-wrapper"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        <span className="site-title">Danish</span>
      </div>

      {isOpen && (
        <div className="about-overlay" onClick={() => setIsOpen(false)}>
          <div className="about-container" onClick={(e) => e.stopPropagation()}>
            <button className="about-close" onClick={() => setIsOpen(false)}>
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="about-content">
              <div className="about-header">
                <Image
                  src="/icons/icon.png"
                  alt="Danish"
                  className="about-avatar"
                  width={48}
                  height={48}
                  priority
                />
                <div className="footer-socials">
                  <a
                    href="https://x.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon"
                    aria-label="Visit my X profile"
                  >
                    <SiX size={20} />
                  </a>
                  <a
                    href="https://github.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon header-icon-github"
                    aria-label="Visit my GitHub profile"
                  >
                    <SiGithub size={22} />
                  </a>
                  <a
                    href="https://instagram.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon header-icon-github"
                    aria-label="Visit my Instagram profile"
                  >
                    <SiInstagram size={20} />
                  </a>
                  <a
                    href="mailto:aansaridan@gmail.com"
                    className="header-icon email-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect via email"
                  >
                    <Mail size={24} strokeWidth={1.8} />
                  </a>
                </div>
              </div>

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
        </div>
      )}
    </>
  );
};

export default AboutPopup;
