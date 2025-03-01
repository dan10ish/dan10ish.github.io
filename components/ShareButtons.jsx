import { useState, useEffect, useRef } from "react";
import { Share2, Link2, Check } from "lucide-react";

import { SiX, SiWhatsapp } from "@icons-pack/react-simple-icons";

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ShareButton({ slug }) {
  const [isClickOpen, setIsClickOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const wrapperRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsClickOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", checkScreenSize);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen && !isClickOpen) {
      if (isButtonHovered || isMenuHovered) {
        setIsHoverOpen(true);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      } else {
        closeTimeoutRef.current = setTimeout(() => {
          setIsHoverOpen(false);
        }, 200);
      }
    }
  }, [isButtonHovered, isMenuHovered, isLargeScreen, isClickOpen]);

  if (!mounted) {
    return (
      <div className="share-wrapper">
        <button className="share-button" aria-label="Share">
          <Share2 size={20} />
        </button>
      </div>
    );
  }

  const url = `https://danish.bio/post/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        if (!isButtonHovered && !isMenuHovered) {
          setIsHoverOpen(false);
        }
        setIsClickOpen(false);
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          if (!isButtonHovered && !isMenuHovered) {
            setIsHoverOpen(false);
          }
          setIsClickOpen(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const shareButtons = [
    {
      name: "X",
      Icon: SiX,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this post by @dan10ish\n\n${url}`)}`,
          "_blank",
        );
        setIsClickOpen(false);
        setIsHoverOpen(false);
      },
      class: "share-x",
    },
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        setIsClickOpen(false);
        setIsHoverOpen(false);
      },
      class: "share-linkedin",
    },
    {
      name: "WhatsApp",
      Icon: SiWhatsapp,
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Check out this post by Danish\n\n${url}`)}`,
          "_blank",
        );
        setIsClickOpen(false);
        setIsHoverOpen(false);
      },
      class: "share-whatsapp",
    },
    {
      name: copied ? "Copied" : "Link",
      Icon: copied ? Check : Link2,
      action: handleCopy,
      class: copied ? "share-copied" : "share-copy",
    },
  ];

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsClickOpen(!isClickOpen);
    setIsHoverOpen(false);
  };

  const isOpen = isClickOpen || isHoverOpen;

  return (
    <div className="share-wrapper" ref={wrapperRef} data-open={isOpen}>
      <button
        className="share-button"
        onClick={handleButtonClick}
        onMouseEnter={() => isLargeScreen && setIsButtonHovered(true)}
        onMouseLeave={() => isLargeScreen && setIsButtonHovered(false)}
        aria-label="Share"
      >
        <Share2 size={16} />
      </button>
      {isOpen && (
        <div
          className="share-popup"
          onMouseEnter={() => isLargeScreen && setIsMenuHovered(true)}
          onMouseLeave={() => isLargeScreen && setIsMenuHovered(false)}
        >
          {shareButtons.map((btn) => {
            const IconComponent = btn.Icon;
            return (
              <button
                key={btn.name}
                onClick={btn.action}
                className={`share-option ${btn.class}`}
              >
                <IconComponent size={14} />
                <span>{btn.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
