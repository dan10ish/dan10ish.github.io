import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Mail, Github, Instagram } from "lucide-react";

const AboutPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const socialLinks = [
    {
      href: "https://x.com/dan10ish",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X Profile",
    },
    {
      href: "https://github.com/dan10ish",
      icon: <Github size={16} />,
      label: "GitHub",
    },
    {
      href: "https://instagram.com/dan10ish",
      icon: <Instagram size={16} />,
      label: "Instagram",
    },
    {
      href: "mailto:aansaridan@gmail.com",
      icon: <Mail size={16} />,
      label: "Email",
    },
  ];

  const details = [
    {
      label: "Education",
      content: "Mechatronics Engineering",
    },
    {
      label: "Skills",
      content: "ML, Robotics, CS",
    },
    {
      label: "Experience",
      content:
        "Mathematical modelling and programming of 3-DOF & 4-DOF robotic arms",
    },
    {
      label: "Interests",
      content: "Aviation, Design, Football, Gaming",
    },
    {
      label: "Reading",
      content: "The Art of Doing Science and Engineering",
      link: "https://press.stripe.com/the-art-of-doing-science-and-engineering",
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
              <X size={16} />
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
                <div className="about-socials">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-icon"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="about-details">
                {details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    <span className="detail-label">{detail.label}</span>
                    {detail.link ? (
                      <a
                        href={detail.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        {detail.content}
                      </a>
                    ) : (
                      <span className="detail-content">{detail.content}</span>
                    )}
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
