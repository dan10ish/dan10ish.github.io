"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { data, SocialIcon } from "./data";
import { Plus, User, Share2, ArrowLeft, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type Section = "home" | "expanded" | "about" | "links";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 25" fill="currentColor">
    <path d="M21.8518 22.4638L14.0268 10.1663L21.7481 1.6725C21.9227 1.47566 22.0127 1.21791 21.9986 0.955153C21.9844 0.692393 21.8673 0.445794 21.6725 0.26882C21.4778 0.0918457 21.2212 -0.0012398 20.9583 0.00974476C20.6953 0.0207293 20.4474 0.134898 20.2681 0.3275L12.9131 8.4175L7.85181 0.46375C7.76156 0.321693 7.63692 0.204713 7.48942 0.123647C7.34193 0.0425814 7.17637 5.21628e-05 7.00806 1.18294e-07H1.00806C0.828765 -8.70794e-05 0.652741 0.0480342 0.498423 0.139325C0.344105 0.230615 0.217171 0.361717 0.13091 0.518902C0.0446503 0.676088 0.00223821 0.853574 0.00811486 1.03278C0.0139915 1.21198 0.0679408 1.3863 0.164314 1.5375L7.98931 13.8337L0.268064 22.3337C0.177897 22.4306 0.107851 22.5444 0.061986 22.6685C0.0161206 22.7927 -0.00465234 22.9247 0.000871701 23.0569C0.00639575 23.1891 0.038107 23.3189 0.0941668 23.4388C0.150227 23.5586 0.22952 23.6662 0.327452 23.7552C0.425384 23.8442 0.540006 23.9129 0.664675 23.9572C0.789344 24.0016 0.921581 24.0208 1.05372 24.0137C1.18586 24.0066 1.31528 23.9733 1.43446 23.9158C1.55365 23.8583 1.66025 23.7777 1.74806 23.6787L9.10306 15.5888L14.1643 23.5425C14.2553 23.6834 14.3803 23.7991 14.5277 23.8791C14.6752 23.959 14.8403 24.0006 15.0081 24H21.0081C21.1872 23.9999 21.363 23.9518 21.5171 23.8606C21.6712 23.7693 21.798 23.6384 21.8843 23.4814C21.9705 23.3244 22.013 23.1472 22.0072 22.9681C22.0015 22.7891 21.9479 22.6149 21.8518 22.4638ZM15.5568 22L2.82931 2H6.45431L19.1868 22H15.5568Z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z"/>
  </svg>
);

const ThreadsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 21 26" fill="currentColor">
    <path d="M18.3025 12.4563C17.8686 12.1296 17.4024 11.8482 16.9112 11.6163C16.4112 7.88 13.9113 6.7025 12.7738 6.3575C10.3013 5.6075 7.46 6.50625 6.1675 8.445C6.09462 8.55433 6.04398 8.67694 6.01848 8.80583C5.99298 8.93473 5.99312 9.06738 6.01889 9.19622C6.07093 9.45643 6.22421 9.68531 6.445 9.8325C6.66579 9.9797 6.93602 10.0332 7.19622 9.98111C7.32506 9.95534 7.44757 9.90445 7.55674 9.83134C7.66591 9.75822 7.75962 9.66433 7.8325 9.555C8.62875 8.36 10.5825 7.785 12.1938 8.27125C13.4375 8.64625 14.2962 9.55875 14.7125 10.8962C14.0825 10.7763 13.4426 10.7165 12.8013 10.7175C11.0613 10.7175 9.4325 11.1662 8.2175 11.98C6.7875 12.9462 6 14.375 6 16C6 18.5725 7.9825 20.44 10.7137 20.44C11.5169 20.4345 12.3108 20.2679 13.0484 19.9499C13.7859 19.6319 14.4521 19.169 15.0075 18.5888C15.8125 17.7513 16.7575 16.2938 16.9587 13.9513C17.0062 13.9838 17.0513 14.0175 17.0963 14.0513C18.36 15.0063 19 16.335 19 18C19 20.42 16.4575 24 11 24C7.65875 24 5.315 22.9187 3.8325 20.695C2.61625 18.875 2 16.2825 2 13C2 9.7175 2.61625 7.125 3.8325 5.305C5.315 3.08125 7.65875 2 11 2C15.1163 2 17.75 3.65625 19.0662 7.065C19.1124 7.18896 19.1827 7.30254 19.273 7.39915C19.3634 7.49577 19.472 7.5735 19.5926 7.62785C19.7131 7.68219 19.8433 7.71208 19.9755 7.71577C20.1078 7.71946 20.2394 7.69688 20.3628 7.64934C20.4863 7.6018 20.599 7.53025 20.6946 7.43882C20.7902 7.3474 20.8667 7.23792 20.9197 7.11672C20.9727 6.99552 21.0011 6.86502 21.0033 6.73277C21.0055 6.60051 20.9814 6.46914 20.9325 6.34625C19.335 2.195 15.9 0 11 0C7 0 4.02375 1.41125 2.1675 4.195C0.72875 6.35375 0 9.315 0 13C0 16.685 0.72875 19.6463 2.1675 21.805C4.02375 24.5888 7 26 11 26C14.7587 26 17.1125 24.565 18.425 23.3625C20.0375 21.885 21 19.875 21 18C21 15.7075 20.0675 13.79 18.3025 12.4563ZM13.5662 17.2062C13.1977 17.5928 12.7554 17.9015 12.2654 18.1141C11.7755 18.3267 11.2478 18.4388 10.7137 18.4438C9.3625 18.4438 8 17.6937 8 16.0037C8 14.425 9.5 12.7275 12.8013 12.7275C13.5447 12.7255 14.2847 12.8273 15 13.03C15 14.79 14.5 16.2325 13.5662 17.2025V17.2062Z"/>
  </svg>
);

const SnapchatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 23" fill="currentColor">
    <path d="M5.82877 3.833C5.22877 5.177 5.46577 7.585 5.56177 9.269C4.91377 9.628 4.08177 8.998 3.61077 8.998C3.12077 8.998 2.53577 9.32 2.44377 9.8C2.37777 10.146 2.53277 10.65 3.64477 11.089C4.07477 11.259 5.09777 11.459 5.33477 12.017C5.66777 12.801 3.62477 16.42 0.416768 16.948C0.165768 16.989 -0.0132325 17.213 0.000767532 17.467C0.0567675 18.442 2.24277 18.824 3.21177 18.974C3.31077 19.108 3.39077 19.674 3.51777 20.105C3.57477 20.298 3.72177 20.529 4.09977 20.529C4.59277 20.529 5.41177 20.149 6.83777 20.385C8.23577 20.618 9.54977 22.6 12.0728 22.6C14.4178 22.6 15.8168 20.609 17.1628 20.385C17.9418 20.256 18.6108 20.297 19.3588 20.443C19.8738 20.544 20.3358 20.6 20.4828 20.094C20.6118 19.657 20.6908 19.102 20.7878 18.971C21.7478 18.822 23.9438 18.441 23.9988 17.466C24.0128 17.212 23.8338 16.989 23.5828 16.947C20.4288 16.427 18.3238 12.819 18.6648 12.016C18.9008 11.459 19.9168 11.261 20.3548 11.088C21.1688 10.767 21.5768 10.372 21.5678 9.915C21.5568 9.33 20.8528 8.981 20.3348 8.981C19.8078 8.981 19.0508 9.605 18.4378 9.267C18.5338 7.569 18.7698 5.172 18.1708 3.829C17.0358 1.286 14.5108 0 11.9868 0C9.47877 0 6.97277 1.268 5.82877 3.833Z"/>
  </svg>
);

const getSocialIcon = (icon: SocialIcon, size: number) => {
  switch (icon) {
    case "github": return <Github size={size} strokeWidth={1.5} />;
    case "twitter": return <XIcon size={size} />;
    case "instagram": return <InstagramIcon size={size} />;
    case "linkedin": return <LinkedInIcon size={size} />;
    case "threads": return <ThreadsIcon size={size} />;
    case "snapchat": return <SnapchatIcon size={size} />;
    case "mail": return <Mail size={size} strokeWidth={1.5} />;
    default: return null;
  }
};

const bouncy = { type: "spring" as const, stiffness: 500, damping: 25 };
const layoutBounce = { type: "spring" as const, stiffness: 400, damping: 28 };
const aboutTransition = { type: "spring" as const, stiffness: 600, damping: 35 };

export default function HomeClient() {
  const [section, setSection] = useState<Section>("home");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (section === "expanded") setSection("home");
      else if (section === "about" || section === "links") setSection("expanded");
    }
  }, [section]);

  const goBack = useCallback(() => {
    if (section === "expanded") setSection("home");
    else if (section === "about" || section === "links") setSection("expanded");
  }, [section]);

  const aboutText = `${data.personal.about} Currently working at ${data.experience[0].company}. Previously worked at ${data.experience.slice(1).map(e => e.company).join(" and ")}.`;

  return (
    <div className="home-container" onClick={handleOutsideClick}>
      <motion.div
        ref={containerRef}
        className="island"
        layout
        style={{ borderRadius: section === "about" ? 24 : 100 }}
        transition={section === "about" ? aboutTransition : layoutBounce}
      >
        {section === "home" && (
          <div className="island-content island-home">
            <div className="island-photo">
              <Image src="/icon.svg" alt="Profile" width={48} height={48} priority />
            </div>
            <motion.button
              onClick={() => setSection("expanded")}
              className="icon-btn icon-btn-green"
              aria-label="Expand menu"
              whileHover={isTouchDevice ? {} : { scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.85 }}
              transition={bouncy}
            >
              <Plus size={22} strokeWidth={2.5} />
            </motion.button>
          </div>
        )}

        {section === "expanded" && (
          <div className="island-content island-expanded">
            <div className="island-left">
              <motion.button
                onClick={goBack}
                className="island-photo-btn"
                aria-label="Go back"
                whileHover={isTouchDevice ? {} : { scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={bouncy}
              >
                <Image src="/icon.svg" alt="" width={48} height={48} priority aria-hidden />
              </motion.button>
              <div className="island-intro">
                <span className="island-hello">Hello, I&apos;m</span>
                <span className="island-name">{data.personal.name.split(" ")[0]}</span>
              </div>
            </div>
            <div className="island-right">
              <motion.button
                onClick={() => setSection("about")}
                className="icon-btn icon-btn-orange"
                aria-label="About"
                whileHover={isTouchDevice ? {} : { scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={bouncy}
              >
                <User size={20} strokeWidth={2} />
              </motion.button>
              <motion.button
                onClick={() => setSection("links")}
                className="icon-btn icon-btn-blue"
                aria-label="Links"
                whileHover={isTouchDevice ? {} : { scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={bouncy}
              >
                <Share2 size={20} strokeWidth={2} />
              </motion.button>
            </div>
          </div>
        )}

        {section === "about" && (
          <div className="island-about" onClick={goBack} role="button" tabIndex={0} aria-label="Go back" onKeyDown={(e) => e.key === "Enter" && goBack()}>
            <p className="about-text">{aboutText}</p>
          </div>
        )}

        {section === "links" && (
          <div className="island-content island-links">
            <motion.button
              onClick={goBack}
              className="icon-btn icon-btn-back"
              aria-label="Go back"
              whileHover={isTouchDevice ? {} : { scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              transition={bouncy}
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </motion.button>
            {data.social.map((social) => (
              <motion.a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.name}
                whileHover={isTouchDevice ? {} : { scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                transition={bouncy}
                onClick={(e) => e.stopPropagation()}
              >
                {getSocialIcon(social.icon, 24)}
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
