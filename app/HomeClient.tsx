"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { data, SocialIcon } from "./data";
import { Plus, Mail, Globe } from "lucide-react";
import { AudioLines } from "@/components/animate-ui/icons/audio-lines";
import { Hammer } from "@/components/animate-ui/icons/hammer";
import { MessageCircleMore } from "@/components/animate-ui/icons/message-circle-more";
import { motion } from "framer-motion";
import Image from "next/image";

type Section = "home" | "expanded" | "about" | "links" | "projects";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z" />
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 25" fill="currentColor">
    <path d="M21.8518 22.4638L14.0268 10.1663L21.7481 1.6725C21.9227 1.47566 22.0127 1.21791 21.9986 0.955153C21.9844 0.692393 21.8673 0.445794 21.6725 0.26882C21.4778 0.0918457 21.2212 -0.0012398 20.9583 0.00974476C20.6953 0.0207293 20.4474 0.134898 20.2681 0.3275L12.9131 8.4175L7.85181 0.46375C7.76156 0.321693 7.63692 0.204713 7.48942 0.123647C7.34193 0.0425814 7.17637 5.21628e-05 7.00806 1.18294e-07H1.00806C0.828765 -8.70794e-05 0.652741 0.0480342 0.498423 0.139325C0.344105 0.230615 0.217171 0.361717 0.13091 0.518902C0.0446503 0.676088 0.00223821 0.853574 0.00811486 1.03278C0.0139915 1.21198 0.0679408 1.3863 0.164314 1.5375L7.98931 13.8337L0.268064 22.3337C0.177897 22.4306 0.107851 22.5444 0.061986 22.6685C0.0161206 22.7927 -0.00465234 22.9247 0.000871701 23.0569C0.00639575 23.1891 0.038107 23.3189 0.0941668 23.4388C0.150227 23.5586 0.22952 23.6662 0.327452 23.7552C0.425384 23.8442 0.540006 23.9129 0.664675 23.9572C0.789344 24.0016 0.921581 24.0208 1.05372 24.0137C1.18586 24.0066 1.31528 23.9733 1.43446 23.9158C1.55365 23.8583 1.66025 23.7777 1.74806 23.6787L9.10306 15.5888L14.1643 23.5425C14.2553 23.6834 14.3803 23.7991 14.5277 23.8791C14.6752 23.959 14.8403 24.0006 15.0081 24H21.0081C21.1872 23.9999 21.363 23.9518 21.5171 23.8606C21.6712 23.7693 21.798 23.6384 21.8843 23.4814C21.9705 23.3244 22.013 23.1472 22.0072 22.9681C22.0015 22.7891 21.9479 22.6149 21.8518 22.4638ZM15.5568 22L2.82931 2H6.45431L19.1868 22H15.5568Z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z" />
  </svg>
);

const SnapchatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 23" fill="currentColor">
    <path d="M5.82877 3.833C5.22877 5.177 5.46577 7.585 5.56177 9.269C4.91377 9.628 4.08177 8.998 3.61077 8.998C3.12077 8.998 2.53577 9.32 2.44377 9.8C2.37777 10.146 2.53277 10.65 3.64477 11.089C4.07477 11.259 5.09777 11.459 5.33477 12.017C5.66777 12.801 3.62477 16.42 0.416768 16.948C0.165768 16.989 -0.0132325 17.213 0.000767532 17.467C0.0567675 18.442 2.24277 18.824 3.21177 18.974C3.31077 19.108 3.39077 19.674 3.51777 20.105C3.57477 20.298 3.72177 20.529 4.09977 20.529C4.59277 20.529 5.41177 20.149 6.83777 20.385C8.23577 20.618 9.54977 22.6 12.0728 22.6C14.4178 22.6 15.8168 20.609 17.1628 20.385C17.9418 20.256 18.6108 20.297 19.3588 20.443C19.8738 20.544 20.3358 20.6 20.4828 20.094C20.6118 19.657 20.6908 19.102 20.7878 18.971C21.7478 18.822 23.9438 18.441 23.9988 17.466C24.0128 17.212 23.8338 16.989 23.5828 16.947C20.4288 16.427 18.3238 12.819 18.6648 12.016C18.9008 11.459 19.9168 11.261 20.3548 11.088C21.1688 10.767 21.5768 10.372 21.5678 9.915C21.5568 9.33 20.8528 8.981 20.3348 8.981C19.8078 8.981 19.0508 9.605 18.4378 9.267C18.5338 7.569 18.7698 5.172 18.1708 3.829C17.0358 1.286 14.5108 0 11.9868 0C9.47877 0 6.97277 1.268 5.82877 3.833Z" />
  </svg>
);

const getSocialIcon = (icon: SocialIcon, size: number) => {
  switch (icon) {
    case "github": return <GithubIcon size={size + 4} />;
    case "twitter": return <XIcon size={size} />;
    case "instagram": return <InstagramIcon size={size} />;
    case "linkedin": return <LinkedInIcon size={size} />;
    case "snapchat": return <SnapchatIcon size={size} />;
    case "mail": return <Mail size={size} strokeWidth={2} />;
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
    const mq = window.matchMedia("(any-hover: hover)");
    setIsTouchDevice(!mq.matches);
    const handler = () => setIsTouchDevice(!window.matchMedia("(any-hover: hover)").matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);



  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (section === "expanded") setSection("home");
      else if (section === "about" || section === "links" || section === "projects") setSection("expanded");
    }
  }, [section]);

  const goBack = useCallback(() => {
    if (section === "expanded") setSection("home");
    else if (section === "about" || section === "links" || section === "projects") setSection("expanded");
  }, [section]);

  const aboutText = `${data.personal.about} Currently taking companies from zero to one.`;

  return (
    <div className="home-container" onClick={handleOutsideClick}>
      <motion.div
        ref={containerRef}
        className="island"
        layout
        style={{ borderRadius: section === "about" ? 24 : section === "projects" ? 32 : 100 }}
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
                <AudioLines size={20} />
              </motion.button>
              <motion.button
                onClick={() => setSection("projects")}
                className="icon-btn icon-btn-purple"
                aria-label="Projects"
                whileHover={isTouchDevice ? {} : { scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={bouncy}
              >
                <Hammer size={20} />
              </motion.button>
              <motion.button
                onClick={() => setSection("links")}
                className="icon-btn icon-btn-blue"
                aria-label="Links"
                whileHover={isTouchDevice ? {} : { scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={bouncy}
              >
                <MessageCircleMore size={20} />
              </motion.button>
            </div>
          </div>
        )}

        {section === "about" && (
          <div className="island-about">
            <p className="about-text">{aboutText}</p>
          </div>
        )}

        {section === "links" && (
          <div className="island-content island-links">
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

        {section === "projects" && (
          <div className="island-projects" onClick={(e) => e.stopPropagation()}>
            <div className="projects-list">
              {data.projects.map((project) => (
                <div
                  key={project.title}
                  className="project-card"
                >
                  <div className="project-compact-row">
                    <div className="project-compact-left">
                      <h3 className="project-compact-title">{project.title}</h3>
                    </div>

                    <div className="project-compact-links">
                      {project.tag && (
                        <span className={`project-tag tag-${project.tag.toLowerCase()}`}>
                          {project.tag}
                        </span>
                      )}
                      {project.source ? (
                        <motion.a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Source code"
                          whileHover={isTouchDevice ? {} : { scale: 1.2 }}
                          whileTap={{ scale: 0.85 }}
                          transition={bouncy}
                        >
                          <GithubIcon size={20} />
                        </motion.a>
                      ) : (
                        <span className="project-link-disabled">
                          <GithubIcon size={20} />
                        </span>
                      )}

                      {project.live ? (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          whileHover={isTouchDevice ? {} : { scale: 1.2 }}
                          whileTap={{ scale: 0.85 }}
                          transition={bouncy}
                        >
                          <Globe size={18} />
                        </motion.a>
                      ) : (
                        <span className="project-link-disabled">
                          <Globe size={18} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>

      {(section === "about" || section === "projects" || section === "links") && (
        <div className="back-chevron-anchor">
          <button
            className="back-chevron"
            onClick={goBack}
            aria-label="Go back"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
