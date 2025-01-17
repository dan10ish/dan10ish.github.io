import { useState, useEffect, useRef } from "react";
import { Share2, Link2, Check, MessageCircleMore } from "lucide-react";

const XIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 22 25"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="m11.385 10.729.082-.058-.082.058.89 1.273 6.33 9.056a.9.9 0 0 1-.737 1.415h-.609a.9.9 0 0 1-.738-.384l-5.765-8.246-.082.057.082-.057-.89-1.274L3.883 4.01a.9.9 0 0 1 .737-1.415h.61a.9.9 0 0 1 .737.384l5.418 7.75zm2.587-.509 6.806-7.911a.853.853 0 1 0-1.292-1.112l-6.203 7.21a.9.9 0 0 1-1.424-.078L7.082 1.377A1.1 1.1 0 0 0 6.175.9H1.9a1.1 1.1 0 0 0-.906 1.723l7.274 10.586a.9.9 0 0 1-.06 1.097L.994 22.69a.853.853 0 0 0 1.292 1.113l6.61-7.684a.9.9 0 0 1 1.425.077l5.103 7.426a1.1 1.1 0 0 0 .906.477h4.275a1.1 1.1 0 0 0 .907-1.723l-7.6-11.06a.9.9 0 0 1 .06-1.097z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 256 259" width="14" height="14" fill="currentColor">
    <path
      d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464z"
      fill="none"
    />
    <path
      d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986zM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395z"
    />
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
          <Share2 size={14} />
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
      Icon: XIcon,
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
      Icon: WhatsAppIcon,
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
      name: copied ? "Copied" : "Copy Link",
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
