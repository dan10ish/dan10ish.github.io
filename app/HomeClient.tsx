"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { data, SocialIcon } from "./data";
import { Plus, User, Share2, ArrowLeft, FileText, Github, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Section = "home" | "expanded" | "about" | "links";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ThreadsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.58 1.205-6.333 3.509-8.183C6.658 2.171 9.513 1.32 12.068 1.5h.064c2.616.017 4.884.625 6.747 1.807 1.884 1.193 3.264 2.932 4.103 5.168l.044.117-2.502.857-.047-.125c-1.263-3.37-3.85-5.081-7.692-5.087h-.058c-2.94.006-5.263 1.016-6.907 3.003-1.5 1.81-2.267 4.326-2.28 7.477v.073c.02 3.236.82 5.772 2.38 7.542 1.616 1.832 3.944 2.756 6.921 2.749h.036c2.508-.006 4.502-.616 5.926-1.813 1.327-1.115 2.001-2.6 2.004-4.418v-.036c-.002-.785-.183-1.445-.54-1.962-.342-.497-.84-.875-1.484-1.127-.348 1.206-.91 2.253-1.678 3.12-1.142 1.29-2.7 2.105-4.633 2.427l-.088.014-.088-.004c-1.533-.07-2.83-.563-3.859-1.466-.997-.875-1.5-1.962-1.5-3.233 0-1.195.457-2.238 1.36-3.102.94-.9 2.263-1.438 3.934-1.6.873-.085 1.81-.079 2.781.019a8.328 8.328 0 0 0-.19-1.264c-.25-.946-.724-1.7-1.411-2.243-.716-.566-1.67-.855-2.838-.859h-.033c-1.143.004-2.105.31-2.86.912-.728.58-1.24 1.396-1.52 2.426l-.027.098-2.477-.673.031-.114c.41-1.51 1.19-2.77 2.32-3.742 1.176-1.012 2.67-1.532 4.44-1.546h.069c1.665.012 3.088.418 4.232 1.207 1.172.81 2.047 1.96 2.6 3.42.268.707.442 1.47.52 2.268.558.162 1.07.38 1.532.653 1.048.62 1.86 1.492 2.413 2.593.547 1.089.824 2.32.824 3.662v.056c-.006 2.447-.908 4.483-2.683 6.053-1.862 1.647-4.476 2.485-7.77 2.492h-.032zm-.09-9.873c-1.265.102-2.21.444-2.81.975-.52.462-.773.994-.773 1.628 0 .58.221 1.1.678 1.59.494.531 1.267.866 2.3.997 1.414-.24 2.502-.79 3.235-1.636.615-.709 1.002-1.576 1.154-2.584-.612-.107-1.218-.172-1.813-.19-.654-.018-1.31.005-1.97.07v.15z"/>
  </svg>
);

const SnapchatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.509 0-.964.06-1.289.135-.209.029-.389.074-.523.074-.3 0-.494-.149-.569-.42-.061-.194-.09-.36-.135-.553-.045-.195-.105-.494-.166-.57-1.857-.284-2.906-.702-3.146-1.271-.029-.075-.044-.149-.044-.225-.015-.239.165-.464.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.213-.72-1.213-1.17 0-.254.165-.508.451-.689.135-.09.3-.138.478-.149h.061c.179 0 .359.045.509.135.39.18.732.285 1.018.285.196 0 .329-.045.406-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.105-1.628-.232-3.654.297-4.847C7.86 1.069 11.216.793 12.206.793z"/>
  </svg>
);

const getSocialIcon = (icon: SocialIcon, size: number) => {
  switch (icon) {
    case "github": return <Github size={size} strokeWidth={2} />;
    case "twitter": return <XIcon size={size} />;
    case "instagram": return <InstagramIcon size={size} />;
    case "linkedin": return <LinkedInIcon size={size} />;
    case "threads": return <ThreadsIcon size={size} />;
    case "snapchat": return <SnapchatIcon size={size} />;
    case "mail": return <Mail size={size} strokeWidth={2} />;
    default: return null;
  }
};

const spring = { type: "spring" as const, stiffness: 700, damping: 35 };

function LinkButton({ 
  icon, 
  label, 
  href, 
  onClick, 
  isExternal,
  isTouchDevice,
  hoveredId,
  setHoveredId,
  id
}: { 
  icon: React.ReactNode; 
  label: string; 
  href?: string; 
  onClick?: () => void;
  isExternal?: boolean;
  isTouchDevice: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  id: string;
}) {
  const isHovered = hoveredId === id && !isTouchDevice;
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="link-btn"
      onMouseEnter={() => !isTouchDevice && setHoveredId(id)}
      onMouseLeave={() => !isTouchDevice && setHoveredId(null)}
      whileTap={{ scale: 0.92 }}
      animate={{ 
        backgroundColor: isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        paddingLeft: isHovered ? 14 : 12,
        paddingRight: isHovered ? 14 : 12,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 40 }}
    >
      <span className="link-icon">{icon}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="link-label"
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ type: "spring", stiffness: 800, damping: 40 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Component>
  );
}

export default function HomeClient() {
  const [section, setSection] = useState<Section>("home");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (section === "expanded") setSection("home");
      else if (section === "about" || section === "links") setSection("expanded");
    }
  }, [section]);

  const aboutText = `${data.personal.about} Previously worked at ${data.experience.map(e => e.company).join(", ")}.`;

  return (
    <div className="home-container" onClick={handleOutsideClick}>
      <motion.div
        ref={containerRef}
        className="island"
        layout
        transition={spring}
        style={{ borderRadius: section === "about" ? 24 : 100 }}
      >
        <AnimatePresence mode="popLayout">
          {section === "home" && (
            <motion.div
              key="home"
              className="island-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="island-photo">
                <Image src="/icon.png" alt="Profile" width={48} height={48} priority />
              </div>
              <motion.button
                onClick={() => setSection("expanded")}
                className="icon-btn icon-btn-green"
                whileHover={isTouchDevice ? {} : { scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
              >
                <Plus size={22} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          )}

          {section === "expanded" && (
            <motion.div
              key="expanded"
              className="island-content island-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="island-photo">
                <Image src="/icon.png" alt="Profile" width={48} height={48} priority />
              </div>
              <div className="island-intro">
                <span className="island-hello">Hello, I&apos;m</span>
                <span className="island-name">{data.personal.name.split(" ")[0]}</span>
              </div>
              <div className="island-actions">
                <motion.button
                  onClick={() => setSection("about")}
                  className="icon-btn icon-btn-orange"
                  whileHover={isTouchDevice ? {} : { scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                >
                  <User size={20} strokeWidth={2} />
                </motion.button>
                <motion.button
                  onClick={() => setSection("links")}
                  className="icon-btn icon-btn-blue"
                  whileHover={isTouchDevice ? {} : { scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                >
                  <Share2 size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {section === "about" && (
            <motion.div
              key="about"
              className="island-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <p className="about-text">{aboutText}</p>
            </motion.div>
          )}

          {section === "links" && (
            <motion.div
              key="links"
              className="island-content island-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <LinkButton
                id="back"
                icon={<ArrowLeft size={20} strokeWidth={2} />}
                label="Back"
                onClick={() => setSection("expanded")}
                isTouchDevice={isTouchDevice}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
              <LinkButton
                id="notes"
                icon={<FileText size={20} strokeWidth={2} />}
                label="Notes"
                href="/notes"
                isTouchDevice={isTouchDevice}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
              {data.social.map((social) => (
                <LinkButton
                  key={social.icon}
                  id={social.icon}
                  icon={getSocialIcon(social.icon, 20)}
                  label={social.name}
                  href={social.url}
                  isExternal
                  isTouchDevice={isTouchDevice}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
